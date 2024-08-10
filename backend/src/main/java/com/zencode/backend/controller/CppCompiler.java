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

@RestController
@CrossOrigin("*")
public class CppCompiler {

    @PostMapping("/cpp/compile")
    public ResponseEntity<CompileResponse> compileCode(@RequestBody CodeRequest codeRequest) {
        try {
            String code = codeRequest.getCode();
            File tempFile = File.createTempFile("code", ".cpp");
            try (FileWriter writer = new FileWriter(tempFile)) {
                writer.write(code);
            }

            long startTime = System.currentTimeMillis();
            ProcessBuilder compileBuilder = new ProcessBuilder("g++", tempFile.getAbsolutePath(), "-o", "output");
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
                ProcessBuilder runBuilder = new ProcessBuilder("./output");
                Process runProcess = runBuilder.start();

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
                while ((line = outputReader.readLine()) != null) {
                    output.append(line).append("\n");
                }

                return ResponseEntity.ok(new CompileResponse(output.toString(), compileTime, executionTime, memoryUsedMB));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new CompileResponse("Execution failed: " + e.getMessage()));
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

    public class CompileResponse {
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
