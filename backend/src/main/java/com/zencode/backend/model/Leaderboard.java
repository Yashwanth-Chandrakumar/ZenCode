package com.zencode.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "leaderboard")
public class Leaderboard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "email")
    private String email;

    @Column(name = "hasParticipated")
    private boolean hasParticipated;

    @Column(name = "score")
    private Integer score;

    @Column(name = "timetaken")
    private String timetaken;

    @ManyToOne
    @JoinColumn(name = "contest_id", nullable = false)
    private Contest contest;
}
