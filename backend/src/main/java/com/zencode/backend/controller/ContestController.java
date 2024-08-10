package com.zencode.backend.controller;

import com.zencode.backend.dto.ContestDTO;
import com.zencode.backend.model.Contest;
import com.zencode.backend.service.ContestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contests")
@CrossOrigin("*")
public class ContestController {

    @Autowired
    private ContestService contestService;

    @PostMapping
    public ResponseEntity<Contest> createContest(@RequestBody ContestDTO contestDTO) {
        Contest createdContest = contestService.createContest(contestDTO);
        return ResponseEntity.ok(createdContest);
    }

    @GetMapping
    public ResponseEntity<List<Contest>> getAllContests() {
        List<Contest> contests = contestService.getAllContests();
        return ResponseEntity.ok(contests);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contest> getContestById(@PathVariable Long id) {
        return contestService.getContestById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contest> updateContest(@PathVariable Long id, @RequestBody ContestDTO contestDTO) {
        Contest updatedContest = contestService.updateContest(id, contestDTO);
        return ResponseEntity.ok(updatedContest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContest(@PathVariable Long id) {
        contestService.deleteContest(id);
        return ResponseEntity.noContent().build();
    }
}
