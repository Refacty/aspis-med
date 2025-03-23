package com.refacty.aspismed.services;

import com.refacty.aspismed.entities.Expense;
import com.refacty.aspismed.enums.PaymentStatus;
import com.refacty.aspismed.repositories.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public List<Expense> findAllExpenses() {
        return expenseRepository.findAll();
    }

    public Expense findById(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));
    }

    public Expense updateExpense(Long id, Expense updatedExpense) {
        Expense existing = findById(id);
        existing.setDescription(updatedExpense.getDescription());
        existing.setType(updatedExpense.getType());
        existing.setValue(updatedExpense.getValue());
        existing.setDate(updatedExpense.getDate());
        existing.setPaymentStatus(updatedExpense.getPaymentStatus());
        return expenseRepository.save(existing);
    }

    public void deleteExpense(Long id) {
        Expense existing = findById(id);
        expenseRepository.delete(existing);
    }

    public List<Expense> findByDateRange(LocalDate startDate, LocalDate endDate) {
        return expenseRepository.findByDateBetween(startDate, endDate);
    }

    // Somar total de despesas pagas em um período
    public Double sumPaidExpensesInDateRange(LocalDate startDate, LocalDate endDate) {
        // chamar findByDateBetween e filtrar ou criar uma query custom no repository
        List<Expense> expenses = findByDateRange(startDate, endDate);
        return expenses.stream()
                .filter(e -> e.getPaymentStatus() == PaymentStatus.PAID)
                .mapToDouble(Expense::getValue)
                .sum();
    }
}


