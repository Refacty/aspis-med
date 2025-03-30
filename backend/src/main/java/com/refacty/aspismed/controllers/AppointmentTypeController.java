package com.refacty.aspismed.controllers;

import com.refacty.aspismed.entities.AppointmentType;
import com.refacty.aspismed.services.AppointmentTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointment-types")
public class AppointmentTypeController {

    @Autowired
    private AppointmentTypeService appointmentTypeService;

    @PostMapping
    public ResponseEntity<AppointmentType> createAppointmentType(@RequestBody AppointmentType appointmentType) {
        AppointmentType saved = appointmentTypeService.createAppointmentType(appointmentType);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<AppointmentType>> getAllAppointmentTypes() {
        List<AppointmentType> list = appointmentTypeService.findAllAppointmentTypes();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentType> getAppointmentTypeById(@PathVariable Long id) {
        AppointmentType appointmentType = appointmentTypeService.findById(id);
        return ResponseEntity.ok(appointmentType);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AppointmentType> updateAppointmentType(@PathVariable Long id, @RequestBody AppointmentType updated) {
        AppointmentType appointmentType = appointmentTypeService.updateAppointmentType(id, updated);
        return ResponseEntity.ok(appointmentType);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointmentType(@PathVariable Long id) {
        appointmentTypeService.deleteAppointmentType(id);
        return ResponseEntity.noContent().build();
    }
}
