import axios from "axios";
import React, { useState } from "react";

function Editor() {
  const [code, setCode] = useState("#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello, World!\" << endl;\n    return 0;\n}");
  const [output, setOutput] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8080/compile", { code });
      setOutput(response.data.output);
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>C++ Code Editor</h1>
      <textarea
        rows="15"
        cols="80"
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
