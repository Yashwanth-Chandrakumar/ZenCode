package com.zencode.backend.controller;

import com.zencode.backend.dto.ProblemDTO;
import com.zencode.backend.model.Problems;
import com.zencode.backend.service.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/problems")
@CrossOrigin("*")
public class ProblemController {

    @Autowired
    private ProblemService problemService;

    @PostMapping
    public ResponseEntity<Problems> createProblem(@RequestBody ProblemDTO problemDTO) {
        Problems createdProblem = problemService.createProblem(problemDTO);
        return ResponseEntity.ok(createdProblem);
    }

    @GetMapping
    public ResponseEntity<List<Problems>> getAllProblems() {
        List<Problems> problems = problemService.getAllProblems();
        return ResponseEntity.ok(problems);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Problems> getProblemById(@PathVariable Long id) {
        return problemService.getProblemById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Problems> updateProblem(@PathVariable Long id, @RequestBody ProblemDTO problemDTO) {
        Problems updatedProblem = problemService.updateProblem(id, problemDTO);
        return ResponseEntity.ok(updatedProblem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProblem(@PathVariable Long id) {
        problemService.deleteProblem(id);
        return ResponseEntity.noContent().build();
    }
}
