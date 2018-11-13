/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.dao;

import com.admir.demiraj.datacatalogspringboot.repository.VariablesRepository;
import com.admir.demiraj.datacatalogspringboot.resources.Functions;
import com.admir.demiraj.datacatalogspringboot.resources.Hospitals;
import com.admir.demiraj.datacatalogspringboot.resources.Variables;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;


/**
 *
 * @author root
 */
@Service
@CrossOrigin(origins = "http://localhost:4200")
public class VariableDAO {
    
    @Autowired
    private VariablesRepository variablesRepository;
    
    @Autowired
    private VersionDAO versionDao;
    
    
    public List<Variables> findVariablesByVersionId(BigInteger versionId){
        return variablesRepository.findVariablesByVersionId(versionId);
    }

    public void saveVersionToVariable(Variables var, Versions ver){
        var.setVersions(ver);
    
    }
    
    public void saveFunctionToVariable(Variables var, Functions function){
    var.setFunction(function);
    }
    public void saveHospitalToVariable(Variables var, Hospitals hosp){ var.setHospital(hosp); }

    /**
     Method that given a variableId returns all the possible mappings that the 
     * hospital may have in the creation of CDEVariables
     */
    public List<Variables> variablesToCdeVariables(BigInteger variableId){
        return variablesRepository.variablesToCdeVariables(variableId);
    }

 
   public List<Variables> getVariablesByHospitalIdAndVersionId(BigInteger hospitalId, BigInteger versionId){
       List<Variables> allVariables = variablesRepository.findByHospitalid(hospitalId);
       List<Variables> variablesByVersion = new ArrayList();
   
       for(Variables v : allVariables){
           if(v.getVersions().contains(versionDao.getVersionById(versionId))){
           variablesByVersion.add(v);
           }
       }
       return variablesByVersion;
       
   }

    // save hospital in db
    public Variables save(Variables var){
        return variablesRepository.save(var);
    }
    
    
    //show all variables
    public List<Variables> findAll(){
        return variablesRepository.findAll();
    }
    
    //get an hospital by id
    public Variables getVariable(BigInteger id){
        return variablesRepository.getOne(id);
    }

    
}
