// src/main/java/com/refacty/aspismed/dto/AppointmentCreateDTO.java
package com.refacty.aspismed.dto;

import com.refacty.aspismed.enums.AppointmentStatus;
import com.refacty.aspismed.enums.PaymentStatus;
import java.time.LocalDateTime;

public record AppointmentCreateDTO(
        Long professionalId,
        Long patientId,
        Long appointmentTypeId,
        LocalDateTime dateTime,
        PaymentStatus paymentStatus,
        AppointmentStatus appointmentStatus,
        boolean recurring,
        Double value
) {}
