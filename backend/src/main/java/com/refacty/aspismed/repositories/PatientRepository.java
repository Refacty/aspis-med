package com.refacty.aspismed.repositories;

import com.refacty.aspismed.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}
