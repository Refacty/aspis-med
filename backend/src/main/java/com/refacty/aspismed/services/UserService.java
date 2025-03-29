package com.refacty.aspismed.services;

import com.refacty.aspismed.dto.UserCreateDTO;
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

    public User registerUser(UserCreateDTO userCreateDTO) {
        User user = new User();

        if (user.getRole() == null) {
            user.setRole(Role.PROFESSIONAL);
        }
        String encoded = passwordEncoder.encode(userCreateDTO.password());
        user.setPassword(encoded);

        user.setAddress(userCreateDTO.adress());
        user.setEmail(userCreateDTO.email());
        user.setCpf(userCreateDTO.cpf());
        user.setName(userCreateDTO.name());
        user.setWhatsapp(userCreateDTO.whatsapp());

        return userRepository.save(user);
    }

    public User login(String email, String rawPassword) {
        User user = (User) userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}
