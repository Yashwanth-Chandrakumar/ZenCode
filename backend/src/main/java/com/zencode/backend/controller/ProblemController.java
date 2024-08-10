package com.zencode.backend.controller;

import com.zencode.backend.dto.ProblemDTO;
import com.zencode.backend.model.Problems;
import com.zencode.backend.service.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/problems")
public class ProblemController {

    @Autowired
    private ProblemService problemService;

    @PostMapping
    public ResponseEntity<Problems> createProblem(@RequestBody ProblemDTO problemDTO) {
        Problems createdProblem = problemService.createProblem(problemDTO);
        return ResponseEntity.ok(createdProblem);
    }
}