package com.zencode.backend.service;

import com.zencode.backend.dto.ContestDTO;
import com.zencode.backend.model.Contest;
import com.zencode.backend.model.Problems;
import com.zencode.backend.repo.ContestRepo;
import com.zencode.backend.repo.ProblemsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ContestService {

    @Autowired
    private ContestRepo contestRepo;

    @Autowired
    private ProblemsRepo problemsRepo;

    @Transactional
    public Contest createContest(ContestDTO contestDTO) {
        Contest contest = new Contest();
        contest.setName(contestDTO.getName());
        contest.setDescription(contestDTO.getDescription());

        List<Problems> problems = problemsRepo.findAllById(contestDTO.getProblemIds());
        contest.setProblems(problems);

        return contestRepo.save(contest);
    }

    public List<Contest> getAllContests() {
        return contestRepo.findAll();
    }

    public Optional<Contest> getContestById(Long id) {
        return contestRepo.findById(id);
    }

    @Transactional
    public Contest updateContest(Long id, ContestDTO contestDTO) {
        Contest contest = contestRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Contest not found"));

        contest.setName(contestDTO.getName());
        contest.setDescription(contestDTO.getDescription());

        List<Problems> problems = problemsRepo.findAllById(contestDTO.getProblemIds());
        contest.setProblems(problems);

        return contestRepo.save(contest);
    }

    @Transactional
    public void deleteContest(Long id) {
        contestRepo.deleteById(id);
    }
}
