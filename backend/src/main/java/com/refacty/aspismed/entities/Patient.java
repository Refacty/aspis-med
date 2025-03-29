package com.refacty.aspismed.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_patient")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String cpf;

    private String contact;

    private String address;

    // @Lob
    private String observations;

    private LocalDateTime registrationDate;

    @PrePersist
    public void prePersist() {
        this.registrationDate = LocalDateTime.now();
    }
}