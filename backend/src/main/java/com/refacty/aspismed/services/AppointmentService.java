package com.refacty.aspismed.services;

import com.refacty.aspismed.dto.AppointmentCreateDTO;
import com.refacty.aspismed.dto.AppointmentTypeCreateDTO;
import com.refacty.aspismed.entities.Appointment;
import com.refacty.aspismed.entities.AppointmentType;
import com.refacty.aspismed.entities.Patient;
import com.refacty.aspismed.entities.User;
import com.refacty.aspismed.enums.Role;
import com.refacty.aspismed.repositories.AppointmentRepository;
import com.refacty.aspismed.repositories.AppointmentTypeRepository;
import com.refacty.aspismed.repositories.PatientRepository;
import com.refacty.aspismed.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AppointmentTypeRepository appointmentTypeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PatientRepository patientRepository;

    public Appointment createAppointment(AppointmentCreateDTO dto) {
        User professional = userRepository.findById(dto.professionalId())
                .orElseThrow(() -> new RuntimeException("Profissional não encontrado"));

        if (professional.getRole() != Role.PROFESSIONAL) {
            throw new RuntimeException("Usuário não é um profissional");
        }

        Patient patient = patientRepository.findById(dto.patientId())
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));

        AppointmentType appointmentType = appointmentTypeRepository.findById(dto.appointmentTypeId())
                .orElseThrow(() -> new RuntimeException("Tipo de atendimento não encontrado"));

        checkAvailability(professional, dto.dateTime(), appointmentType.getDefaultDuration(), 0L);

        Appointment appointment = new Appointment();
        appointment.setProfessional(professional);
        appointment.setPatient(patient);
        appointment.setAppointmentType(appointmentType);
        appointment.setDateTime(dto.dateTime());
        appointment.setPaymentStatus(dto.paymentStatus());
        appointment.setAppointmentStatus(dto.appointmentStatus());
        appointment.setRecurring(dto.recurring());
        appointment.setValue(dto.value());

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    public List<AppointmentType> findAllAppointmentTypes() {
        return appointmentTypeRepository.findAll();
    }

    public Appointment findById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
    }

    public Appointment updateAppointment(Long id, AppointmentCreateDTO dto) {
        Appointment existing = findById(id);
        AppointmentType type = null;
        if (dto.appointmentTypeId() == null) {
            throw new RuntimeException("Appointment type id not found");
        } else {
            type = findAppointmentTypeById(dto.appointmentTypeId());
            existing.setAppointmentType(type);
        }

        if (dto.dateTime() != null) {
            checkAvailability(existing.getProfessional(), dto.dateTime(), type.getDefaultDuration(), id);
            existing.setDateTime(dto.dateTime());
        }

        if (dto.paymentStatus() != null) {
            existing.setPaymentStatus(dto.paymentStatus());
        }

        if (dto.appointmentStatus() != null) {
            existing.setAppointmentStatus(dto.appointmentStatus());
        }

        if (dto.value() != null) {
            existing.setValue(dto.value());
        }
        existing.setRecurring(dto.recurring());

        return appointmentRepository.save(existing);
    }

    public void deleteAppointment(Long id) {
        Appointment existing = findById(id);
        appointmentRepository.delete(existing);
    }

    private void checkAvailability(User professional, LocalDateTime dateTime, Integer duration, Long id) {
        LocalDateTime startOfDay = dateTime.toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = dateTime.toLocalDate().atTime(23, 59);

        List<Appointment> existingAppointments = appointmentRepository
                .findByProfessionalIdAndDateTimeBetween(
                        professional.getId(),
                        startOfDay,
                        endOfDay
                );

        for (Appointment a : existingAppointments) {
            if (!Objects.equals(id, a.getId())) {
                LocalDateTime existingStart = a.getDateTime();
                LocalDateTime existingEnd = existingStart.plusMinutes(a.getAppointmentType().getDefaultDuration());

                LocalDateTime newStart = dateTime;
                LocalDateTime newEnd = dateTime.plusMinutes(duration);

                if (existingStart.isBefore(newEnd) && existingEnd.isAfter(newStart)) {
                    throw new RuntimeException("Horário não disponível");
                }
            }
        }
    }

    public AppointmentType createAppointmentType(AppointmentTypeCreateDTO dto) {
        AppointmentType type = new AppointmentType();
        type.setDescription(dto.description());
        type.setDefaultValue(dto.defaultValue());
        type.setDefaultDuration(dto.defaultDuration());
        return appointmentTypeRepository.save(type);
    }

    public AppointmentType findAppointmentTypeById(Long id) {
        return appointmentTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tipo de atendimento não encontrado"));
    }

    public AppointmentType updateAppointmentType(Long id, AppointmentTypeCreateDTO dto) {
        AppointmentType type = findAppointmentTypeById(id);
        type.setDescription(dto.description());
        type.setDefaultValue(dto.defaultValue());
        type.setDefaultDuration(dto.defaultDuration());
        return appointmentTypeRepository.save(type);
    }

    public void deleteAppointmentType(Long id) {
        AppointmentType type = findAppointmentTypeById(id);
        appointmentTypeRepository.delete(type);
    }
}

