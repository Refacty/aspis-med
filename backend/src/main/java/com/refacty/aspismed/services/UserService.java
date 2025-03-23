package com.refacty.aspismed.services;

import com.refacty.aspismed.entities.User;
import com.refacty.aspismed.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        // validação (pode verificar se CPF ou e-mail já existem) to fazendo o cru primeiro
        return userRepository.save(user);
    }

}
