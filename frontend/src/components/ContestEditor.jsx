import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

function ContestEditor({ problem, contestId, updateScore }) {
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

  const pythonDefault = `print("Hello, World!")`;

  const cDefault = `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`;

const [language, setLanguage] = useState("cpp");
const [code, setCode] = useState("");
const [input, setInput] = useState("");
const [output, setOutput] = useState("");
const [compilationTime, setCompilationTime] = useState("");
const [executionTime, setExecutionTime] = useState("");
const [memoryUsed, setMemoryUsed] = useState("");
const [testResults, setTestResults] = useState([]);
const [submissionResults, setSubmissionResults] = useState(null);
const editorRef = useRef(null);
useEffect(() => {
    if (problem) {
      setCode(problem.defaultCode || getDefaultCodeForLanguage(language));
      setInput("");
      setOutput("");
      setCompilationTime("");
      setExecutionTime("");
      setMemoryUsed("");
      setTestResults([]);
      setSubmissionResults(null);
    }
  }, [problem, language]);
  const getDefaultCodeForLanguage = (lang) => {
    switch (lang) {
      case "cpp":
        return cppDefault;
      case "java":
        return javaDefault;
      case "python":
        return pythonDefault;
      case "c":
        return cDefault;
      default:
        return cppDefault;
    }
  };
  useEffect(() => {
    switch (language) {
      case "cpp":
        setCode(cppDefault);
        break;
      case "java":
        setCode(javaDefault);
        break;
      case "python":
        setCode(pythonDefault);
        break;
      case "c":
        setCode(cDefault);
        break;
      default:
        setCode(cppDefault);
    }
  }, [language]);

  const getEndpoint = () => {
    switch (language) {
      case "cpp":
        return "cpp/compile";
      case "java":
        return "java/compile";
      case "python":
        return "python/compile";
      case "c":
        return "c/compile";
      default:
        return "cpp/compile";
    }
  };

  const runCode = async (testCases) => {
    const results = [];
    const endpoint = getEndpoint();

    for (const testCase of testCases) {
      try {
        const response = await axios.post(
          `http://54.209.231.217:8080/${endpoint}`,
          {
            code,
            input: testCase.testCases,
          }
        );
        
        const result = {
          input: testCase.testCases,
          expectedOutput: testCase.answers,
          actualOutput: response.data.data.trim(),
          passed: response.data.data.trim() === testCase.answers.trim(),
          compilationTime: response.data.compileTime,
          executionTime: response.data.executionTime,
          memoryUsed: response.data.memoryUsed,
        };
        results.push(result);
      } catch (error) {
        results.push({
          input: testCase.testCases,
          expectedOutput: testCase.answers,
          actualOutput: "Error: " + error.message,
          passed: false,
        });
      }
    }
    return results;
  };

  const handleRunCode = async () => {
    if (!problem || !problem.testCases) {
        setOutput("No test cases available");
        return;
      }
      const visibleTestCases = problem.testCases.slice(0, 2);
      const results = await runCode(visibleTestCases);
      setTestResults(results);
    
  };
  const [submittedQuestions, setSubmittedQuestions] = useState(new Set());

  const handleSubmitCode = async () => {
    if (!problem || !problem.testCases) {
        setOutput("No test cases available");
        return;
      }
      const allTestCases = problem.testCases;
      const results = await runCode(allTestCases);
      const passedCount = results.filter(result => result.passed).length;
      
      // Calculate score based on passed test cases
      const totalTests = allTestCases.length;
      const scoreForThisQuestion = Math.round((passedCount / totalTests)*10 );
      
      setSubmissionResults({
        totalTests: totalTests,
        passedTests: passedCount,
        results: results,
        score: scoreForThisQuestion
      });
    
      // Update the score only if it hasn't been submitted before
      if (!submittedQuestions.has(problem.id)) {
        updateScore(scoreForThisQuestion);
        setSubmittedQuestions(prev => new Set(prev).add(problem.id));
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
    } else if (["(", "{", "[", '"', "'"].includes(e.key)) {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      let closingBracket = "";
      switch (e.key) {
        case "(":
          closingBracket = ")";
          break;
        case "{":
          closingBracket = "}";
          break;
        case "[":
          closingBracket = "]";
          break;
        case '"':
          closingBracket = '"';
          break;
        case "'":
          closingBracket = "'";
          break;
        default:
          break;
      }

      const newCode = code.substring(0, start) + e.key + closingBracket + code.substring(end);
      setCode(newCode);

      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 1;
      }, 0);
    }
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleInputChange = (e) => {  
    setInput(e.target.value);
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
      .replace(
        /("(?:[^"\\]|\\.)*")/g,
        '<span class="text-yellow-500">$1</span>'
      ) 
      .replace(
        /\b(vector|int|float|double|char|string|String|bool|void|if|else|for|while|return|public|private|class|static|const)\b/g,
        '<span class="text-blue-500">$1</span>'
      ) 
      .replace(
        /(#include|#define|using namespace std)/g,
        '<span class="text-purple-500">$1</span>'
      ) 
      .replace(/(import)/g, '<span class="text-purple-500">$1</span>') 
      .replace(/(endl|cout|cin|input)/g, '<span class="text-green-600">$1</span>') 
      .replace(
        /(System.out.println|System.out.print|printf|print)/g,
        '<span class="text-red-500">$1</span>'
      ); 

    return highlightedCode;
  };

  const lineNumbersRef = useRef(null);
  const editorWrapperRef = useRef(null);
  const highlightedCodeRef = useRef(null);
  const textareaRef = useRef(null);

  const updateLineNumbers = () => {
    const lineCount = code.split("\n").length;
    const lineNumbers = Array(lineCount)
      .fill()
      .map((_, i) => `<div>${i + 1}</div>`)
      .join("");
    lineNumbersRef.current.innerHTML = lineNumbers;
};

  useEffect(() => {
    const highlighted = syntaxHighlight(code);
    highlightedCodeRef.current.innerHTML = highlighted.replace(/\n/g, "<br>");
    updateLineNumbers();
    
    // Synchronize scroll position after updating content
    if (textareaRef.current && highlightedCodeRef.current) {
      highlightedCodeRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightedCodeRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, [code]);
  

  const handleScroll = (e) => {
    if (editorWrapperRef.current) {
      const { scrollTop, scrollLeft } = e.target;
      lineNumbersRef.current.scrollTop = scrollTop;
      highlightedCodeRef.current.scrollTop = scrollTop;
      highlightedCodeRef.current.scrollLeft = scrollLeft;
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="mb-4">
        <label className="mr-2 text-black dark:text-white">
          Select Language:{" "}
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-2 py-1 border rounded bg-white dark:bg-gray-700 dark:text-white"
        >
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="c">C</option>
        </select>
      </div>
      <div
        className="relative border rounded shadow-inner overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-700 flex"
        style={{ height: "400px" }}
      >
        <div
          ref={lineNumbersRef}
          className="font-mono text-sm p-2 text-gray-500 dark:text-gray-400 text-right pr-4 border-r border-gray-300 dark:border-gray-600 select-none overflow-hidden"
          style={{ minWidth: "40px" }}
        ></div>
        <div
          ref={editorWrapperRef}
          className="relative flex-grow overflow-hidden"
        >
          <pre
  ref={highlightedCodeRef}
  className="absolute inset-0 font-mono text-sm p-2 text-black dark:text-white pointer-events-none whitespace-pre overflow-auto"
  aria-hidden="true"
></pre>
<textarea
  ref={textareaRef}
  value={code}
  onChange={handleCodeChange}
  onKeyDown={handleKeyDown}
  onScroll={handleScroll}
  className="absolute inset-0 w-full h-full font-mono text-sm p-2 bg-transparent text-transparent caret-black dark:caret-white focus:outline-none focus:ring-0 resize-none overflow-auto"
  spellCheck="false"
/>
        </div>
      </div>
      <div className="mt-4 space-x-4">
        <button
          onClick={handleRunCode}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Run Code
        </button>
        <button
  onClick={handleSubmitCode}
//   disabled={submittedQuestions.has(problem.id)}
  className={`px-4 py-2 text-white rounded ${
    submittedQuestions.has(problem.id)
      ? 'bg-gray-400'
      : 'bg-green-500 hover:bg-green-600'
  }`}
>
  Submit Code
</button>
      </div>
      <div className="text-lg font-semibold">
    Score: {submissionResults ? submissionResults.score : 0} / {submissionResults ? submissionResults.totalTests : 0}
  </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2 text-black dark:text-white">
          Results:
        </h2>
        <div className="mt-6 space-y-6">
  {testResults.length > 0 && (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Test Results:</h3>
      <ul className="space-y-4">
        {testResults.map((result, index) => (
          <li
            key={index}
            className={`p-4 border rounded ${
              result.passed ? "bg-green-50 dark:bg-green-900" : "bg-red-50 dark:bg-red-900"
            }`}
          >
            <div>
              <strong className="text-gray-900 dark:text-gray-100">Input:</strong>
              <pre className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-gray-900 dark:text-gray-100">{result.input}</pre>
            </div>
            <div className="mt-2">
              <strong className="text-gray-900 dark:text-gray-100">Expected Output:</strong>
              <pre className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-gray-900 dark:text-gray-100">{result.expectedOutput}</pre>
            </div>
            <div className="mt-2">
              <strong className="text-gray-900 dark:text-gray-100">Actual Output:</strong>
              <pre className={`bg-gray-200 dark:bg-gray-700 p-2 rounded ${
                result.passed ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}>{result.actualOutput}</pre>
            </div>
            {result.compilationTime && (
              <div className="mt-2">
                <strong className="text-gray-900 dark:text-gray-100">Compilation Time:</strong> {result.compilationTime} ms
              </div>
            )}
            <div className="mt-2">
              <strong className="text-gray-900 dark:text-gray-100">Execution Time:</strong> {result.executionTime} ms
            </div>
            <div className="mt-2">
              <strong className="text-gray-900 dark:text-gray-100">Memory Used:</strong> {result.memoryUsed} MB
            </div>
          </li>
        ))}
      </ul>
    </div>
  )}
  {submissionResults && (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Submission Results:</h3>
      <div className="p-4 border rounded bg-gray-100 dark:bg-gray-800">
        <p className="text-gray-900 dark:text-gray-100">
          Total Tests: <strong>{submissionResults.totalTests}</strong>
        </p>
        <p className="text-gray-900 dark:text-gray-100">
          Passed Tests: <strong>{submissionResults.passedTests}</strong>
        </p>
        <div className="mt-4">
          {submissionResults.results.map((result, index) => (
            <div
              key={index}
              className={`p-4 border rounded ${
                result.passed ? "bg-green-50 dark:bg-green-900" : "bg-red-50 dark:bg-red-900"
              }`}
            >
              <div>
                <strong className="text-gray-900 dark:text-gray-100">Input:</strong>
                <pre className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-gray-900 dark:text-gray-100">{result.input}</pre>
              </div>
              <div className="mt-2">
                <strong className="text-gray-900 dark:text-gray-100">Expected Output:</strong>
                <pre className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-gray-900 dark:text-gray-100">{result.expectedOutput}</pre>
              </div>
              <div className="mt-2">
                <strong className="text-gray-900 dark:text-gray-100">Actual Output:</strong>
                <pre className={`bg-gray-200 dark:bg-gray-700 p-2 rounded ${
                  result.passed ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}>{result.actualOutput}</pre>
              </div>
              {result.compilationTime && (
              <div className="mt-2">
                <strong className="text-gray-900 dark:text-gray-100">Compilation Time:</strong> {result.compilationTime} ms
              </div>
            )}
              <div className="mt-2">
                <strong className="text-gray-900 dark:text-gray-100">Execution Time:</strong> {result.executionTime} ms
              </div>
              <div className="mt-2">
                <strong className="text-gray-900 dark:text-gray-100">Memory Used:</strong> {result.memoryUsed} MB
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}
</div>

      </div>
    </div>
  );
}

export default ContestEditor;