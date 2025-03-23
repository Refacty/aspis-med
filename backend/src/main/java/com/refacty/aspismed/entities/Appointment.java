package com.refacty.aspismed.entities;

import com.refacty.aspismed.enums.AppointmentStatus;
import com.refacty.aspismed.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_appointment")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Healthcare professional
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User professional;

    // Patient
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    // Type of appointment
    @ManyToOne
    @JoinColumn(name = "appointment_type_id")
    private AppointmentType appointmentType;

    private LocalDateTime dateTime;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    @Enumerated(EnumType.STRING)
    private AppointmentStatus appointmentStatus;

    // Indicates if this appointment repeats
    private boolean recurring;

    // Specific value for this appointment (may differ from defaultValue)
    private Double value;
}
