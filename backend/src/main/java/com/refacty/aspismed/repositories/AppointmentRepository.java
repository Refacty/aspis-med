package com.refacty.aspismed.repositories;

import com.refacty.aspismed.entities.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByProfessionalIdAndDateTimeBetween(Long id, LocalDateTime startOfDay, LocalDateTime endOfDay);
}
