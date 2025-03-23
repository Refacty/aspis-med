package com.refacty.aspismed.repositories;

import com.refacty.aspismed.entities.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}
