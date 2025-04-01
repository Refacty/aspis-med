package com.refacty.aspismed.repositories;

import com.refacty.aspismed.entities.Appointment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByProfessionalIdAndDateTimeBetween(Long id, LocalDateTime startOfDay, LocalDateTime endOfDay);

    @Query(value = """
        select count(ta.id) as qtdade_atendimentos from tb_appointment ta where ta.date_time = now();
    """, nativeQuery = true)
    Integer findAppointmentToday();

    @Query(value = """
SELECT 
    SUM(ta.value) AS receita_mes_atual
FROM 
    tb_appointment ta
WHERE 
    ta.payment_status = 'PAID'
    AND YEAR(ta.date_time) = YEAR(now())   
    AND MONTH(ta.date_time) = MONTH(now()); 
    """, nativeQuery = true)
    Double findReceitasMonth();
    @Query(value = """
        SELECT 
    SUM(te.value) AS despesas_mes_atual
FROM 
    tb_expense te
WHERE 
    te.payment_status = 'PAID'
    AND YEAR(te.date) = YEAR(now())   
    AND MONTH(te.date) = MONTH(now()); 
            """, nativeQuery = true)
    Double findDespesasByMonth();





}
