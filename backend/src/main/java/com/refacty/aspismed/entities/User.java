package com.refacty.aspismed.entities;

import com.refacty.aspismed.enums.Role;
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
@Table(name = "tb_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String cpf;

    private String whatsapp;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String address;

    private LocalDateTime registrationDate;

    @Enumerated(EnumType.STRING)
    private Role role;

    @PrePersist
    public void prePersist() {
        this.registrationDate = LocalDateTime.now();
    }

}
