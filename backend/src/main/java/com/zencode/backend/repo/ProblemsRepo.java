package com.zencode.backend.repo;

import com.zencode.backend.model.Problems;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemsRepo extends JpaRepository<Problems, Long> {
}
