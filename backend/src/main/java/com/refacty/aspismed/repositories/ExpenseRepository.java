package com.refacty.aspismed.repositories;

import com.refacty.aspismed.entities.Expense;
import com.refacty.aspismed.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByDateBetween(LocalDate startDate, LocalDate endDate);
    List<Expense> findByType(String type);
    List<Expense> findByPaymentStatus(PaymentStatus paymentStatus);
}
