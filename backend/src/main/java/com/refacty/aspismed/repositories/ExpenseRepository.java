package com.refacty.aspismed.repositories;

import com.refacty.aspismed.entities.Expense;
import com.refacty.aspismed.enums.PaymentStatus;
import com.refacty.aspismed.projections.FinancialReportProjection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByDateBetween(LocalDate startDate, LocalDate endDate);
    List<Expense> findByType(String type);
    List<Expense> findByPaymentStatus(PaymentStatus paymentStatus);


        @Query(value = """
        SELECT 
            'receita' AS tipo,
            DATE(a.date_time) AS data,
            'Consulta' AS descricao,
            a.value AS valor,
            a.payment_status AS status_pagamento
        FROM tb_appointment a
        WHERE a.payment_status = 'PAID'
        AND a.value > 0
        AND DATE(a.date_time) BETWEEN :data_inicio AND :data_fim
    
        UNION ALL
    
        SELECT 
            'despesa' AS tipo,
            e.date AS data,
            e.description AS descricao,
            -e.value AS valor,
            e.payment_status AS status_pagamento
        FROM tb_expense e
        WHERE e.payment_status = 'PAID'
        AND e.value > 0
        AND e.date BETWEEN :data_inicio AND :data_fim
    
        ORDER BY data;
        """, nativeQuery = true)
    List<FinancialReportProjection> findFinances(
        @Param("data_inicio") LocalDate startDate,
        @Param("data_fim") LocalDate endDate
    );
}
