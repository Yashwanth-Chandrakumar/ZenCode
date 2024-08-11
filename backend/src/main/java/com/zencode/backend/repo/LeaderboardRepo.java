package com.zencode.backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zencode.backend.model.Leaderboard;

@Repository
public interface LeaderboardRepo extends JpaRepository<Leaderboard, Long> {
    List<Leaderboard> findByContestId(Long contestId);

    boolean existsByContestIdAndEmail(Long contestId, String email);
}
