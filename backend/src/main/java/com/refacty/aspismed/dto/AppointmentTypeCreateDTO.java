package com.refacty.aspismed.dto;

public record AppointmentTypeCreateDTO(
        String description,
        Double defaultValue,
        Integer defaultDuration
) {}
