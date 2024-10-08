package com.zencode.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zencode.backend.dto.LeaderboardDTO;
import com.zencode.backend.model.Contest;
import com.zencode.backend.model.Leaderboard;
import com.zencode.backend.repo.ContestRepo;
import com.zencode.backend.repo.LeaderboardRepo;

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
        
        Leaderboard leaderboard = new Leaderboard();
        leaderboard.setUserName(leaderboardDTO.getUserName());
        leaderboard.setEmail(leaderboardDTO.getEmail());
        leaderboard.setHasParticipated(true);
        leaderboard.setScore(leaderboardDTO.getScore());
        leaderboard.setTimetaken(leaderboardDTO.getTimeTaken());

        Contest contest = contestRepo.findById(leaderboardDTO.getContestId())
                .orElseThrow(() -> new RuntimeException("Contest not found"));
        leaderboard.setContest(contest);

        
        Leaderboard savedLeaderboard = leaderboardRepo.save(leaderboard);
        return convertToDTO(savedLeaderboard);
    }

    private LeaderboardDTO convertToDTO(Leaderboard leaderboard) {
        LeaderboardDTO dto = new LeaderboardDTO();
        dto.setId(leaderboard.getId());
        dto.setUserName(leaderboard.getUserName());
        dto.setEmail(leaderboard.getEmail());
        dto.setHasParticipated(leaderboard.isHasParticipated());
        dto.setScore(leaderboard.getScore());
        dto.setTimeTaken(leaderboard.getTimetaken());
        dto.setContestId(leaderboard.getContest().getId());

        return dto;
    }

    public boolean hasParticipated(Long contestId, String email) {
        return leaderboardRepo.existsByContestIdAndEmail(contestId, email);
    }
}
