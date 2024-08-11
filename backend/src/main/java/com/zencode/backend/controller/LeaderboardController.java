package com.zencode.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zencode.backend.dto.LeaderboardDTO;
import com.zencode.backend.service.LeaderboardService;

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
    
    @GetMapping("/hasParticipated")
    public ResponseEntity<Map<String, Boolean>> hasParticipated(
            @RequestParam Long contestId,
            @RequestParam String email) {
        boolean hasParticipated = leaderboardService.hasParticipated(contestId, email);
        return ResponseEntity.ok(Map.of("hasParticipated", hasParticipated));
    }
}
