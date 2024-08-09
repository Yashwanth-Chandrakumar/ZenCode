import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

function Editor() {
  const cppDefault = `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`;

  const javaDefault = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;

  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(cppDefault);
  const [output, setOutput] = useState("");
  const editorRef = useRef(null);

  useEffect(() => {
    setCode(language === "cpp" ? cppDefault : javaDefault);
  }, [language]);

  const handleSubmit = async () => {
    const endpoint = language === "cpp" ? "cpp/compile" : "java/compile";
    try {
      const response = await axios.post(`https://zencode-latest.onrender.com/${endpoint}`, {
        code,
      });
      setOutput(response.data);
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + "    " + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">Code Editor</h1>
      <div className="mb-4">
        <label className="mr-2 text-black dark:text-white">Select Language: </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-2 py-1 border rounded bg-white dark:bg-gray-700 dark:text-white"
        >
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
      </div>
      <div
        className="relative border rounded shadow-inner overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-700"
        style={{ height: "300px" }}
      >
        <textarea
          ref={editorRef}
          value={code}
          onChange={handleCodeChange}
          onKeyDown={handleKeyDown}
          className="w-full h-full font-mono text-sm p-2 focus:outline-none focus:ring-0 text-black dark:text-white dark:bg-black"
          spellCheck="false"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 rounded bg-blue-600 text-white hover:opacity-80 dark:bg-blue-500"
      >
        Run Code
      </button>
      <h2 className="text-xl font-semibold mt-6 mb-2 text-black dark:text-white">Output:</h2>
      <pre className="p-4 rounded overflow-auto bg-gray-100 dark:bg-gray-800 dark:text-white text-black">
        {output}
      </pre>
    </div>
  );
}

export default Editor;
