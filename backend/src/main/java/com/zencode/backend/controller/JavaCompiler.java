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

@RestController
@CrossOrigin("*")
public class JavaCompiler {

    
    @PostMapping("/java/compile")
    public ResponseEntity<String> compileAndRunJavaCode(@RequestBody CodeRequest codeRequest) {
        try {
            String code = codeRequest.getCode();
            String className = extractClassName(code);

            if (className == null) {
                return ResponseEntity.badRequest().body("Invalid Java code: class name not found.");
            }

            File tempFile = new File(System.getProperty("java.io.tmpdir"), className + ".java");
            FileWriter writer = new FileWriter(tempFile);
            writer.write(code);
            writer.close();

            ProcessBuilder compileBuilder = new ProcessBuilder("javac", tempFile.getAbsolutePath());
            Process compileProcess = compileBuilder.start();
            compileProcess.waitFor();

            BufferedReader errorReader = new BufferedReader(new InputStreamReader(compileProcess.getErrorStream()));
            StringBuilder errors = new StringBuilder();
            String line;
            while ((line = errorReader.readLine()) != null) {
                errors.append(line).append("\n");
            }

            if (errors.length() > 0) {
                return ResponseEntity.ok(errors.toString());
            } else {
                ProcessBuilder runBuilder = new ProcessBuilder("java", "-cp", tempFile.getParent(), className);
                Process runProcess = runBuilder.start();
                runProcess.waitFor();

                BufferedReader outputReader = new BufferedReader(new InputStreamReader(runProcess.getInputStream()));
                StringBuilder output = new StringBuilder();
                while ((line = outputReader.readLine()) != null) {
                    output.append(line).append("\n");
                }
                return ResponseEntity.ok(output.toString());
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Compilation or execution failed: " + e.getMessage());
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

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }
    }

}
