package com.refacty.aspismed.services;

import com.refacty.aspismed.entities.Appointment;
import com.refacty.aspismed.entities.Patient;
import com.refacty.aspismed.entities.User;
import com.refacty.aspismed.enums.Role;
import com.refacty.aspismed.repositories.AppointmentRepository;
import com.refacty.aspismed.repositories.PatientRepository;
import com.refacty.aspismed.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PatientRepository patientRepository;

    public Appointment createAppointment(Long professionalId, Long patientId, LocalDateTime dateTime) {
        User professional = userRepository.findById(professionalId)
                .orElseThrow(() -> new RuntimeException("Profissional não encontrado"));

        if (professional.getRole() != Role.PROFESSIONAL) {
            throw new RuntimeException("Usuário não é um profissional");
        }

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));

        checkAvailability(professional, dateTime);

        Appointment appointment = new Appointment();
        appointment.setProfessional(professional);
        appointment.setPatient(patient);
        appointment.setDateTime(dateTime);

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    public Appointment findById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
    }

    public Appointment updateAppointment(Long id, Appointment updatedData) {
        Appointment existing = findById(id);

        if (updatedData.getDateTime() != null) {
            checkAvailability(existing.getProfessional(), updatedData.getDateTime());
            existing.setDateTime(updatedData.getDateTime());
        }

        if (updatedData.getAppointmentType() != null) {
            existing.setAppointmentType(updatedData.getAppointmentType());
        }
        if (updatedData.getPaymentStatus() != null) {
            existing.setPaymentStatus(updatedData.getPaymentStatus());
        }
        if (updatedData.getAppointmentStatus() != null) {
            existing.setAppointmentStatus(updatedData.getAppointmentStatus());
        }
        if (updatedData.getValue() != null) {
            existing.setValue(updatedData.getValue());
        }
        existing.setRecurring(updatedData.isRecurring());

        return appointmentRepository.save(existing);
    }

    public void deleteAppointment(Long id) {
        Appointment existing = findById(id);
        appointmentRepository.delete(existing);
    }


    private void checkAvailability(User professional, LocalDateTime dateTime) {
        LocalDateTime startOfDay = dateTime.toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = dateTime.toLocalDate().atTime(23, 59);

        List<Appointment> existingAppointments = appointmentRepository
                .findByProfessionalIdAndDateTimeBetween(
                        professional.getId(),
                        startOfDay,
                        endOfDay
                );

        for (Appointment a : existingAppointments) {
            LocalDateTime existingStart = a.getDateTime();
            // Exemplo: se tem AppointmentType, pegue a duração padrão ou uma customizada
            LocalDateTime existingEnd = existingStart.plusMinutes(60);

            // Nesse caso, assumo 60 minutos, mas você poderia pegar do AppointmentType
            LocalDateTime newStart = dateTime;
            // Se também precisar de duração do novo, some +60, por exemplo
            LocalDateTime newEnd = dateTime.plusMinutes(60);

            if (existingStart.isBefore(newEnd) && existingEnd.isAfter(newStart)) {
                throw new RuntimeException("Horário não disponível");
            }
        }
    }
}

