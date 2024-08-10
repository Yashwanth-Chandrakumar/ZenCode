package com.zencode.backend.dto;

import lombok.Data;

@Data
public class LeaderboardDTO {
    private Long id;
    private String userName;
    private int score;
    private String timeTaken;
    private Long contestId; 
}
