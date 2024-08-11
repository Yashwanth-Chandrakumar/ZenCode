package com.zencode.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.*;
import java.util.concurrent.*;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin("*")
public class UnifiedCompiler {

    private static final long TIMEOUT_SECONDS = 5;
    private static final long MAX_MEMORY_MB = 100;

    @PostMapping("api/{language}/compile")
    public ResponseEntity<CompileResponse> compileAndRun(@PathVariable String language,
            @RequestBody CodeRequest codeRequest) {
        try {
            String code = codeRequest.getCode();

            // Check for potentially malicious code or file paths
            if (containsMaliciousCode(code)) {
                return ResponseEntity
                        .ok(new CompileResponse("Error: Potentially malicious code or file path detected."));
            }

            // Compile and run based on language
            switch (language.toLowerCase()) {
                case "c":
                    return compileAndRunC(code, codeRequest.getInput());
                case "cpp":
                    return compileAndRunCpp(code, codeRequest.getInput());
                case "java":
                    return compileAndRunJava(code, codeRequest.getInput());
                case "python":
                    return runPython(code, codeRequest.getInput());
                default:
                    return ResponseEntity.badRequest().body(new CompileResponse("Unsupported language."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new CompileResponse("Execution failed: " + e.getMessage()));
        }
    }

    private ResponseEntity<CompileResponse> compileAndRunC(String code, String input) throws Exception {
        return compileAndRunGeneric(code, input, "c", "gcc", "output");
    }

    private ResponseEntity<CompileResponse> compileAndRunCpp(String code, String input) throws Exception {
        return compileAndRunGeneric(code, input, "cpp", "g++", "output");
    }

    private ResponseEntity<CompileResponse> compileAndRunJava(String code, String input) throws Exception {
        String className = extractClassName(code);
        if (className == null) {
            return ResponseEntity.badRequest().body(new CompileResponse("Invalid Java code: class name not found."));
        }
        File tempFile = new File(System.getProperty("java.io.tmpdir"), className + ".java");
        try (FileWriter writer = new FileWriter(tempFile)) {
            writer.write(code);
        }

        ProcessBuilder compileBuilder = new ProcessBuilder("javac", tempFile.getAbsolutePath());
        Process compileProcess = compileBuilder.start();
        compileProcess.waitFor();

        ProcessBuilder runBuilder = new ProcessBuilder("java", "-cp", tempFile.getParent(), className);
        return runAndMeasure(runBuilder, input);
    }

    private ResponseEntity<CompileResponse> runPython(String code, String input) throws Exception {
        File tempFile = File.createTempFile("code", ".py");
        try (FileWriter writer = new FileWriter(tempFile)) {
            writer.write(code);
        }

        ProcessBuilder runBuilder = new ProcessBuilder("python3", tempFile.getAbsolutePath());
        return runAndMeasure(runBuilder, input);
    }

    private ResponseEntity<CompileResponse> compileAndRunGeneric(String code, String input, String extension,
            String compiler, String outputName) throws Exception {
        File tempFile = File.createTempFile("code", "." + extension);
        try (FileWriter writer = new FileWriter(tempFile)) {
            writer.write(code);
        }

        ProcessBuilder compileBuilder = new ProcessBuilder(compiler, tempFile.getAbsolutePath(), "-o", outputName);
        Process compileProcess = compileBuilder.start();
        compileProcess.waitFor();

        ProcessBuilder runBuilder = new ProcessBuilder("./" + outputName);
        return runAndMeasure(runBuilder, input);
    }

    private ResponseEntity<CompileResponse> runAndMeasure(ProcessBuilder runBuilder, String input) throws Exception {
        long startTime = System.currentTimeMillis();
        Process runProcess = runBuilder.start();

        if (input != null && !input.isEmpty()) {
            try (OutputStreamWriter inputWriter = new OutputStreamWriter(runProcess.getOutputStream())) {
                inputWriter.write(input);
                inputWriter.flush();
            }
        }

        ExecutorService executor = Executors.newSingleThreadExecutor();
        Future<String> future = executor.submit(() -> {
            BufferedReader reader = new BufferedReader(new InputStreamReader(runProcess.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
            return output.toString();
        });

        try {
            String result = future.get(TIMEOUT_SECONDS, TimeUnit.SECONDS);
            long executionTime = System.currentTimeMillis() - startTime;
            double memoryUsedMB = getMemoryUsage();

            if (memoryUsedMB > MAX_MEMORY_MB) {
                return ResponseEntity.ok(new CompileResponse("Error: Memory usage exceeded limit."));
            }

            return ResponseEntity.ok(new CompileResponse(result, 0, executionTime, memoryUsedMB));
        } catch (TimeoutException e) {
            runProcess.destroyForcibly();
            return ResponseEntity
                    .ok(new CompileResponse("Error: Execution timed out. Possible infinite loop detected."));
        } finally {
            executor.shutdownNow();
        }
    }

    private boolean containsMaliciousCode(String code) {
        List<String> dangerousCalls = Arrays.asList("system", "exec", "popen", "fork", "execve", "kill",
                "__import__('os')", "import os", "File.delete", "FileWriter", "PrintWriter",
                "Runtime.getRuntime().exec");

        boolean hasDangerousCalls = dangerousCalls.stream().anyMatch(code::contains);

        boolean hasFilePaths = code.contains("/") || code.contains("\\") || code.matches("(?i)\\b[A-Z]:\\\\.*");

        return hasDangerousCalls || hasFilePaths;
    }

    private String extractClassName(String code) {
        String[] lines = code.split("\\n");
        for (String line : lines) {
            line = line.trim();
            if (line.startsWith("public class ")) {
                return line.split(" ")[2];
            }
        }
        return null;
    }

    private double getMemoryUsage() {
        Runtime runtime = Runtime.getRuntime();
        long memoryUsed = runtime.totalMemory() - runtime.freeMemory();
        return memoryUsed / (1024.0 * 1024);
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
