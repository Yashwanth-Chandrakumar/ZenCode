package com.zencode.backend.controller;

import com.zencode.backend.dto.LeaderboardDTO;
import com.zencode.backend.service.LeaderboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
@CrossOrigin("*")
public class LeaderboardController {

    @Autowired
    private LeaderboardService leaderboardService;

    @GetMapping("/contest/{contestId}")
    public ResponseEntity<List<LeaderboardDTO>> getLeaderboardByContestId(@PathVariable Long contestId) {
        List<LeaderboardDTO> leaderboard = leaderboardService.getLeaderboardByContestId(contestId);
        return ResponseEntity.ok(leaderboard);
    }

    @PostMapping
    public ResponseEntity<LeaderboardDTO> addLeaderboardEntry(@RequestBody LeaderboardDTO leaderboardDTO) {
        LeaderboardDTO createdEntry = leaderboardService.addLeaderboardEntry(leaderboardDTO);
        return ResponseEntity.ok(createdEntry);
    }
}
