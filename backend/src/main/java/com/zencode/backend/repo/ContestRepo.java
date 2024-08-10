package com.zencode.backend.repo;

import com.zencode.backend.model.Contest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContestRepo extends JpaRepository<Contest, Long> {
}
