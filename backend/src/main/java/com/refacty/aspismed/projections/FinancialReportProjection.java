package com.refacty.aspismed.projections;

import java.time.LocalDate;

public interface FinancialReportProjection {
    String getTipo();
    LocalDate getData();
    String getDescricao();
    Double getValor();
    String getStatusPagamento();
}
