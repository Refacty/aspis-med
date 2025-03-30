package com.refacty.aspismed.repositories;

import com.refacty.aspismed.entities.AppointmentType;
import com.refacty.aspismed.projections.FinancialReportProjection;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AppointmentTypeRepository extends JpaRepository<AppointmentType, Long> {
}
