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

        checkAvailability(professional, dto.dateTime());

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
            // se tem AppointmentType, pegue a duração padrão ou uma customizada
            LocalDateTime existingEnd = existingStart.plusMinutes(60);

            // da pra pegar do AppointmentType
            LocalDateTime newStart = dateTime;
            // Se também precisar de duração do novo, some +60, por exemplo
            LocalDateTime newEnd = dateTime.plusMinutes(60);

            if (existingStart.isBefore(newEnd) && existingEnd.isAfter(newStart)) {
                throw new RuntimeException("Horário não disponível");
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

