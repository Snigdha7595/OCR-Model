import { Bot } from "lucide-react";

export default function Header({
  setShowAI,
}: any) {
  return (
    <div className="h-16 bg-white shadow-sm flex items-center justify-between px-6">

      <h2 className="text-xl font-semibold">
        Safety Observation
      </h2>

      <button
        onClick={() => setShowAI((prev: boolean) => !prev)}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        <Bot size={18} />
        AI Assistant
      </button>

    </div>
  );
}