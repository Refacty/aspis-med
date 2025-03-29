package com.refacty.aspismed.controllers;

import com.refacty.aspismed.dto.AppointmentCreateDTO;
import com.refacty.aspismed.dto.AppointmentTypeCreateDTO;
import com.refacty.aspismed.entities.Appointment;
import com.refacty.aspismed.entities.AppointmentType;
import com.refacty.aspismed.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/create")
    public ResponseEntity<Appointment> createAppointment(@RequestBody AppointmentCreateDTO dto) {
        Appointment newAppointment = appointmentService.createAppointment(dto);
        return ResponseEntity.ok(newAppointment);
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> appointments = appointmentService.findAll();
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        Appointment appointment = appointmentService.findById(id);
        return ResponseEntity.ok(appointment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable Long id,
                                                         @RequestBody Appointment updatedData) {
        Appointment appointment = appointmentService.updateAppointment(id, updatedData);
        return ResponseEntity.ok(appointment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/types")
    public ResponseEntity<List<AppointmentType>> getAllAppointmentTypes() {
        List<AppointmentType> appointmentTypes = appointmentService.findAllAppointmentTypes();
        return ResponseEntity.ok(appointmentTypes);
    }

    @PostMapping("/types")
    public ResponseEntity<AppointmentType> createAppointmentType(@RequestBody AppointmentTypeCreateDTO dto) {
        AppointmentType newType = appointmentService.createAppointmentType(dto);
        return ResponseEntity.ok(newType);
    }

    @GetMapping("/types/{id}")
    public ResponseEntity<AppointmentType> getAppointmentTypeById(@PathVariable Long id) {
        AppointmentType type = appointmentService.findAppointmentTypeById(id);
        return ResponseEntity.ok(type);
    }

    @PutMapping("/types/{id}")
    public ResponseEntity<AppointmentType> updateAppointmentType(@PathVariable Long id,
                                                                 @RequestBody AppointmentTypeCreateDTO dto) {
        AppointmentType updatedType = appointmentService.updateAppointmentType(id, dto);
        return ResponseEntity.ok(updatedType);
    }

    @DeleteMapping("/types/{id}")
    public ResponseEntity<Void> deleteAppointmentType(@PathVariable Long id) {
        appointmentService.deleteAppointmentType(id);
        return ResponseEntity.noContent().build();
    }

}

