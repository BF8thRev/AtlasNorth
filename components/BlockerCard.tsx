import type { Item } from "@/app/page";

type BlockerCardProps = {
  item: Item;
};

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  blocked: { label: "Blocked", color: "bg-red-100 text-red-800" },
  "in-progress": { label: "In Progress", color: "bg-blue-100 text-blue-800" },
  waiting: { label: "Waiting", color: "bg-purple-100 text-purple-800" },
  done: { label: "Done", color: "bg-green-100 text-green-800" },
};

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-red-600 font-bold";
  if (score >= 60) return "text-orange-600 font-semibold";
  if (score >= 40) return "text-yellow-600 font-medium";
  return "text-green-600";
};

export default function BlockerCard({ item }: BlockerCardProps) {
  const status = statusConfig[item.status];

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        {/* Left side: Title and Notes */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4">{item.notes}</p>

          {/* Status Badge */}
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${status.color}`}
          >
            {status.label}
          </span>
        </div>

        {/* Right side: Scores */}
        <div className="flex md:flex-col gap-4 md:gap-2 md:items-end">
          <div className="text-center md:text-right">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Impact
            </div>
            <div className={`text-3xl font-bold ${getScoreColor(item.impact)}`}>
              {item.impact}
            </div>
          </div>

          <div className="text-center md:text-right">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Difficulty
            </div>
            <div className={`text-3xl font-bold ${getScoreColor(item.difficulty)}`}>
              {item.difficulty}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
