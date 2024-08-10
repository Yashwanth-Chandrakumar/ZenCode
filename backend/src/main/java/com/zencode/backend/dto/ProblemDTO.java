package com.zencode.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class ProblemDTO {
    private String title;
    private String description;
    private String input1;
    private String input_answer1;
    private String input2;
    private String input_answer2;
    private List<TestCaseDTO> testCases;

    @Data
    public static class TestCaseDTO {
        private Long id;
        private String testcases;
        private String answers;
    }
}