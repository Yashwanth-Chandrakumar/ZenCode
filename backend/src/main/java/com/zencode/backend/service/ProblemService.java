package com.zencode.backend.service;

import com.zencode.backend.dto.ProblemDTO;
import com.zencode.backend.model.Problems;
import com.zencode.backend.model.TestCase;
import com.zencode.backend.repo.ProblemsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProblemService {

    @Autowired
    private ProblemsRepo problemsRepository;

    @Transactional
    public Problems createProblem(ProblemDTO problemDTO) {
        Problems problem = new Problems();
        problem.setTitle(problemDTO.getTitle());
        problem.setDescription(problemDTO.getDescription());

        for (ProblemDTO.TestCaseDTO testCaseDTO : problemDTO.getTestCases()) {
            TestCase testCase = new TestCase();
            testCase.setTestCases(testCaseDTO.getTestcases());
            testCase.setAnswers(testCaseDTO.getAnswers());
            testCase.setProblem(problem);
            problem.getTestCases().add(testCase);
        }

        return problemsRepository.save(problem);
    }
}