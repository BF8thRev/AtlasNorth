"use client";

import { useState, useEffect } from "react";

type Format = "short" | "longform";
type Rating = "strong" | "solid" | "weak";
type RetentionSignal = "held" | "dropped" | "unknown";
type GuestType = "prospect" | "connector" | "neither";

type ShortEpisode = {
  id: string;
  format: "short";
  episodeTitle: string;
  publishDate: string;
  youtubeId: string;
  durationSecs: number;
  rating: Rating | null;
  hookStrength: number | null;       // 1–10
  retentionSignal: RetentionSignal | null;
  thumbnailPull: number | null;      // 1–10
  repostPotential: number | null;    // 1–10
  notes: string;
  isCustom?: boolean;
};

type LongformEpisode = {
  id: string;
  format: "longform";
  episodeTitle: string;
  guestName: string;
  publishDate: string;
  youtubeId: string;
  durationSecs: number;
  rating: Rating | null;
  guestType: GuestType;
  followUpDrafted: boolean;
  socialHook: string;
  clipMoments: string[];
  improvements: string[];
  newtonRelevance: string;
  notes: string;
  isCustom?: boolean;
};

type Episode = ShortEpisode | LongformEpisode;

const ratingConfig: Record<Rating, { label: string; color: string; icon: string }> = {
  strong: { label: "Strong", color: "bg-green-100 text-green-700", icon: "🔥" },
  solid:  { label: "Solid",  color: "bg-blue-100 text-blue-700",   icon: "✅" },
  weak:   { label: "Weak",   color: "bg-red-100 text-red-700",     icon: "⚠️" },
};

const guestTypeConfig: Record<GuestType, { label: string; color: string; icon: string }> = {
  prospect:  { label: "Prospect",  color: "bg-purple-100 text-purple-700", icon: "🎯" },
  connector: { label: "Connector", color: "bg-blue-100 text-blue-700",    icon: "🤝" },
  neither:   { label: "Neither",   color: "bg-gray-100 text-gray-500",    icon: "—" },
};

const retentionConfig: Record<RetentionSignal, { label: string; color: string }> = {
  held:    { label: "Held", color: "bg-green-100 text-green-700" },
  dropped: { label: "Dropped early", color: "bg-red-100 text-red-700" },
  unknown: { label: "Unknown", color: "bg-gray-100 text-gray-500" },
};

function fmtDuration(secs: number) {
  if (secs < 120) return `${secs}s`;
  const m = Math.floor(secs / 60);
  return m >= 60 ? `${Math.floor(m/60)}h ${m%60}m` : `${m}m`;
}

