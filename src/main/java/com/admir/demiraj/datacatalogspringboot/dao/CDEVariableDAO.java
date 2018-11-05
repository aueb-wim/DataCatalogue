/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.dao;

import com.admir.demiraj.datacatalogspringboot.repository.CDEVariablesRepository;
import com.admir.demiraj.datacatalogspringboot.resources.CDEVariables;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author root
 */
@Service
public class CDEVariableDAO {
    @Autowired
    private CDEVariablesRepository cdeVariablesRepository;
    
    
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
    
    //show all cdevariables
    
    public List<CDEVariables> findAll(){
        return cdeVariablesRepository.findAll();
    }
        
    
}
