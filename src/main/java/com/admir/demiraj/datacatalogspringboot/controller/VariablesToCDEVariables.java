/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.controller;

import com.admir.demiraj.datacatalogspringboot.dao.CDEVariableDAO;
import com.admir.demiraj.datacatalogspringboot.dao.FunctionsDAO;
import com.admir.demiraj.datacatalogspringboot.dao.HospitalDAO;
import com.admir.demiraj.datacatalogspringboot.dao.VariableDAO;
import com.admir.demiraj.datacatalogspringboot.dao.VersionDAO;
import com.admir.demiraj.datacatalogspringboot.resources.CDEVariables;
import com.admir.demiraj.datacatalogspringboot.resources.Functions;
import com.admir.demiraj.datacatalogspringboot.resources.Hospitals;
import com.admir.demiraj.datacatalogspringboot.resources.Variables;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;

import java.math.BigInteger;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author root
 */
@RestController
@RequestMapping("/mapping")
@CrossOrigin(origins = "http://localhost:4200")
public class VariablesToCDEVariables {

    @Autowired
    private VariableDAO variableDAO;
    
    @Autowired
    private VersionDAO versionDAO;
    
   @Autowired
   private HospitalDAO hospitalDAO;
    
   @Autowired
   private FunctionsDAO functionsDAO;
   
   @Autowired
   private CDEVariableDAO cdeVariableDAO;

   
   
   @PostMapping("/variables/{variable_id}")
   public List<Variables> getVariablesForEachMapping(@PathVariable(value="variable_id") BigInteger variableId){
       return variableDAO.variablesToCdeVariables(variableId);

   }


   
    //save variables
    @GetMapping("/variables")
    public void saveVariable(){
        Versions ver = new Versions("version 1");
        versionDAO.saveVersion(ver);
        
        Hospitals hosp = new Hospitals("hospital 1");
        hospitalDAO.save(hosp);
        
        ///////////////////  2 DIFFRENT CASES FOR CREATING VARIABLES  //////////
        
        ///// CASE 1: One function for multiple variables //////// 
        Functions function1 = new Functions("turn 0 to F, turn 1 to M","rule description 1");
        CDEVariables cdeVariable = new CDEVariables("cd1", "file1", null, null, null, null, null, null,null,null,null);
        
        //function1.setCdeVariable(cdeVariable);
        functionsDAO.save(function1);
        cdeVariable.setFunction(function1);
        cdeVariableDAO.save(cdeVariable);
        
        
        
        for(int i=0;i<3;i++){
        Variables var = new Variables("name"+i, "hbp", null, "text", null, "NOT NULL",
                null, null,null,null);
        variableDAO.saveVersionToVariable(var, ver);
        variableDAO.saveHospitalToVariable(var, hosp);
        variableDAO.saveFunctionToVariable(var, function1);
        variableDAO.save(var);
        }
        
        ///// CASE 2: Two functions for one hospital ////////
        
        Functions function2 = new Functions("turn 1 to 2","rule description 2");
        CDEVariables cdeVariable2 = new CDEVariables("cd2", "file2", null, null, null, null, null, null,null,null,null);
        
        //function2.setCdeVariable(cdeVariable2);
        functionsDAO.save(function2);
        cdeVariable2.setFunction(function2);
        cdeVariableDAO.save(cdeVariable2);
        
        
        Functions function3 = new Functions("turn 2 to 3","rule description 3");
        CDEVariables cdeVariable3 = new CDEVariables("cd3", "file3", null, null, null, null, null, null,null,null,null);
        
        //function3.setCdeVariable(cdeVariable3);
        functionsDAO.save(function3);
        cdeVariable3.setFunction(function3);
        cdeVariableDAO.save(cdeVariable3);
        
        
        Variables var2 = new Variables("name", "hbp", null, "text", null, "NOT NULL",
                null, null,null,null);
        variableDAO.saveVersionToVariable(var2, ver);
        variableDAO.saveHospitalToVariable(var2, hosp);
        variableDAO.saveFunctionToVariable(var2, function2);
        variableDAO.saveFunctionToVariable(var2, function3);
        variableDAO.save(var2);
        
      
            
        
    }
    
}