function ScoreBar({ value, label }: { value: number | null; label: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-0.5">
        <span>{label}</span>
        <span className="font-semibold text-gray-700">{value ?? "—"}/10</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${value && value >= 7 ? "bg-green-500" : value && value >= 4 ? "bg-yellow-400" : "bg-red-400"}`}
          style={{ width: value ? `${value * 10}%` : "0%" }}
        />
      </div>
    </div>
  );
}

const STORAGE_KEY = "atlas-podcast-reviews-v2";

export default function PodcastReview() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterFormat, setFilterFormat] = useState<Format | "all">("all");
  const [filterRating, setFilterRating] = useState<Rating | "all" | "unrated">("unrated");
  const [localOverrides, setLocalOverrides] = useState<Record<string, Partial<Episode>>>({});

  useEffect(() => {
    fetch(`/data/podcast-reviews.json?t=${Date.now()}`)
      .then((r) => r.json())
      .then((json) => {
        const server: Episode[] = json.reviews || [];
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          const overrides: Record<string, Partial<Episode>> = saved ? JSON.parse(saved) : {};
          setLocalOverrides(overrides);
          const merged = server.map((ep) => ({ ...ep, ...(overrides[ep.id] || {}) })) as Episode[];
          setEpisodes(merged);
        } catch {
          setEpisodes(server);
        }
      })
      .catch(() => setEpisodes([]));
  }, []);

  const saveOverride = (id: string, patch: Partial<Episode>) => {
    const updated = { ...localOverrides, [id]: { ...(localOverrides[id] || {}), ...patch } };
    setLocalOverrides(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setEpisodes((prev) => prev.map((ep) => (ep.id === id ? { ...ep, ...patch } as Episode : ep)));
  };

  const shorts = episodes.filter((ep) => ep.format === "short");
  const longforms = episodes.filter((ep) => ep.format === "longform");
  const unratedCount = episodes.filter((ep) => ep.rating === null).length;

  const filtered = episodes
    .filter((ep) => filterFormat === "all" || ep.format === filterFormat)
    .filter((ep) => {
      if (filterRating === "all") return true;
      if (filterRating === "unrated") return ep.rating === null;
      return ep.rating === filterRating;
    })
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate));

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Podcast Review</h1>
        <p className="text-gray-500 text-sm mt-1">
          Shorts and long-form evaluated on completely different criteria.{" "}
          {unratedCount > 0
            ? <span className="text-orange-500 font-semibold">{unratedCount} episodes need review.</span>
            : <span className="text-green-600 font-semibold">All reviewed.</span>}
        </p>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Shorts summary */}
        <div className="bg-gray-900 text-white rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">⚡</span>
            <p className="text-xs font-bold text-gray-300 uppercase tracking-wide">Shorts</p>
            <span className="ml-auto text-xs text-gray-400">{shorts.length} eps</span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-xl font-bold">{shorts.filter((s) => s.rating === "strong").length}</p>
              <p className="text-xs text-gray-400">🔥 Strong</p>
            </div>
            <div>
              <p className="text-xl font-bold">{shorts.filter((s) => s.rating === "solid").length}</p>
              <p className="text-xs text-gray-400">✅ Solid</p>
            </div>
            <div>
              <p className="text-xl font-bold">{shorts.filter((s) => s.rating === null).length}</p>
              <p className="text-xs text-gray-400">⏳ Unrated</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">Judged on: hook · retention · thumbnail · repost</p>
        </div>

        {/* Long-form summary */}
        <div className="bg-blue-950 text-white rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🎙️</span>
            <p className="text-xs font-bold text-blue-300 uppercase tracking-wide">Long-form</p>
            <span className="ml-auto text-xs text-blue-400">{longforms.length} eps</span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-xl font-bold">{longforms.filter((l) => l.rating === "strong").length}</p>
              <p className="text-xs text-blue-300">🔥 Strong</p>
            </div>
            <div>
              <p className="text-xl font-bold">{(longforms as LongformEpisode[]).filter((l) => l.guestType === "prospect").length}</p>
              <p className="text-xs text-blue-300">🎯 Prospects</p>
            </div>
            <div>
              <p className="text-xl font-bold">{(longforms as LongformEpisode[]).filter((l) => l.followUpDrafted).length}</p>
              <p className="text-xs text-blue-300">✉️ Follow-ups</p>
            </div>
          </div>
          <p className="text-xs text-blue-400 mt-3">Judged on: guest · clips · Newton · follow-up</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-6">
        {(["all", "short", "longform"] as const).map((f) => (
          <button key={f} onClick={() => setFilterFormat(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filterFormat === f ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            {f === "all" ? "All" : f === "short" ? "⚡ Shorts" : "🎙️ Long-form"}
          </button>
        ))}
        <div className="w-px bg-gray-200 mx-1" />
        {(["all", "unrated", "strong", "solid", "weak"] as const).map((r) => (
          <button key={r} onClick={() => setFilterRating(r)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filterRating === r ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            {r === "all" ? "All Ratings" : r === "unrated" ? "⏳ Unrated" : `${ratingConfig[r].icon} ${ratingConfig[r].label}`}
          </button>
        ))}
      </div>

      {/* Episode list */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400 text-sm">
            No episodes match this filter.
          </div>
        )}

        {filtered.map((ep) => {
          const isOpen = expandedId === ep.id;
          const isShort = ep.format === "short";

          return (
            <div key={ep.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Card header */}
              <button onClick={() => setExpandedId(isOpen ? null : ep.id)} className="w-full text-left px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      {/* Format badge */}
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${isShort ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}>
                        {isShort ? "⚡ Short" : "🎙️ Long-form"}
                      </span>
                      {/* Duration */}
                      <span className="text-xs text-gray-400">{fmtDuration(ep.durationSecs)}</span>
                      {/* Rating */}
                      {ep.rating
                        ? <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${ratingConfig[ep.rating].color}`}>{ratingConfig[ep.rating].icon} {ratingConfig[ep.rating].label}</span>
                        : <span className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-500 font-semibold">⏳ Needs review</span>
                      }
                      {/* Long-form extras */}
                      {!isShort && (ep as LongformEpisode).guestType !== "neither" && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${guestTypeConfig[(ep as LongformEpisode).guestType].color}`}>
                          {guestTypeConfig[(ep as LongformEpisode).guestType].icon} {guestTypeConfig[(ep as LongformEpisode).guestType].label}
                        </span>
                      )}
                      {!isShort && (ep as LongformEpisode).followUpDrafted && (
                        <span className="text-xs text-green-600 font-medium">✉️ Follow-up drafted</span>
                      )}
                    </div>
                    <p className="font-semibold text-gray-900 text-sm leading-snug">{ep.episodeTitle}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {ep.publishDate}
                      {!isShort && (ep as LongformEpisode).guestName && ` · ${(ep as LongformEpisode).guestName}`}
                    </p>
                  </div>
                  <span className="text-gray-400 text-sm flex-shrink-0">{isOpen ? "▲" : "▼"}</span>
                </div>
              </button>

              {/* Expanded panel */}
              {isOpen && (
                <div className="border-t border-gray-100 px-5 py-4 space-y-5">
                  {/* YouTube link */}
                  <a href={`https://youtube.com/watch?v=${ep.youtubeId}`} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-red-600 font-semibold hover:underline">
                    ▶ Watch on YouTube
                  </a>

                  {/* Rating buttons */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Overall Rating</p>
                    <div className="flex gap-2">
                      {(["strong", "solid", "weak"] as Rating[]).map((r) => (
                        <button key={r} onClick={() => saveOverride(ep.id, { rating: r } as any)}
                          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${ep.rating === r ? ratingConfig[r].color + " ring-2 ring-offset-1 ring-current" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                          {ratingConfig[r].icon} {ratingConfig[r].label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ─── SHORTS evaluation ─── */}
                  {isShort && (
                    <div className="space-y-4">
                      <div className="bg-yellow-50 rounded-xl p-4 space-y-3">
                        <p className="text-xs font-bold text-yellow-700 uppercase tracking-wide">⚡ Shorts Scorecard</p>

                        {/* Hook strength */}
                        <div>
                          <ScoreBar value={(ep as ShortEpisode).hookStrength} label="Hook Strength (first 3 sec)" />
                          <div className="flex gap-1 mt-1 flex-wrap">
                            {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                              <button key={n} onClick={() => saveOverride(ep.id, { hookStrength: n } as any)}
                                className={`w-7 h-7 rounded text-xs font-semibold transition-colors ${(ep as ShortEpisode).hookStrength === n ? "bg-yellow-500 text-white" : "bg-white border border-gray-200 text-gray-500 hover:bg-yellow-100"}`}>
                                {n}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Thumbnail pull */}
                        <div>
                          <ScoreBar value={(ep as ShortEpisode).thumbnailPull} label="Thumbnail / Title Pull" />
                          <div className="flex gap-1 mt-1 flex-wrap">
                            {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                              <button key={n} onClick={() => saveOverride(ep.id, { thumbnailPull: n } as any)}
                                className={`w-7 h-7 rounded text-xs font-semibold transition-colors ${(ep as ShortEpisode).thumbnailPull === n ? "bg-yellow-500 text-white" : "bg-white border border-gray-200 text-gray-500 hover:bg-yellow-100"}`}>
                                {n}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Repost potential */}
                        <div>
                          <ScoreBar value={(ep as ShortEpisode).repostPotential} label="Repost / Share Potential" />
                          <div className="flex gap-1 mt-1 flex-wrap">
                            {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                              <button key={n} onClick={() => saveOverride(ep.id, { repostPotential: n } as any)}
                                className={`w-7 h-7 rounded text-xs font-semibold transition-colors ${(ep as ShortEpisode).repostPotential === n ? "bg-yellow-500 text-white" : "bg-white border border-gray-200 text-gray-500 hover:bg-yellow-100"}`}>
                                {n}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Retention signal */}
                        <div>
                          <p className="text-xs font-semibold text-gray-600 mb-1">Retention Signal</p>
                          <div className="flex gap-2">
                            {(["held", "dropped", "unknown"] as RetentionSignal[]).map((s) => (
                              <button key={s} onClick={() => saveOverride(ep.id, { retentionSignal: s } as any)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${(ep as ShortEpisode).retentionSignal === s ? retentionConfig[s].color + " ring-2 ring-offset-1 ring-current" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                                {retentionConfig[s].label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Notes */}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Notes</p>
                        <textarea
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" rows={2}
                          placeholder="What worked? What flopped? What to test next?"
                          value={(ep as ShortEpisode).notes || ""}
                          onChange={(e) => saveOverride(ep.id, { notes: e.target.value } as any)}
                        />
                      </div>
                    </div>
                  )}

                  {/* ─── LONG-FORM evaluation ─── */}
                  {!isShort && (
                    <div className="space-y-4">
                      {/* Guest type */}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Guest Type</p>
                        <div className="flex gap-2">
                          {(["prospect", "connector", "neither"] as GuestType[]).map((g) => (
                            <button key={g} onClick={() => saveOverride(ep.id, { guestType: g } as any)}
                              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${(ep as LongformEpisode).guestType === g ? guestTypeConfig[g].color + " ring-2 ring-offset-1 ring-current" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                              {guestTypeConfig[g].icon} {guestTypeConfig[g].label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Social hook */}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Social Hook</p>
                        <input
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Best 1-line hook to pull from this episode"
                          value={(ep as LongformEpisode).socialHook || ""}
                          onChange={(e) => saveOverride(ep.id, { socialHook: e.target.value } as any)}
                        />
                      </div>

                      {/* Clip moments */}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">📎 Clip-Worthy Moments</p>
                        <textarea
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3}
                          placeholder="e.g. 14:22 — guest breaks down brand licensing model&#10;28:45 — best line of the episode"
                          value={((ep as LongformEpisode).clipMoments || []).join("\n")}
                          onChange={(e) => saveOverride(ep.id, { clipMoments: e.target.value.split("\n").filter(Boolean) } as any)}
                        />
                      </div>

                      {/* Newton relevance */}
                      <div>
                        <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">🔬 Newton Relevance</p>
                        <input
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                          placeholder="Any extraction / ops angle to leverage for Newton?"
                          value={(ep as LongformEpisode).newtonRelevance || ""}
                          onChange={(e) => saveOverride(ep.id, { newtonRelevance: e.target.value } as any)}
                        />
                      </div>

                      {/* Ways to improve */}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">💡 Ways to Improve</p>
                        <textarea
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows={2}
                          placeholder="e.g. Stronger cold open needed&#10;Push guest harder on numbers"
                          value={((ep as LongformEpisode).improvements || []).join("\n")}
                          onChange={(e) => saveOverride(ep.id, { improvements: e.target.value.split("\n").filter(Boolean) } as any)}
                        />
                      </div>

                      {/* Follow-up toggle */}
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id={`followup-${ep.id}`}
                          checked={(ep as LongformEpisode).followUpDrafted || false}
                          onChange={(e) => saveOverride(ep.id, { followUpDrafted: e.target.checked } as any)} />
                        <label htmlFor={`followup-${ep.id}`} className="text-sm text-gray-600">48-hour follow-up drafted</label>
                      </div>

                      {/* Notes */}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Notes</p>
                        <textarea
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" rows={2}
                          placeholder="Overall read on this episode..."
                          value={(ep as LongformEpisode).notes || ""}
                          onChange={(e) => saveOverride(ep.id, { notes: e.target.value } as any)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
