"use client";

import { useState, useEffect } from "react";
import BlockerCard from "@/components/BlockerCard";
import Navigation, { TabId } from "@/components/Navigation";
import RosterTab from "@/components/RosterTab";
import KanbanBoard from "@/components/KanbanBoard";
import MemoryVault from "@/components/MemoryVault";
import RoutinesTab from "@/components/RoutinesTab";
import AccessStatus from "@/components/AccessStatus";
import DecisionsLog from "@/components/DecisionsLog";
import BudgetMeter from "@/components/BudgetMeter";
import PodcastReview from "@/components/PodcastReview";
import AlertsTab, { SecurityStatus } from "@/components/AlertsTab";
import DraftsTab from "@/components/DraftsTab";
import GoalsTab from "@/components/GoalsTab";
import ModelStatus from "@/components/ModelStatus";

export type Item = {
  id: string;
  title: string;
  impact: number;
  difficulty: number;
  notes: string;
  status: "pending" | "blocked" | "in-progress" | "waiting" | "done";
};

export type MissionControlData = {
  blockersForYou: Item[];
  openLoops: Item[];
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("blockers");
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus>("clear");
  const [data, setData] = useState<MissionControlData>({
    blockersForYou: [],
    openLoops: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load security status from localStorage on boot
  useEffect(() => {
    try {
      const saved = localStorage.getItem("atlas-security-status") as SecurityStatus | null;
      if (saved) setSecurityStatus(saved);
    } catch {}
  }, []);

  // Auto-open alerts tab when flagged
  const handleSecurityStatusChange = (status: SecurityStatus) => {
    setSecurityStatus(status);
    if (status === "flagged") {
      setActiveTab("alerts");
    }
  };

  const fetchData = () => {
    fetch(`/data/mission-control.json?t=${Date.now()}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load data:", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const items = activeTab === "blockers" ? data.blockersForYou : data.openLoops;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} securityStatus={securityStatus} />

      <main className="flex-1 px-4 py-4 md:p-8 pb-20 md:pb-0 md:ml-64 overflow-y-auto">

        {activeTab === "roster"    && <RosterTab />}
        {activeTab === "kanban"    && <KanbanBoard />}
        {activeTab === "routines"  && <RoutinesTab />}
        {activeTab === "decisions" && <DecisionsLog />}
        {activeTab === "access"    && <AccessStatus />}
        {activeTab === "vault"     && <MemoryVault />}
        {activeTab === "budget"    && <BudgetMeter />}
        {activeTab === "podcast"   && <PodcastReview />}
        {activeTab === "drafts"    && <DraftsTab />}
        {activeTab === "alerts"    && <AlertsTab onStatusChange={handleSecurityStatusChange} />}
        {activeTab === "goals"     && <GoalsTab />}
        {activeTab === "models"    && <ModelStatus />}

        {(activeTab === "blockers" || activeTab === "loops") && (
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {activeTab === "blockers" ? "Blockers for You" : "Open Loops"}
              </h1>
              <button
                onClick={fetchData}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
              >
                🔄 Refresh
              </button>
            </div>
            <p className="text-gray-600 mb-8">
              {activeTab === "blockers"
                ? "Items that need your attention or approval"
                : "Active tasks and ongoing work"}
              <span className="ml-2 text-xs text-gray-400">· Auto-refreshes every 30s</span>
            </p>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading...</p>
              </div>
            ) : items.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-gray-500">No items yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <BlockerCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
