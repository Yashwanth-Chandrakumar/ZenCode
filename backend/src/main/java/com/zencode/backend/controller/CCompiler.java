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
public class CCompiler {

    @PostMapping("/c/compile")
    public ResponseEntity<String> compileCode(@RequestBody CodeRequest codeRequest) {
        try {
            String code = codeRequest.getCode();
            File tempFile = File.createTempFile("code", ".c");
            FileWriter writer = new FileWriter(tempFile);
            writer.write(code);
            writer.close();

            long startTime = System.currentTimeMillis();
            ProcessBuilder builder = new ProcessBuilder("gcc", tempFile.getAbsolutePath(), "-o", "output");
            Process compileProcess = builder.start();
            compileProcess.waitFor();
            long compileTime = System.currentTimeMillis() - startTime;

            BufferedReader errorReader = new BufferedReader(new InputStreamReader(compileProcess.getErrorStream()));
            StringBuilder errors = new StringBuilder();
            String line;
            while ((line = errorReader.readLine()) != null) {
                errors.append(line).append("\n");
            }

            if (errors.length() > 0) {
                return ResponseEntity.ok("Compilation errors:\n" + errors.toString());
            } else {
                startTime = System.currentTimeMillis();
                ProcessBuilder runBuilder = new ProcessBuilder("./output");
                Process runProcess = runBuilder.start();
                runProcess.waitFor();
                long executionTime = System.currentTimeMillis() - startTime;

                MemoryMXBean memoryBean = ManagementFactory.getMemoryMXBean();
                MemoryUsage heapUsage = memoryBean.getHeapMemoryUsage();
                long memoryUsed = heapUsage.getUsed();

                BufferedReader outputReader = new BufferedReader(new InputStreamReader(runProcess.getInputStream()));
                StringBuilder output = new StringBuilder();
                while ((line = outputReader.readLine()) != null) {
                    output.append(line).append("\n");
                }

                return ResponseEntity.ok("Output:\n" + output.toString() +
                        "Compilation time: " + compileTime + " ms\n" +
                        "Execution time: " + executionTime + " ms\n" +
                        "Memory used: " + (memoryUsed / (1024 * 1024)) + " MB\n");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Compilation failed: " + e.getMessage());
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
