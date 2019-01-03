/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.dao;

import com.admir.demiraj.datacatalogspringboot.repository.CDEVariablesRepository;
import com.admir.demiraj.datacatalogspringboot.resources.CDEVariables;
import com.admir.demiraj.datacatalogspringboot.resources.Functions;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import jdk.nashorn.internal.runtime.Version;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 *
 * @author root
 */
@Service
//@CrossOrigin(origins = "http://195.251.252.222:2442")
//@CrossOrigin(origins = "http://172.16.10.138:4200")
//@CrossOrigin
public class CDEVariableDAO {
    @Autowired
    private CDEVariablesRepository cdeVariablesRepository;


    @Autowired
    private VersionDAO versionDAO;
<<<<<<< HEAD
    
    
    public List<CDEVariables> findCDEVariablesByVersionId(BigInteger versionId){
         return cdeVariablesRepository.findCDEVariablesByVersion(versionId);
    }
=======


     public List<CDEVariables> findCDEVariablesByVersionId(BigInteger versionId){
        List<Versions> allVersions = versionDAO.getAllVersions();
        for(Versions v : allVersions){
            System.out.println("version is : "+v.getVersion_id()+" looking for : "+versionId);
            if(v.getVersion_id().equals(versionId)){
                System.out.println("inside ifis : ");
                return v.getCdevariables();
            }
        }
        return null;
     } 
>>>>>>> 7dec5fd569e5d0b362c182eee8b187361e6e79f8

    public CDEVariables save(CDEVariables cdevar){
        return cdeVariablesRepository.save(cdevar);
    }

    public CDEVariables getCDEVariableByName(String CDEName){
         List<CDEVariables> allCDEVariables = cdeVariablesRepository.findAll();
         for(CDEVariables cde : allCDEVariables){
             if(cde.getName().equals(CDEName)){
                 return cde;
             }
         }
         return null;
    }
    
    public void saveVersionToCDEVariable(CDEVariables cdevar, Versions ver){
        cdevar.setVersions(ver);
    }


    public List<Versions> getAllCdeVersions(){
         return versionDAO.getAllCdeVersions();
    }

    public Boolean isCdeVersionPresent(String versionName){
         List<String> allCdeVersionNames = cdeVariablesRepository.getAllCdeVersionNames();
         for (String vn : allCdeVersionNames ){
             if(versionName.equals(vn)){
                 return true;
             }
         }
         return false;
    }
    
    //show all cdevariables
    public List<CDEVariables> findAll(){
        return cdeVariablesRepository.findAll();
    }
        
    
}
