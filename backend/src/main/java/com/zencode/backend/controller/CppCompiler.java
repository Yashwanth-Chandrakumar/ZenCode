package com.zencode.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.io.InputStreamReader;
import java.text.DecimalFormat;

@RestController
@CrossOrigin("*")
public class CppCompiler {

    @PostMapping("/cpp/compile")
    public ResponseEntity<CompileResponse> compileCode(@RequestBody CodeRequest codeRequest) {
        CompileResponse response = new CompileResponse();
        try {
            String code = codeRequest.getCode();
            String input = codeRequest.getInput();
            File tempFile = File.createTempFile("code", ".cpp");
            FileWriter writer = new FileWriter(tempFile);
            writer.write(code);
            writer.close();

            long startTime = System.currentTimeMillis();
            ProcessBuilder builder = new ProcessBuilder("g++", tempFile.getAbsolutePath(), "-o", "output");
            Process compileProcess = builder.start();
            compileProcess.waitFor();
            response.setCompileTime(System.currentTimeMillis() - startTime);

            BufferedReader errorReader = new BufferedReader(new InputStreamReader(compileProcess.getErrorStream()));
            StringBuilder errors = new StringBuilder();
            String line;
            while ((line = errorReader.readLine()) != null) {
                errors.append(line).append("\n");
            }

            if (errors.length() > 0) {
                response.setOutput("Compilation errors:\n" + errors.toString());
                return ResponseEntity.ok(response);
            } else {
                startTime = System.currentTimeMillis();
                ProcessBuilder runBuilder = new ProcessBuilder("./output");
                Process runProcess = runBuilder.start();

                if (input != null && !input.isEmpty()) {
                    PrintWriter inputWriter = new PrintWriter(runProcess.getOutputStream());
                    inputWriter.println(input);
                    inputWriter.flush();
                    inputWriter.close();
                }

                runProcess.waitFor();
                response.setExecutionTime(System.currentTimeMillis() - startTime);

                long memoryUsed = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
                double memoryUsedMB = memoryUsed / (1024.0 * 1024);
                response.setMemoryUsed(memoryUsedMB);

                BufferedReader outputReader = new BufferedReader(new InputStreamReader(runProcess.getInputStream()));
                StringBuilder output = new StringBuilder();
                while ((line = outputReader.readLine()) != null) {
                    output.append(line).append("\n");
                }

                response.setOutput(output.toString());
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            response.setOutput("Compilation failed: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    public static class CodeRequest {
        private String code;
        private String input;

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }

        public String getInput() {
            return input;
        }

        public void setInput(String input) {
            this.input = input;
        }
    }

    public static class CompileResponse {
        private String output;
        private long compileTime;
        private long executionTime;
        private double memoryUsed;

        public String getOutput() {
            return output;
        }

        public void setOutput(String output) {
            this.output = output;
        }

        public long getCompileTime() {
            return compileTime;
        }

        public void setCompileTime(long compileTime) {
            this.compileTime = compileTime;
        }

        public long getExecutionTime() {
            return executionTime;
        }

        public void setExecutionTime(long executionTime) {
            this.executionTime = executionTime;
        }

        public double getMemoryUsed() {
            return memoryUsed;
        }

        public void setMemoryUsed(double memoryUsed) {
            this.memoryUsed = memoryUsed;
        }
    }
}
