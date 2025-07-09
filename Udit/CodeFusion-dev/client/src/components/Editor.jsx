// 🧠 Editor.jsx (updated with cookie-based fetch and save)
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { language, cmtheme, data } from "../atoms";
import ACTIONS from "../actions/Actions";
import axios from "axios";
import Codemirror from "codemirror";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/ayu-dark.css";
import "codemirror/theme/material.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

const Editor = ({ socketRef, roomId, onCodeChange, onOutputUpdate }) => {
  const editorRef = useRef(null);
  const lang = useRecoilValue(language);
  const theme = useRecoilValue(cmtheme);
  const [codeData, setCodeData] = useRecoilState(data);
  const [processing, setProcessing] = useState(false);

  // ✅ Fetch code from server on mount
  const fetchSavedCode = async () => {
    try {
      const res = await axios.get("http://localhost:5000/record/fetch", {
        withCredentials: true, 
      });
      const latest = res.data.records?.[0]?.data;
      if (latest) {
        editorRef.current?.setValue(latest);
        setCodeData(latest);
      } else {
        console.log("No saved code found");
      }
    } catch (err) {
      console.error("❌ Error fetching saved code:", err);
    }
  };

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: lang.value,
          theme: theme || "ayu-dark",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );

      fetchSavedCode(); // 🔁 load saved code

      editorRef.current.on("change", async (instance, changes) => {
        const code = instance.getValue();
        onCodeChange(code);
        setCodeData(code);

        // Real-time save to backend
        try {
          await axios.post(
            "http://localhost:5000/record/save",
            { roomId, data: code },
            { withCredentials: true } // ✅ send cookies
          );
        } catch (err) {
          console.error("❌ Realtime save failed:", err.message);
        }

        if (changes.origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.toTextArea();
        editorRef.current = null;
      }
    };
  }, [lang, theme]);

  const handleCompile = async () => {
    if (!codeData || !lang?.id) {
      console.warn("Missing code or language ID.");
      return;
    }

    setProcessing(true);

    const formData = {
      language_id: lang.id,
      source_code: btoa(codeData),
    };

    const options = {
      method: "POST",
      url: import.meta.env.VITE_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*", wait: "true" },
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      },
      data: formData,
    };

    try {
      const response = await axios.request(options);
      if (onOutputUpdate) onOutputUpdate(response.data);
    } catch (err) {
      const fallback = {
        status: { id: 0, description: "Error" },
        stderr: btoa(err.message || "Unknown error"),
      };
      if (onOutputUpdate) onOutputUpdate(fallback);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <style>{`
        .CodeMirror {
          height: 100% !important;
          font-size: 14px;
          background-color: #0f172a;
          color: #e2e8f0;
          border-radius: 0.5rem;
          padding: 0.75rem;
        }
      `}</style>

      <div className="flex flex-col w-full h-full bg-[#0f172a] text-white">
        {/* Toolbar */}
        <div className="flex justify-between items-center px-6 h-14 bg-[#1e293b] border-b border-gray-700">
          <div className="flex gap-4 text-sm">
            <span>
              Language:
              <span className="bg-blue-700 ml-2 px-2 py-1 rounded">
                {lang?.label || "N/A"}
              </span>
            </span>
            <span>
              Theme:
              <span className="bg-purple-700 ml-2 px-2 py-1 rounded">
                {theme}
              </span>
            </span>
          </div>
          <button
            onClick={handleCompile}
            disabled={processing || !codeData}
            className={`px-4 py-2 rounded-md font-semibold text-sm ${
              processing || !codeData
                ? "bg-green-700 opacity-50 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {processing ? "Running..." : "Compile ▶"}
          </button>
        </div>

        {/* Editor */}
        <div className="flex-1 p-2 overflow-hidden">
          <textarea id="realtimeEditor" className="w-full h-full" />
        </div>
      </div>
    </>
  );
};

export default Editor;
