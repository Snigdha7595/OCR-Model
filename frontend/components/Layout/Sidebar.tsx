import {
  Shield,
  ClipboardList,
  AlertTriangle,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-blue-900 text-white p-5">

      <h1 className="text-2xl font-bold mb-10">
        JinSafe AI
      </h1>

      <div className="space-y-6">

        <div className="flex items-center gap-3 cursor-pointer">
          <Shield size={20} />
          <span>Dashboard</span>
        </div>

        <div className="flex items-center gap-3 cursor-pointer">
          <ClipboardList size={20} />
          <span>Safety Observation</span>
        </div>

        <div className="flex items-center gap-3 cursor-pointer">
          <AlertTriangle size={20} />
          <span>Incident Management</span>
        </div>

      </div>
    </div>
  );
}