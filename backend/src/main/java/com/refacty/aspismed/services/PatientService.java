package com.refacty.aspismed.services;

import com.refacty.aspismed.entities.Patient;
import com.refacty.aspismed.repositories.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public Patient createPatient(Patient patient) {
        // validar se CPF já existe
        return patientRepository.save(patient);
    }

    public List<Patient> findAllPatients() {
        return patientRepository.findAll();
    }

    public Patient findById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    public Patient updatePatient(Long id, Patient updatedPatient) {
        Patient existing = findById(id);
        existing.setName(updatedPatient.getName());
        existing.setContact(updatedPatient.getContact());
        existing.setAddress(updatedPatient.getAddress());
        existing.setObservations(updatedPatient.getObservations());
        return patientRepository.save(existing);
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}

