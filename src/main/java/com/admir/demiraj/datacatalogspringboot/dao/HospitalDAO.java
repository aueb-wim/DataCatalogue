/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.dao;

import com.admir.demiraj.datacatalogspringboot.repository.HospitalsRepository;
import com.admir.demiraj.datacatalogspringboot.resources.Hospitals;

import java.math.BigInteger;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 *
 * @author root
 */
@Service
//@CrossOrigin(origins = "http://195.251.252.222:2442")
//@CrossOrigin
public class HospitalDAO {
      
    @Autowired
    private HospitalsRepository hospitalsRepository;


    public Hospitals save(Hospitals hosp){
        return hospitalsRepository.save(hosp);
    }

    public List<BigInteger> getAllHospitalIds(){return hospitalsRepository.getAllHospitalIds();}
    
    public List<Hospitals> findAll(){
        return hospitalsRepository.findAll();
    }

    public Hospitals getHospital(BigInteger id){
        return hospitalsRepository.getOne(id);
    }

    public String getHospitalNameById(BigInteger hospId){

        return hospitalsRepository.getHospitalNameById(hospId);}

    public Hospitals getHospitalByName(String name){
        return hospitalsRepository.getHospitalByName(name);
   }
    
    
}
