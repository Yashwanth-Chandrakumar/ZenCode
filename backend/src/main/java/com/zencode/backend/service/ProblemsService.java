package com.zencode.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zencode.backend.model.Problems;
import com.zencode.backend.repo.ProblemRepo;

@Service
public class ProblemsService {

    @Autowired
    private ProblemRepo problemRepo;

    public Problems createProblem(Problems problem) {
        return problemRepo.save(problem);
    }

    public List<Problems> getAllProblems() {
        return problemRepo.findAll();
    }

    public Optional<Problems> getProblemById(Long id) {
        return problemRepo.findById(id);
    }

    public Problems updateProblem(Long id, Problems updatedProblem) {
        if (problemRepo.existsById(id)) {
            updatedProblem.setProblem_id(id);
            return problemRepo.save(updatedProblem);
        } else {
            return null; // Or throw an exception if preferred
        }
    }

    public void deleteProblem(Long id) {
        problemRepo.deleteById(id);
    }
}
