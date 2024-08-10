package com.zencode.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.Set;

@Entity
@Data
public class Problems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long problem_id;

    private String problem_title;
    private String problem_description;
    private String input1;
    private String input_answer1;
    private String input2;
    private String input_answer2;

    @OneToMany(mappedBy = "problem")
    private Set<TestCase> testCases;
}
