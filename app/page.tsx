"use client";

import { useState, useEffect } from "react";
import BlockerCard from "@/components/BlockerCard";
import Navigation from "@/components/Navigation";

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
  const [activeTab, setActiveTab] = useState<"blockers" | "loops">("blockers");
  const [data, setData] = useState<MissionControlData>({
    blockersForYou: [],
    openLoops: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/data/mission-control.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load data:", err);
        setIsLoading(false);
      });
  }, []);

  const items = activeTab === "blockers" ? data.blockersForYou : data.openLoops;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 md:ml-64">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {activeTab === "blockers" ? "Blockers for You" : "Open Loops"}
          </h1>
          <p className="text-gray-600 mb-8">
            {activeTab === "blockers"
              ? "Items that need your attention or approval"
              : "Active tasks and ongoing work"}
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
      </main>
    </div>
  );
}
