/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.controller;

import com.admir.demiraj.datacatalogspringboot.dao.HospitalDAO;
import com.admir.demiraj.datacatalogspringboot.resources.Hospitals;

import java.math.BigInteger;
import java.util.List;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author root
 */
@RestController
@RequestMapping("/hospitals")
public class HospitalController {
    
    @Autowired
    private HospitalDAO hospitalDAO;
    
      //get all hospitals
    @GetMapping("/hosp")
    public List<Hospitals> getAllHospitals(){
        return hospitalDAO.findAll();
    }

    //get all hospitals
    @GetMapping("/allWithUniqueVariables")
    public List<Hospitals> getAllHospitalsWithUniqueVariables(){
        return hospitalDAO.findAllWithUniqueVariables();
    }

    @GetMapping("/hosp/{hospital_id}")
    public Hospitals getHospitalName(@PathVariable(value = "hospital_id") Long hospitalId){
        return hospitalDAO.getHospital(BigInteger.valueOf(hospitalId));
    }

     //save a hospital to database
    @PostMapping("/hosp")
    public Hospitals createHospital(@Valid @RequestBody Hospitals hosp){
        return hospitalDAO.save(hosp);
    }
}
