package com.refacty.aspismed.dto;

import java.time.LocalDateTime;

public record AppointmentCreateDTO(
        Long professionalId,
        Long patientId,
        LocalDateTime dateTime
) {}
