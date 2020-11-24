/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.dao;

import com.admir.demiraj.datacatalogspringboot.repository.VariablesRepository;
import com.admir.demiraj.datacatalogspringboot.resources.*;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * @author root
 */
@Service
public class VariableDAO {

    @Autowired
    private VariablesRepository variablesRepository;

    @Autowired
    private VersionDAO versionDao;

    @Autowired
    private FunctionsDAO functionsDAO;


    public List<Variables> findVariablesByVersionId(BigInteger versionId) {
        return variablesRepository.findVariablesByVersionId(versionId);
    }

    public void saveVersionToVariable(Variables var, Versions ver) {
        var.setVersions2(ver);

    }

    public void saveFunctionToVariable(Variables var, Functions function) {
        var.setFunction2(function);
    }

    public void saveHospitalToVariable(Variables var, Hospitals hosp) {
        var.setHospital(hosp);
    }

    /**
     * Method that given a variableId returns all the possible mappings that the
     * hospital may have in the creation of CDEVariables
     */
    public List<Variables> variablesToCdeVariables(BigInteger variableId) {
        return variablesRepository.variablesToCdeVariables(variableId);
    }


    public List<Variables> getVariablesByHospitalIdAndVersionId(BigInteger hospitalId, BigInteger versionId) {
        List<Variables> allVariables = variablesRepository.findByHospitalid(hospitalId);
        List<Variables> variablesByVersion = new ArrayList();

        for (Variables v : allVariables) {
            if (v.getVersions().contains(versionDao.getVersionById(versionId))) {
                variablesByVersion.add(v);
            }
        }
        return variablesByVersion;

    }


    // save hospital in db
    public Variables save(Variables var) {
        return variablesRepository.save(var);
    }

    public void deletePreviousSaveNew(Variables var) {
        List<Variables> allVariables = variablesRepository.findAll();
        for (Variables v : allVariables) {
            if (v.getVariable_id().compareTo(var.getVariable_id()) == 0) {
                variablesRepository.delete(v);
                variablesRepository.save(var);
            }
        }
    }


    //show all variables
    public List<Variables> findAll() {
        return variablesRepository.findAll();
    }

    public List<Variables> findAllUnique() {
        List<Variables> allVar = variablesRepository.findAll();
        List<Variables> uniqueVar = new ArrayList<>();
        for (int i = 0; i < allVar.size(); i++) {
            boolean found = false;
            for (int j = i + 1; j < allVar.size(); j++) {
                if (allVar.get(i).getCode().equals(allVar.get(j).getCode())) {
                    found = true;
                }
            }
            if (!found) {
                uniqueVar.add(allVar.get(i));
            }
        }
        return uniqueVar;
    }

    //get an hospital by id
    public Variables getVariable(BigInteger id) {
        return variablesRepository.getOne(id);
    }

    public boolean variableExists(Variables variable) {
        return variablesRepository.existsById(variable.getVariable_id());
    }

    public Variables findByCode(String vCode) {
        List<Variables> allVar = variablesRepository.findAll();
        for (Variables var : allVar) {
            if (var.getCode().equals(vCode)) {
                return var;
            }
        }
        return null;
    }

    public static boolean compare(String str1, String str2) {
        return (str1 == null ? str2 == null : str1.equals(str2));
    }

    /**
     * Method that given a specific variable searches for other variables with the same code and compares each property
     * and each mapping that the variable contains to see if the variables are identical.
     */
    public Variables compareVariables(Variables variable, List<String> cc11Parts, String[] cc12Parts) {

        List<Variables> allVar = variablesRepository.findAll();
        for (Variables v : allVar) {
            List<Functions> allF = v.getFunction();
            List<String> allMappingRules = new ArrayList<>();
            List<String> allMappingCDECodes = new ArrayList<>();
            for (Functions f : allF) {
                allMappingRules.add(f.getRule());
                allMappingCDECodes.add(f.getCdeVariables().get(0).getCode());
            }
            if(allMappingRules.isEmpty() && compareVariableAttributes(v, variable)){
                System.out.println("Same variable was found and returned1.Original : " + variable.getCode() + " new:" + v.getCode());
               return v;
            }else if(allMappingRules.containsAll(cc11Parts) && allMappingRules.size()==cc11Parts.size() &&
                    allMappingCDECodes.size()==cc12Parts.length && allMappingCDECodes.containsAll(Arrays.asList(cc12Parts)) &&
                    compareVariableAttributes(v, variable)){
                System.out.println("Same variable was found and returned2.Original : " + variable.getCode() + " new:" + v.getCode());
                return v;
            }


        }

        return variable;
    }

    private boolean compareVariableAttributes(Variables v, Variables variable){
        if (v.getCode().equals(variable.getCode()) && compare(v.getName(), variable.getName()) &&
                compare(v.getCsvFile(), variable.getCsvFile()) && compare(v.getValues(), variable.getValues()) &&
                compare(v.getUnit(), variable.getUnit()) && compare(v.getCanBeNull(), variable.getCanBeNull()) &&
                compare(v.getDescription(), variable.getDescription())){
            return true;
        }else{
            return false;
        }
    }


}
