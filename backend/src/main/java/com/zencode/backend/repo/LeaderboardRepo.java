package com.zencode.backend.repo;

import com.zencode.backend.model.Leaderboard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaderboardRepo extends JpaRepository<Leaderboard, Long> {
    List<Leaderboard> findByContestId(Long contestId);
}
