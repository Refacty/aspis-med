package com.refacty.aspismed.controllers;

import com.refacty.aspismed.dto.AppointmentCreateDTO;
import com.refacty.aspismed.entities.Appointment;
import com.refacty.aspismed.entities.AppointmentType;
import com.refacty.aspismed.repositories.AppointmentRepository;
import com.refacty.aspismed.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AppointmentService appointmentService;

    AppointmentController(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<LinkedHashMap<Object, Object>> getDashboard() {
        LinkedHashMap<Object, Object> resultMap = new LinkedHashMap<>();
        resultMap.put("receitasPorMes", appointmentRepository.findReceitasMonth());
        resultMap.put("despesasPorMes", appointmentRepository.findDespesasByMonth());
        resultMap.put("atendimentosHoje", appointmentRepository.findAppointmentToday());

        return ResponseEntity.ok(resultMap);
    }

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

    

}

