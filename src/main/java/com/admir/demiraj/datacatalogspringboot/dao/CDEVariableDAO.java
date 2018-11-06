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
@CrossOrigin(origins = "http://localhost:4200")
public class CDEVariableDAO {
    @Autowired
    private CDEVariablesRepository cdeVariablesRepository;

    @Autowired
    private VersionDAO versionDAO;
    
    
     public List<CDEVariables> findCDEVariablesByVersionId(Long versionId){
         return cdeVariablesRepository.findCDEVariablesByVersion(versionId);
     } 
    // save cdevariable in db
    public CDEVariables save(CDEVariables cdevar){
        return cdeVariablesRepository.save(cdevar);
    }
    
    public void saveVersionToCDEVariable(CDEVariables cdevar, Versions ver){
        cdevar.setVersions(ver);
    }
    public void saveFunctionToCDEVariable(CDEVariables cdevar, Functions func){
         cdevar.setFunction(func);
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
