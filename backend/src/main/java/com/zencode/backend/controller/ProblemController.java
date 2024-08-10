package com.zencode.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zencode.backend.model.Problems;
import com.zencode.backend.service.ProblemsService;

@RestController
@RequestMapping("/api/problems")
public class ProblemController {

    @Autowired
    private ProblemsService problemsService;

    @PostMapping
    public ResponseEntity<Problems> createProblem(@RequestBody Problems problem) {
        Problems createdProblem = problemsService.createProblem(problem);
        return new ResponseEntity<>(createdProblem, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Problems>> getAllProblems() {
        List<Problems> problems = problemsService.getAllProblems();
        return new ResponseEntity<>(problems, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Problems> getProblemById(@PathVariable("id") Long id) {
        Optional<Problems> problem = problemsService.getProblemById(id);
        return problem.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Problems> updateProblem(@PathVariable("id") Long id, @RequestBody Problems updatedProblem) {
        Problems problem = problemsService.updateProblem(id, updatedProblem);
        return problem != null ? ResponseEntity.ok(problem) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProblem(@PathVariable("id") Long id) {
        problemsService.deleteProblem(id);
        return ResponseEntity.noContent().build();
    }
}
