import axios from 'axios';
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
      const response = await axios.post(`http://3.91.74.46:8080/${endpoint}`, {
        code,
      });
      console.log(response)
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

  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const syntaxHighlight = (code) => {
    let highlightedCode = escapeHtml(code)
      // .replace(/(\/\/.*$)/gm, '<span class="text-green-600">$1</span>') // single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '<span class="text-green-600">$&</span>') // multi-line comments
      .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="text-yellow-500">$1</span>') // strings
      .replace(/\b(vector|int|float|double|char|string|String|bool|void|if|else|for|while|return|public|private|class|static|const)\b/g, '<span class="text-blue-500">$1</span>') // keywords
      .replace(/(#include|#define|using namespace std)/g, '<span class="text-purple-500">$1</span>') // preprocessor directives
      .replace(/(import)/g, '<span class="text-purple-500">$1</span>') // preprocessor directives
      .replace(/(endl|cout|cin)/g, '<span class="text-green-600">$1</span>') // preprocessor directives
      .replace(/(System.out.println|System.out.print)/g, '<span class="text-red-500">$1</span>'); // preprocessor directives

    return highlightedCode;
  };

  const lineNumbersRef = useRef(null);

  const updateLineNumbers = () => {
    const lineCount = code.split('\n').length;
    const lineNumbers = Array(lineCount).fill().map((_, i) => i + 1).join('<br>');
    lineNumbersRef.current.innerHTML = lineNumbers;
  };

  useEffect(() => {
    const highlighted = syntaxHighlight(code);
    editorRef.current.innerHTML = highlighted.replace(/\n/g, "<br>");
    updateLineNumbers();
  }, [code]);

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
      <div className="relative border rounded shadow-inner overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-700 flex" style={{ height: "300px" }}>
        <div
          ref={lineNumbersRef}
          className="font-mono text-sm p-2 text-gray-500 dark:text-gray-400 text-right pr-4 border-r border-gray-300 dark:border-gray-600 select-none"
          style={{ minWidth: "40px" }}
        ></div>
        <div className="relative flex-grow">
          <pre
            ref={editorRef}
            className="absolute inset-0 font-mono text-sm p-2 text-black dark:text-white pointer-events-none whitespace-pre-wrap overflow-hidden"
            aria-hidden="true"
          ></pre>
          <textarea
            value={code}
            onChange={handleCodeChange}
            onKeyDown={handleKeyDown}
            onScroll={(e) => {
              editorRef.current.scrollTop = e.target.scrollTop;
              lineNumbersRef.current.scrollTop = e.target.scrollTop;
            }}
            className="absolute inset-0 w-full h-full font-mono text-sm p-2 bg-transparent text-transparent caret-black dark:caret-white focus:outline-none focus:ring-0 resize-none"
            spellCheck="false"
          />
        </div>
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