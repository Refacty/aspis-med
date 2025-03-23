package com.refacty.aspismed.repositories;

import com.refacty.aspismed.entities.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface TokenRepository extends JpaRepository<Token, Long> {

    @Transactional
    void deleteByToken(String token);

    Token findTokenByToken(String token);
}
