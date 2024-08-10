package com.zencode.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Data
@Getter
@Setter
@Table(name = "problems")
public class Problems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "problems_id")
    private Long id;

    @Column(name = "problem_title")
    private String title;

    @Column(name = "problem_description")
    private String description;

    @Column(name ="problem_difficulty")
    private String difficulty;

    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<TestCase> testCases = new ArrayList<>();
}

