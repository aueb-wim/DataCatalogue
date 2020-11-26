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

import org.json.JSONArray;
import org.omg.Messaging.SYNC_WITH_TRANSPORT;
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

    @GetMapping("/name/{hospital_id}")
    public String getHospitalNameById(@PathVariable(value = "hospital_id") Long hospitalId){
        return hospitalDAO.getHospital(BigInteger.valueOf(hospitalId)).getName();
    }

     //save a hospital to database
    @PostMapping("/hosp")
    public Hospitals createHospital(@Valid @RequestBody Hospitals hosp){
        return hospitalDAO.save(hosp);
    }


    @PostMapping(value = "/newHospital2")
    public void createHospitalByName2(@RequestBody String hospitalAndPathologyName){
        System.out.println("receive hosp to save: "+hospitalAndPathologyName);
        JSONArray jr = new JSONArray("["+hospitalAndPathologyName+"]");
        String hospitalName = jr.getString(0);
        System.out.println(" hosp name: "+hospitalName);
        String pathologyName = jr.getString(1);
        System.out.println("path name: "+pathologyName);
        hospitalDAO.createNewHospitalByName(hospitalAndPathologyName,hospitalAndPathologyName);

    }

    //Parameters were added to the url in order  the role based authendication to work with them
    @PostMapping(value = "/newHospital/{hospital_name}/{pathology_name}")
    public void createHospitalByName(@RequestParam String hospitalName, @RequestParam String pathologyName){
        System.out.println("receive hosp to save: "+hospitalName+pathologyName);
        hospitalDAO.createNewHospitalByName(hospitalName,pathologyName);

    }

    @PostMapping(value = "/deleteHospital/{hospital_name}/{pathology_name}")
    public void deleteHospitalByName(@RequestBody String hospitalName){
        hospitalDAO.deleteHospitalByName(hospitalName);

    }
}
