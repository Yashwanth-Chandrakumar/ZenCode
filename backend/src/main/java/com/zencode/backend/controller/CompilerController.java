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
public class CompilerController {

    @PostMapping("/compile")

    public ResponseEntity<String> compileCode(@RequestBody CodeRequest codeRequest) {
        try {
            String code = codeRequest.getCode();

            File tempFile = File.createTempFile("code", ".cpp");
            FileWriter writer = new FileWriter(tempFile);
            writer.write(code);
            writer.close();

            ProcessBuilder builder = new ProcessBuilder("g++", tempFile.getAbsolutePath(), "-o", "output");
            Process compileProcess = builder.start();
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
                ProcessBuilder runBuilder = new ProcessBuilder("./output");
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
