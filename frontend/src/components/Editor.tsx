import axios from "axios";
import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    setCode(language === "cpp" ? cppDefault : javaDefault);
  }, [language]);

  const handleSubmit = async () => {
    const endpoint = language === "cpp" ? "cpp/compile" : "java/compile";
    try {
      const response = await axios.post(`http://localhost:8080/${endpoint}`, { code });
      setOutput(response.data);
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Code Editor</h1>
      <div style={{ marginBottom: "10px" }}>
        <label>Select Language: </label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
      </div>
      <textarea
        rows={15}
        cols={80}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ fontFamily: "monospace", fontSize: "14px" }}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Run Code</button>
      <h2>Output:</h2>
      <pre>{output}</pre>
    </div>
  );
}

export default Editor;
