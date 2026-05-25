"use client";

import { useState } from "react";
import axios from "axios";

export default function AIChatPanel({
  setFormData
}: any) {

  // ==========================================
  // STATES
  // ==========================================

  const [inputText, setInputText] =
    useState("");

  const [selectedFile, setSelectedFile] =
    useState<any>(null);

  const [messages, setMessages] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  // ==========================================
  // ANALYZE TEXT
  // ==========================================

  const analyzeText = async () => {

    if (!inputText.trim()) {
      return;
    }

    try {

      setLoading(true);

      // USER MESSAGE
      setMessages((prev) => [
        ...prev,
        {
          type: "user",
          text: inputText
        }
      ]);

      // API CALL
      const response = await axios.post(
        "http://localhost:8000/analyze-text",
        { text: inputText }
      );

      console.log("AI RESPONSE:", response.data);

      // SHOW RESPONSE
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: JSON.stringify(response.data, null, 2)
        }
      ]);

      // AUTO FILL FORM
      if (
        response.data.success &&
        response.data.ai_response?.success
      ) {
        setFormData(response.data.ai_response.ai_response);
      }

      // CLEAR INPUT
      setInputText("");

    } catch (error: any) {

      console.error(error);

      const errorMessage =
        error?.response?.data?.error ||
        error.message ||
        "Analysis Failed";

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: errorMessage,
        },
      ]);

    } finally {
      setLoading(false);
    }

  };

  // ==========================================
  // FILE UPLOAD
  // ==========================================

  const uploadFile = async () => {

    if (!selectedFile) {
      alert("Please select file");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      // SHOW USER MESSAGE
      setMessages((prev) => [
        ...prev,
        {
          type: "user",
          text: `Uploaded File: ${selectedFile.name}`
        }
      ]);

      // API CALL
      const response = await axios.post(
        "http://localhost:8000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log("UPLOAD RESPONSE:", response.data);

      // SHOW AI RESPONSE
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: JSON.stringify(response.data.ai_response, null, 2)
        }
      ]);

      // ✅ FIXED: correct nesting check
      if (
        response.data.success &&
        response.data.ai_response?.success
      ) {
        setFormData(response.data.ai_response.ai_response);
      }

      // CLEAR FILE
      setSelectedFile(null);

    } catch (error: any) {

      console.error(error);

      const errorMessage =
        error?.response?.data?.error ||
        error.message ||
        "File Analysis Failed";

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: errorMessage,
        },
      ]);

    } finally {
      setLoading(false);
    }

  };

  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="
      h-screen
      flex
      flex-col
      bg-white
    ">

      {/* HEADER */}
      <div className="
        p-4
        border-b
        bg-blue-600
        text-white
      ">
        <h2 className="text-lg font-semibold">
          AI Safety Assistant
        </h2>
        <p className="text-xs text-blue-100 mt-1">
          Analyze text & files
        </p>
      </div>

      {/* CHAT AREA */}
      <div className="
        flex-1
        overflow-y-auto
        p-4
        space-y-4
        bg-[#f8fbff]
      ">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`
              p-3
              rounded-2xl
              text-sm
              whitespace-pre-wrap
              ${
                msg.type === "user"
                  ? "bg-blue-600 text-white ml-8"
                  : "bg-white border mr-8"
              }
            `}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="
            bg-white
            border
            p-3
            rounded-2xl
            text-sm
            mr-8
          ">
            Analyzing...
          </div>
        )}

      </div>

      {/* INPUT AREA */}
      <div className="
        p-4
        border-t
        bg-white
      ">

        {/* FILE INPUT */}
        <input
          type="file"
          onChange={(e: any) =>
            setSelectedFile(e.target.files[0])
          }
          className="
            w-full
            border
            p-2
            rounded-xl
            mb-3
            text-sm
          "
        />

        {/* FILE BUTTON */}
        <button
          onClick={uploadFile}
          disabled={loading}
          className="
            w-full
            bg-green-600
            hover:bg-green-700
            text-white
            py-2
            rounded-xl
            text-sm
            mb-4
          "
        >
          Upload & Analyze File
        </button>

        {/* TEXT AREA */}
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="
            w-full
            border
            rounded-xl
            p-3
            text-sm
            h-40
            resize-none
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

        {/* TEXT BUTTON */}
        <button
          onClick={analyzeText}
          disabled={loading}
          className="
            w-full
            mt-3
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            rounded-xl
            text-sm
            font-medium
            transition
          "
        >
          {loading ? "Analyzing..." : "Analyze Text & Fill Form"}
        </button>

      </div>

    </div>
  );
}