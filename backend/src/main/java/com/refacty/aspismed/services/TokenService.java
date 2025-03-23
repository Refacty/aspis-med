package com.refacty.aspismed.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.refacty.aspismed.entities.Token;
import com.refacty.aspismed.entities.User;
import com.refacty.aspismed.repositories.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${aspismed.jwt.secretWord}")
    private String secretWord;

    private final TokenRepository tokenRepository;

    public TokenService(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public String generateToken(User user) {
        Algorithm algorithm = Algorithm.HMAC256(secretWord);
        LocalDateTime expirationTime = LocalDateTime.now().plusSeconds(86400);

        String tokenJWT = JWT.create()
                .withIssuer("aspismed-api")
                .withSubject(user.getUsername())
                .withClaim("user_id", user.getId())
                .withExpiresAt(expirationTime.toInstant(ZoneOffset.of("-03:00")))
                .sign(algorithm);

        Token tokenEntity = new Token();
        tokenEntity.setUser(user);
        tokenEntity.setToken(tokenJWT);
        tokenEntity.setCreateDate(LocalDateTime.now());
        tokenEntity.setExpirationDate(expirationTime);
        tokenRepository.save(tokenEntity);

        return tokenJWT;
    }

    public String validateToken(String token, HttpServletRequest request) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretWord);
            var verifier = JWT.require(algorithm)
                    .withIssuer("aspismed-api")
                    .build();

            var decoded = verifier.verify(token);
            return decoded.getSubject();
        } catch (Exception e) {
            request.getSession().invalidate();
            return null;
        }
    }

    public void invalidateToken(String token) {
        tokenRepository.deleteByToken(token);
    }
}
