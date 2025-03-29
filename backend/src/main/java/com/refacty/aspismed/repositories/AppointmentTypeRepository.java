package com.refacty.aspismed.repositories;

import com.refacty.aspismed.entities.AppointmentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentTypeRepository extends JpaRepository<AppointmentType, Long> {
}
