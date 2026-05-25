"use client";

import { useState } from "react";
import AIChatPanel from "@/components/Chatbot/AIChatPanel";

export default function HomePage() {

  // ==========================================
  // AI PANEL
  // ==========================================

  const [showAI, setShowAI] =
    useState(true);

  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] =
    useState({

      unit_name: "",
      department: "",
      visited_section: "",
      observer_name: "",
      duration: "",
      risk_type: ""

    });

  // ==========================================
  // MANUAL INPUT CHANGE
  // ==========================================

  const handleChange = (
    e: any
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });
  };

  // ==========================================
  // AI FORM FILL
  // ==========================================

  const handleAIFormFill = (
    data: any
  ) => {

    console.log(
      "FULL AI RESPONSE:",
      data
    );

    let ai = {};

    // ==========================================
    // HANDLE RESPONSE
    // ==========================================

    if (
      data?.ai_response
    ) {

      ai = data.ai_response;
    }

    else {

      ai = data;
    }

    console.log(
      "FINAL AI DATA:",
      ai
    );

    // ==========================================
    // UPDATE FORM
    // ==========================================

    setFormData({

      unit_name:
        (ai as any).unit_name || "",

      department:
        (ai as any).department || "",

      visited_section:
        (ai as any).visited_section || "",

      observer_name:
        (ai as any).observer_name || "",

      duration:
        (ai as any).duration || "",

      risk_type:
        (ai as any).risk_type || ""

    });

  };

  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="
      flex
      min-h-screen
      bg-[#eef4ff]
      overflow-hidden
    ">

      {/* ========================================== */}
      {/* MAIN PAGE */}
      {/* ========================================== */}

      <div
        className={`
          transition-all
          duration-300
          ${showAI
            ? "w-[calc(100%-400px)]"
            : "w-full"}
        `}
      >

        <div className="p-6">

          <div className="
            bg-white
            rounded-3xl
            shadow-lg
            p-8
            min-h-[95vh]
          ">

            {/* ========================================== */}
            {/* HEADER */}
            {/* ========================================== */}

            <div className="
              flex
              justify-between
              items-center
              mb-10
            ">

              <div>

                <h1 className="
                  text-3xl
                  font-bold
                  text-[#0f172a]
                ">
                  Unit And SO Details
                </h1>

                <p className="
                  text-gray-500
                  mt-1
                  text-sm
                ">
                  AI Powered Safety Observation Form
                </p>

              </div>

              <button

                onClick={() =>
                  setShowAI(
                    !showAI
                  )
                }

                className="
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-5
                  py-2.5
                  rounded-xl
                  text-sm
                  font-medium
                  transition
                "
              >

                {
                  showAI
                    ? "Close AI"
                    : "Open AI"
                }

              </button>

            </div>

            {/* ========================================== */}
            {/* FORM */}
            {/* ========================================== */}

            <div className="
              grid
              grid-cols-2
              gap-6
            ">

              {/* UNIT */}

              <div>

                <label className="
                  block
                  text-sm
                  font-semibold
                  mb-2
                ">
                  Unit Name
                </label>

                <select
                  name="unit_name"
                  value={formData.unit_name}
                  onChange={handleChange}
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-xl
                    p-3
                    text-sm
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                >

                  <option value="">
                    Select Unit
                  </option>

                  <option value="Angul">
                    Angul
                  </option>

                  <option value="Raigarh">
                    Raigarh
                  </option>

                </select>

              </div>

              {/* DEPARTMENT */}

              <div>

                <label className="
                  block
                  text-sm
                  font-semibold
                  mb-2
                ">
                  Department
                </label>

                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-xl
                    p-3
                    text-sm
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                >

                  <option value="">
                    Select Department
                  </option>

                  <option value="Coke Oven">
                    Coke Oven
                  </option>

                  <option value="Blast Furnace">
                    Blast Furnace
                  </option>

                </select>

              </div>

              {/* VISITED SECTION */}

              <div>

                <label className="
                  block
                  text-sm
                  font-semibold
                  mb-2
                ">
                  Visited Section
                </label>

                <select
                  name="visited_section"
                  value={formData.visited_section}
                  onChange={handleChange}
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-xl
                    p-3
                    text-sm
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                >

                  <option value="">
                    Select Section
                  </option>

                  <option value="Mechanical">
                    Mechanical
                  </option>

                  <option value="Electrical">
                    Electrical
                  </option>

                  <option value="Production">
                    Production
                  </option>

                </select>

              </div>

              {/* OBSERVER */}

              <div>

                <label className="
                  block
                  text-sm
                  font-semibold
                  mb-2
                ">
                  Observer Name
                </label>

                <input
                  type="text"
                  name="observer_name"
                  value={formData.observer_name}
                  onChange={handleChange}
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-xl
                    p-3
                    text-sm
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />

              </div>

              {/* DURATION */}

              <div>

                <label className="
                  block
                  text-sm
                  font-semibold
                  mb-2
                ">
                  Duration
                </label>

                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-xl
                    p-3
                    text-sm
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />

              </div>

              {/* RISK */}

              <div>

                <label className="
                  block
                  text-sm
                  font-semibold
                  mb-2
                ">
                  Risk Type
                </label>

                <input
                  type="text"
                  name="risk_type"
                  value={formData.risk_type}
                  onChange={handleChange}
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-xl
                    p-3
                    text-sm
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================== */}
      {/* AI PANEL */}
      {/* ========================================== */}

      {
        showAI && (

          <div className="
            w-[400px]
            min-w-[400px]
            bg-white
            border-l
            shadow-xl
            overflow-y-auto
          ">

            <AIChatPanel
              setFormData={
                handleAIFormFill
              }
            />

          </div>

        )
      }

    </div>
  );
}