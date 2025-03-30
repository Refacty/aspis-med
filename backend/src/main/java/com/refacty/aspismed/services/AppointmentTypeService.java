package com.refacty.aspismed.services;

import com.refacty.aspismed.entities.AppointmentType;
import com.refacty.aspismed.repositories.AppointmentTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentTypeService {

    @Autowired
    private AppointmentTypeRepository appointmentTypeRepository;

    public AppointmentType createAppointmentType(AppointmentType appointmentType) {
        return appointmentTypeRepository.save(appointmentType);
    }

    public List<AppointmentType> findAllAppointmentTypes() {
        return appointmentTypeRepository.findAll();
    }

    public AppointmentType findById(Long id) {
        return appointmentTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment type not found"));
    }

    public AppointmentType updateAppointmentType(Long id, AppointmentType updated) {
        AppointmentType existing = findById(id);
        existing.setDescription(updated.getDescription());
        existing.setDefaultValue(updated.getDefaultValue());
        existing.setDefaultDuration(updated.getDefaultDuration());
        return appointmentTypeRepository.save(existing);
    }

    public void deleteAppointmentType(Long id) {
        appointmentTypeRepository.deleteById(id);
    }
}
