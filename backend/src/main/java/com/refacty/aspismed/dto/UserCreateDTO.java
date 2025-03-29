package com.refacty.aspismed.dto;

public record UserCreateDTO(
    String name,
    String email,
    String cpf,
    String whatsapp,
    String password,
    String adress
) {}