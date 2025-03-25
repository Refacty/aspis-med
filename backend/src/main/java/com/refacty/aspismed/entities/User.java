package com.refacty.aspismed.entities;

import com.refacty.aspismed.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_user")
public class User implements UserDetails {

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
    @Column (length = 20)
    private Role role;

    @PrePersist
    public void prePersist() {
        this.registrationDate = LocalDateTime.now();
    }

    // ============== UserDetails Methods ==============
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role == Role.ADMIN) {
            return List.of(
                    new SimpleGrantedAuthority("ROLE_ADMIN"),
                    new SimpleGrantedAuthority("ROLE_USER")
            );
        }
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        // nunca expira
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // nunca bloqueia
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // nunca expira
        return true;
    }

    @Override
    public boolean isEnabled() {
        // sempre ativo
        return true;
    }

}
