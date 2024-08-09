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
import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.lang.management.MemoryUsage;

@RestController
@CrossOrigin("*")
public class PythonCompiler {

    @PostMapping("/python/compile")
    public ResponseEntity<String> executePythonCode(@RequestBody CodeRequest codeRequest) {
        try {
            String code = codeRequest.getCode();
            File tempFile = File.createTempFile("script", ".py");
            FileWriter writer = new FileWriter(tempFile);
            writer.write(code);
            writer.close();

            long startTime = System.currentTimeMillis();
            ProcessBuilder builder = new ProcessBuilder("python3", tempFile.getAbsolutePath());
            Process runProcess = builder.start();
            runProcess.waitFor();
            long executionTime = System.currentTimeMillis() - startTime;

            MemoryMXBean memoryBean = ManagementFactory.getMemoryMXBean();
            MemoryUsage heapUsage = memoryBean.getHeapMemoryUsage();
            long memoryUsed = heapUsage.getUsed();

            BufferedReader outputReader = new BufferedReader(new InputStreamReader(runProcess.getInputStream()));
            BufferedReader errorReader = new BufferedReader(new InputStreamReader(runProcess.getErrorStream()));
            
            StringBuilder output = new StringBuilder();
            StringBuilder errors = new StringBuilder();
            String line;
            while ((line = outputReader.readLine()) != null) {
                output.append(line).append("\n");
            }
            while ((line = errorReader.readLine()) != null) {
                errors.append(line).append("\n");
            }

            if (errors.length() > 0) {
                return ResponseEntity.ok("Execution errors:\n" + errors.toString());
            } else {
                return ResponseEntity.ok("Output:\n" + output.toString() +
                        "Execution time: " + executionTime + " ms\n" +
                        "Memory used: " + (memoryUsed / (1024 * 1024)) + " MB\n");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Execution failed: " + e.getMessage());
        }
    }

    public static class CodeRequest {
        private String code;

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }
    }
}
