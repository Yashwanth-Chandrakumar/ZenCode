package com.zencode.backend.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class Problems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long problem_id;

    String problem_title;

    String problem_description;

    String input1;
    String input_answer1;

    String input2;
    String input_answer2;
}
