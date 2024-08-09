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
      const response = await axios.post(`http://localhost:8080/${endpoint}`, {
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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Code Editor</h1>
      <div className="mb-4">
        <label className="mr-2">Select Language: </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-2 py-1 border rounded"
        >
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
      </div>
      <div className="relative border rounded shadow-inner bg-white overflow-hidden" style={{ height: '300px' }}>
        <textarea
          ref={editorRef}
          value={code}
          onChange={handleCodeChange}
          onKeyDown={handleKeyDown}
          className="w-full h-full font-mono text-sm p-2 focus:outline-none focus:ring-0 text-black bg-white"
          spellCheck="false"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Run Code
      </button>
      <h2 className="text-xl font-semibold mt-6 mb-2">Output:</h2>
      <pre className="bg-gray-800 text-white p-4 rounded overflow-auto">
        {output}
      </pre>
    </div>
  );
}

export default Editor;
