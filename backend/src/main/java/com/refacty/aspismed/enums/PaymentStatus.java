package com.refacty.aspismed.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PaymentStatus {

    PENDING("Pendente"),
    PAID("Pago"),
    CANCELED("Cancelado");

    String displayName;

}
