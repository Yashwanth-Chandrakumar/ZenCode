package com.zencode.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class ContestDTO {
    private Long id;
    private String name;
    private String description;
    private List<Long> problemIds;
}
