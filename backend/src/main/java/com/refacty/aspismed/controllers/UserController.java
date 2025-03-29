package com.refacty.aspismed.controllers;

import com.refacty.aspismed.dto.UserCreateDTO;
import com.refacty.aspismed.dto.UserLoginDTO;
import com.refacty.aspismed.entities.User;
import com.refacty.aspismed.services.TokenService;
import com.refacty.aspismed.services.UserService;

import java.util.LinkedHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Rotas: /api/users/register, /api/users/login, etc.
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody UserCreateDTO user) {
        User userSaved = userService.registerUser(user);
        String token = tokenService.generateToken(userSaved);

        LinkedHashMap<String, Object> response = new LinkedHashMap<>();
        response.put("token", token);
        response.put("user", userSaved);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody UserLoginDTO userLoginDTO) {
        User userSaved = userService.login(userLoginDTO.email(), userLoginDTO.password());
        String token = tokenService.generateToken(userSaved);

        LinkedHashMap<String, Object> response = new LinkedHashMap<>();
        response.put("token", token);
        response.put("user", userSaved);

        return ResponseEntity.ok(response);
    }

}
