package com.refacty.aspismed.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum AppointmentStatus {

    SCHEDULED("Em andamento"),
    COMPLETED("Finalizado"),
    CANCELED("Cancelado");

    String displayName;

}
