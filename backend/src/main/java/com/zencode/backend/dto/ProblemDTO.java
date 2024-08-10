package com.zencode.backend.dto;

import lombok.Data;
import java.util.List;


@Data
public class ProblemDTO {
    private String title;
    private String description;
    private String difficulty;
    private List<TestCaseDTO> testCases;

    @Data
    public static class TestCaseDTO {
        private String testcases;
        private String answers;
    }
}
