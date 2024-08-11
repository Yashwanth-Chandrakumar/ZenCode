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
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin("*")
public class PythonCompiler {

    @PostMapping("/python/compile")
    public ResponseEntity<CompileResponse> compileAndRunPythonCode(@RequestBody CodeRequest codeRequest) {
        try {
            String code = codeRequest.getCode();

            if (containsMaliciousCode(code)) {
                return ResponseEntity.badRequest().body(new CompileResponse("Malicious code detected."));
            }

            File tempFile = File.createTempFile("code", ".py");
            try (FileWriter writer = new FileWriter(tempFile)) {
                writer.write(code);
            }

            long startTime = System.currentTimeMillis();
            ProcessBuilder builder = new ProcessBuilder("python3", tempFile.getAbsolutePath());
            Process runProcess = builder.start();

            if (codeRequest.getInput() != null && !codeRequest.getInput().isEmpty()) {
                try (OutputStreamWriter inputWriter = new OutputStreamWriter(runProcess.getOutputStream())) {
                    inputWriter.write(codeRequest.getInput());
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
            String line;
            while ((line = outputReader.readLine()) != null) {
                output.append(line).append("\n");
            }

            BufferedReader errorReader = new BufferedReader(new InputStreamReader(runProcess.getErrorStream()));
            StringBuilder errors = new StringBuilder();
            while ((line = errorReader.readLine()) != null) {
                errors.append(line).append("\n");
            }

            if (errors.length() > 0) {
                return ResponseEntity.ok(new CompileResponse("Execution errors:\n" + errors.toString()));
            }

            return ResponseEntity.ok(new CompileResponse(output.toString(), executionTime, memoryUsedMB));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new CompileResponse("Execution failed: " + e.getMessage()));
        }
    }

    
    private boolean containsMaliciousCode(String code) {
        
        List<String> dangerousPatterns = Arrays.asList(
                "system(", "exec(", "popen(", "fork(", "execve(", "kill(",
                "__import__('os')", "import os", "File.delete", "FileWriter",
                "PrintWriter", "Runtime.getRuntime().exec",
                "os.system(", "os.exec(", "subprocess.", "socket.");
    
     
        boolean hasDangerousPatterns = dangerousPatterns.stream().anyMatch(code::contains);
    

        boolean hasFilePaths = code.matches("(?i).*([a-zA-Z]:\\\\|/).*");
    
 
        boolean isFilePathOrCommand = code.matches("(?i).*([a-zA-Z]:\\\\|/).*") ||
                                      code.matches("(?i).*\\b[A-Z]:\\\\.*");
    
        return hasDangerousPatterns || isFilePathOrCommand;
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
        private long executionTime;
        private double memoryUsed;

        public CompileResponse(String data) {
            this.data = data;
            this.executionTime = 0;
            this.memoryUsed = 0.0;
        }

        public CompileResponse(String data, long executionTime, double memoryUsed) {
            this.data = data;
            this.executionTime = executionTime;
            this.memoryUsed = memoryUsed;
        }

        public String getData() {
            return data;
        }

        public void setData(String data) {
            this.data = data;
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
