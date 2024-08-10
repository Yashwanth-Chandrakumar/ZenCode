package com.zencode.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.lang.management.MemoryUsage;
import java.text.DecimalFormat;

@RestController
@CrossOrigin("*")
public class JavaCompiler {

    @PostMapping("/java/compile")
    public ResponseEntity<CompileResponse> compileAndRunJavaCode(@RequestBody CodeRequest codeRequest) {
        try {
            String code = codeRequest.getCode();
            String userInput = codeRequest.getInput();

            String className = extractClassName(code);
            if (className == null) {
                return ResponseEntity.badRequest().body(new CompileResponse("Invalid Java code: class name not found."));
            }

            File tempFile = new File(System.getProperty("java.io.tmpdir"), className + ".java");
            try (FileWriter writer = new FileWriter(tempFile)) {
                writer.write(code);
            }

            long startTime = System.currentTimeMillis();
            ProcessBuilder compileBuilder = new ProcessBuilder("javac", tempFile.getAbsolutePath());
            Process compileProcess = compileBuilder.start();
            compileProcess.waitFor();
            long compileTime = System.currentTimeMillis() - startTime;

            BufferedReader errorReader = new BufferedReader(new InputStreamReader(compileProcess.getErrorStream()));
            StringBuilder errors = new StringBuilder();
            String line;
            while ((line = errorReader.readLine()) != null) {
                errors.append(line).append("\n");
            }

            if (errors.length() > 0) {
                return ResponseEntity.ok(new CompileResponse("Compilation errors:\n" + errors.toString()));
            } else {
                startTime = System.currentTimeMillis();
                ProcessBuilder runBuilder = new ProcessBuilder("java", "-cp", tempFile.getParent(), className);
                Process runProcess = runBuilder.start();

                // Write user input to the Java process
                if (userInput != null && !userInput.isEmpty()) {
                    try (OutputStreamWriter inputWriter = new OutputStreamWriter(runProcess.getOutputStream())) {
                        inputWriter.write(userInput);
                        inputWriter.flush();
                    }
                }

                runProcess.waitFor();
                long executionTime = System.currentTimeMillis() - startTime;

                MemoryMXBean memoryBean = ManagementFactory.getMemoryMXBean();
                MemoryUsage heapUsage = memoryBean.getHeapMemoryUsage();
                long memoryUsed = heapUsage.getUsed();
                double memoryUsedMB = memoryUsed / (1024.0 * 1024);

                BufferedReader outputReader = new BufferedReader(new InputStreamReader(runProcess.getInputStream()));
                StringBuilder output = new StringBuilder();
                while ((line = outputReader.readLine()) != null) {
                    output.append(line).append("\n");
                }

                return ResponseEntity.ok(new CompileResponse(output.toString(), compileTime, executionTime, memoryUsedMB));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new CompileResponse("Compilation or execution failed: " + e.getMessage()));
        }
    }

    private String extractClassName(String code) {
        String className = null;
        String[] lines = code.split("\\r?\\n");
        for (String line : lines) {
            line = line.trim();
            if (line.startsWith("public class ")) {
                int startIndex = "public class ".length();
                int endIndex = line.indexOf(" ", startIndex);
                if (endIndex == -1) {
                    endIndex = line.indexOf("{", startIndex);
                }
                if (endIndex != -1) {
                    className = line.substring(startIndex, endIndex);
                }
                break;
            }
        }
        return className;
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
        private String data;
        private long compileTime;
        private long executionTime;
        private double memoryUsed;

        public CompileResponse(String data) {
            this.data = data;
        }

        public CompileResponse(String data, long compileTime, long executionTime, double memoryUsed) {
            this.data = data;
            this.compileTime = compileTime;
            this.executionTime = executionTime;
            this.memoryUsed = memoryUsed;
        }

        public String getData() {
            return data;
        }

        public void setData(String data) {
            this.data = data;
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
