package com.refacty.aspismed.controllers;

import com.refacty.aspismed.entities.Appointment;
import com.refacty.aspismed.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/create")
    public ResponseEntity<Appointment> createAppointment(@RequestParam Long professionalId,
                                                         @RequestParam Long patientId,
                                                         @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateTime) {
        Appointment newAppointment = appointmentService.createAppointment(professionalId, patientId, dateTime);
        return ResponseEntity.ok(newAppointment);
    }

}

