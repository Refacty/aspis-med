package com.refacty.aspismed.entities;

import com.refacty.aspismed.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_expense")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    // e.g., "Rent", "Material", "Electricity Bill"
    private String type;

    private Double value;

    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;
}
