"use client";

import { useState } from "react";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const openai = createOpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  compatibility: "strict",
});

export default function ChatInput() {
  const [input, setInput] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const prompt = `Generate only a complete and valid HTML document with inline CSS for website based on the following description: "${input}". Do not include explanations, comments, or any other text. Return only the HTML code. Use modern design and UI`;

    setInput("");
    setLoading(true);

    try {
      const { text } = await generateText({
        model: openai.chat("gpt-4-turbo"),
        messages: [{ role: "user", content: prompt }],
      });

      console.log("🚀 AI Response:", text);
      const generatedHtml = text?.replace(/```html|```/g, "").trim() ||'';
      setHtmlContent(generatedHtml);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const downloadHtmlFile = () => {
    if (!htmlContent) return;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "index.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center p-4 border-t border-gray-300 bg-white w-full">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-16 h-16 border-8 border-t-8 border-white border-t-transparent rounded-full animate-spin"></div>
          <div className="text-white text-lg ml-4">Generating...</div>
        </div>
      )}
      <div className="flex align-middle w-full ">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe what you want..."
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSendMessage}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Generate
      </button>
      </div>
      <div className="flex w-full mt-4">
        <div className="w-1/2 p-2 m-1 border bg-gray-100 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">Generated HTML</h3>
            <button
              onClick={downloadHtmlFile}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Download
            </button>
          </div>
          <pre className="whitespace-pre-wrap overflow-auto max-h-96 p-2 mt-1 border rounded bg-white">
            {htmlContent}
          </pre>
        </div>
        <div className="w-1/2 m-1 p-2 border bg-gray-100 rounded-lg">
          <h3 className="font-bold">Preview</h3>
          <iframe className="w-full h-96 border bg-white" srcDoc={htmlContent}></iframe>
        </div>
      </div>
    </div>
  );
}
