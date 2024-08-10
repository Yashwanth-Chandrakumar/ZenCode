package com.zencode.backend.service;

import com.zencode.backend.dto.LeaderboardDTO;
import com.zencode.backend.model.Contest;
import com.zencode.backend.model.Leaderboard;
import com.zencode.backend.repo.LeaderboardRepo;
import com.zencode.backend.repo.ContestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeaderboardService {

    @Autowired
    private LeaderboardRepo leaderboardRepo;

    @Autowired
    private ContestRepo contestRepo;

    public List<LeaderboardDTO> getLeaderboardByContestId(Long contestId) {
        return leaderboardRepo.findByContestId(contestId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public LeaderboardDTO addLeaderboardEntry(LeaderboardDTO leaderboardDTO) {
        // Convert DTO to model
        Leaderboard leaderboard = new Leaderboard();
        leaderboard.setUserName(leaderboardDTO.getUserName());
        leaderboard.setScore(leaderboardDTO.getScore());
        leaderboard.setTimetaken(leaderboardDTO.getTimeTaken());
        
        // Fetch the contest and set it
        Contest contest = contestRepo.findById(leaderboardDTO.getContestId())
                .orElseThrow(() -> new RuntimeException("Contest not found"));
        leaderboard.setContest(contest);

        // Save and return the DTO
        Leaderboard savedLeaderboard = leaderboardRepo.save(leaderboard);
        return convertToDTO(savedLeaderboard);
    }

    private LeaderboardDTO convertToDTO(Leaderboard leaderboard) {
        LeaderboardDTO dto = new LeaderboardDTO();
        dto.setId(leaderboard.getId());
        dto.setUserName(leaderboard.getUserName());
        dto.setScore(leaderboard.getScore());
        dto.setTimeTaken(leaderboard.getTimetaken());
        dto.setContestId(leaderboard.getContest().getId());

        return dto;
    }
}
