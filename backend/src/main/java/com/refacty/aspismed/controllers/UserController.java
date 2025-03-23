package com.refacty.aspismed.controllers;

import com.refacty.aspismed.dto.UserLoginDTO;
import com.refacty.aspismed.entities.User;
import com.refacty.aspismed.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Rotas: /api/users/register, /api/users/login, etc.
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User saved = userService.registerUser(user);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserLoginDTO userLoginDTO) {
        String token = userService.login(userLoginDTO.email(), userLoginDTO.password());
        return ResponseEntity.ok(token);
    }

}
