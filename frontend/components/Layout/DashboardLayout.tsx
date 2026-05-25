"use client";

import { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

import AIChatPanel from "../Chatbot/AIChatPanel";
import SafetyForm from "../form/SafetyForm";

export default function DashboardLayout() {
  const [formData, setFormData] = useState<any>({});
  const [showAI, setShowAI] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Header setShowAI={setShowAI} />

        <div className="flex flex-1 overflow-hidden">

          <div className="flex-1 overflow-auto p-6">

            <SafetyForm
              formData={formData}
              setFormData={setFormData}
            />

          </div>

          {showAI && (
            <AIChatPanel
              setFormData={setFormData}
            />
          )}

        </div>
      </div>
    </div>
  );
}