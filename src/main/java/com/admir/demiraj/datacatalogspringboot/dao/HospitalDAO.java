/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.dao;

import com.admir.demiraj.datacatalogspringboot.repository.HospitalsRepository;
import com.admir.demiraj.datacatalogspringboot.resources.Hospitals;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import com.admir.demiraj.datacatalogspringboot.resources.Variables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author root
 */
@Service
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

    public List<Hospitals> findAllWithUniqueVariables(){
        List<Hospitals> allHosp = hospitalsRepository.findAll();
        List<Hospitals> allHospUniqVar = new ArrayList<>();
        for (Hospitals hosp: allHosp){
            List<Variables> allVar = hosp.getVariables();
            List<Variables> uniqueVar = new ArrayList<>();
            for(int i=0;i<allVar.size();i++){
                boolean found = false;
                for(int j = i+1;j<allVar.size();j++){
                    if(allVar.get(i).getCode().equals(allVar.get(j).getCode())){
                        found = true;
                    }
                }
                if(!found){
                    uniqueVar.add(allVar.get(i));
                }
            }
            hosp.setVariables(uniqueVar);
            allHospUniqVar.add(hosp);
        }
        return allHospUniqVar;
    }

    public Hospitals getHospital(BigInteger id){
        return hospitalsRepository.getOne(id);
    }

    public String getHospitalNameById(BigInteger hospId){

        return hospitalsRepository.getHospitalNameById(hospId);}

    public Hospitals getHospitalByName(String name){
        return hospitalsRepository.getHospitalByName(name);
   }

   public BigInteger getHospitalIdByName(String hospName){
        List<Hospitals> allHosp = hospitalsRepository.findAll();
        for (Hospitals h : allHosp){
            if(h.getName().equals(hospName)){
                return h.getHospital_id();
            }
        }
        return null;
   }
    
    
}
