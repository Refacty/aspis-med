package com.refacty.aspismed.repositories;

import com.refacty.aspismed.entities.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}
