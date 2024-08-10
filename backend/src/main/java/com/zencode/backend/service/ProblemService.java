package com.zencode.backend.service;

import com.zencode.backend.dto.ProblemDTO;
import com.zencode.backend.model.Problems;
import com.zencode.backend.model.TestCase;
import com.zencode.backend.repo.ProblemsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ProblemService {

    @Autowired
    private ProblemsRepo problemsRepository;

    @Transactional
    public Problems createProblem(ProblemDTO problemDTO) {
        Problems problem = new Problems();
        problem.setTitle(problemDTO.getTitle());
        problem.setDescription(problemDTO.getDescription());
        problem.setDifficulty(problemDTO.getDifficulty());

        for (ProblemDTO.TestCaseDTO testCaseDTO : problemDTO.getTestCases()) {
            TestCase testCase = new TestCase();
            testCase.setTestCases(testCaseDTO.getTestcases());
            testCase.setAnswers(testCaseDTO.getAnswers());
            testCase.setProblem(problem);
            problem.getTestCases().add(testCase);
        }

        return problemsRepository.save(problem);
    }

    public List<Problems> getAllProblems() {
        return problemsRepository.findAll();
    }

    public Optional<Problems> getProblemById(Long id) {
        return problemsRepository.findById(id);
    }

    @Transactional
    public Problems updateProblem(Long id, ProblemDTO problemDTO) {
        Problems problem = problemsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Problem not found"));

        problem.setTitle(problemDTO.getTitle());
        problem.setDescription(problemDTO.getDescription());
        problem.setDifficulty(problemDTO.getDifficulty());

        problem.getTestCases().clear();
        for (ProblemDTO.TestCaseDTO testCaseDTO : problemDTO.getTestCases()) {
            TestCase testCase = new TestCase();
            testCase.setTestCases(testCaseDTO.getTestcases());
            testCase.setAnswers(testCaseDTO.getAnswers());
            testCase.setProblem(problem);
            problem.getTestCases().add(testCase);
        }

        return problemsRepository.save(problem);
    }

    @Transactional
    public void deleteProblem(Long id) {
        problemsRepository.deleteById(id);
    }
}
