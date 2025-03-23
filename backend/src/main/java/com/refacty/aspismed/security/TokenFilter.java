package com.refacty.aspismed.security;

import com.refacty.aspismed.entities.Token;
import com.refacty.aspismed.entities.User;
import com.refacty.aspismed.repositories.TokenRepository;
import com.refacty.aspismed.repositories.UserRepository;
import com.refacty.aspismed.services.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

// Esse filtro é executado a cada requisição
@Component
public class TokenFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenRepository tokenRepository;

    public static final List<String> PUBLIC_ROUTES = List.of(
            "/api/users/register",
            "/api/users/login"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getServletPath();
        AntPathMatcher pathMatcher = new AntPathMatcher();

        boolean isPublic = PUBLIC_ROUTES.stream().anyMatch(route -> pathMatcher.match(route, path));
        if (isPublic) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = recoverToken(request);
        if (token == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token não encontrado");
            return;
        }

        String subject = tokenService.validateToken(token, request);
        if (subject == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token expirado ou inválido");
            return;
        }

        Token tokenDB = tokenRepository.findTokenByToken(token);
        if (tokenDB == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token não encontrado no banco (token inválido)");
            return;
        }

        User user = userRepository.findByEmail(subject);
        if (user == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Usuário não encontrado");
            return;
        }

        var authentication = new UsernamePasswordAuthenticationToken(
                user, null, user.getAuthorities()
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return false;
    }
}

