package com.refacty.aspismed.services;

import com.refacty.aspismed.entities.User;
import com.refacty.aspismed.enums.Role;
import com.refacty.aspismed.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private TokenService tokenService;

    public User registerUser(User user) {
        // Exemplo: assume default role PROFESSIONAL
        if (user.getRole() == null) {
            user.setRole(Role.PROFESSIONAL);
        }
        // Criptografa a senha
        String encoded = passwordEncoder.encode(user.getPassword());
        user.setPassword(encoded);
        // Salva no banco
        return userRepository.save(user);
    }

    public String login(String email, String rawPassword) {
        // Busca user
        User user = (User) userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        // Verifica a senha
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        // Gera token
        return tokenService.generateToken(user);
    }
}
