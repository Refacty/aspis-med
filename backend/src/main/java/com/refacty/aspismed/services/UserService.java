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
        if (user.getRole() == null) {
            user.setRole(Role.PROFESSIONAL);
        }
        String encoded = passwordEncoder.encode(user.getPassword());
        user.setPassword(encoded);
        return userRepository.save(user);
    }

    public String login(String email, String rawPassword) {
        User user = (User) userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        return tokenService.generateToken(user);
    }
}
