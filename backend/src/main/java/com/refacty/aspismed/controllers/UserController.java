package com.refacty.aspismed.controllers;

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

    // Ex: Registrar novo usuário
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User saved = userService.registerUser(user);
        return ResponseEntity.ok(saved);
    }

    // Ex: Login -> retorna token
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password) {
        String token = userService.login(email, password);
        return ResponseEntity.ok(token);
    }

    // Outros endpoints que você já tinha (updateUser, etc.)
}
