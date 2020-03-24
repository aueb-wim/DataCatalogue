/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.dao;

import com.admir.demiraj.datacatalogspringboot.repository.CDEVariablesRepository;
import com.admir.demiraj.datacatalogspringboot.resources.CDEVariables;
import com.admir.demiraj.datacatalogspringboot.resources.Pathology;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * @author root
 */
@Service
public class CDEVariableDAO {
    @Autowired
    private CDEVariablesRepository cdeVariablesRepository;


    @Autowired
    private VersionDAO versionDAO;

    @Autowired
    private PathologyDAO pathologyDAO;


    public List<CDEVariables> findCDEVariablesByVersionId(BigInteger versionId) {
        List<Versions> allVersions = versionDAO.getAllVersions();
        for (Versions v : allVersions) {
            if (v.getVersion_id().equals(versionId)) {
                return v.getCdevariables();
            }
        }
        return null;
    }


    public CDEVariables save(CDEVariables cdevar) {
        return cdeVariablesRepository.save(cdevar);
    }

    public CDEVariables getCDEVariableByName(String CDEName) {
        List<CDEVariables> allCDEVariables = cdeVariablesRepository.findAll();
        for (CDEVariables cde : allCDEVariables) {
            if (cde.getName().equals(CDEName)) {
                return cde;
            }
        }
        return null;
    }

    public CDEVariables getCDEVariableByCode(String CDECode) {
        List<CDEVariables> allCDEVariables = cdeVariablesRepository.findAll();
        for (CDEVariables cde : allCDEVariables) {
            if (cde.getCode().equals(CDECode)) {
                return cde;
            }
        }
        return null;
    }

    public CDEVariables getCDEVariableByCodeAndPathologyName(String CDECode, String pathologyName) {

        // Get all the versions in the pathology
        Pathology pathology = pathologyDAO.getPathologyByName(pathologyName);
        List<Versions> allVersionsInPathology = pathology.getVersions();

        // Keep only the cde versions that are present in a pathology
        List<Versions> onlyCdeVersions = new ArrayList<>();
        for (Versions version : allVersionsInPathology) {
            if (!version.getCdevariables().isEmpty() && version.getVariables().isEmpty()) {
                onlyCdeVersions.add(version);
            }
        }

        // Get the latest version in a pathology
        if (onlyCdeVersions.isEmpty())
            return null;
        Versions lastOne = onlyCdeVersions.get(0);
        for (int i = 0; i < onlyCdeVersions.size(); i++) {
            if (onlyCdeVersions.get(i).getVersion_id().compareTo(lastOne.getVersion_id()) == 1)
                lastOne = onlyCdeVersions.get(i);
        }

        // get all the variables of the latest cde version of a pathology and return the one with the requested code
        List<CDEVariables> allCDEVariablesInVersion = lastOne.getCdevariables();
        for(CDEVariables cdevar: allCDEVariablesInVersion){
            if(cdevar.getCode().equals(CDECode)){
                return cdevar;
            }
        }
        return null;

    }





    public void saveVersionToCDEVariable(CDEVariables cdevar, Versions ver) {
        cdevar.setVersions2(ver);
    }

    public static boolean compare(String str1, String str2) {
        return (str1 == null ? str2 == null : str1.equals(str2));
    }


    public CDEVariables compareVariableAttributes(CDEVariables cdevariable) {
        List<CDEVariables> allcdevariables = cdeVariablesRepository.findAll();
        for (CDEVariables cdev : allcdevariables) {
            if (cdev.getCode().equals(cdevariable.getCode()) && compare(cdev.getName(), cdevariable.getName()) &&
                    compare(cdev.getCsvFile(), cdevariable.getCsvFile()) && compare(cdev.getValues(), cdevariable.getValues()) &&
                    compare(cdev.getUnit(), cdevariable.getUnit()) && compare(cdev.getCanBeNull(), cdevariable.getCanBeNull()) &&
                    compare(cdev.getDescription(), cdevariable.getDescription())) {
                return null;
            }
        }
        return cdevariable;
    }

    public List<Versions> getAllCdeVersions() {
        return versionDAO.getAllCdeVersions();
    }

    public Boolean isCdeVersionPresent(String versionName) {
        List<String> allCdeVersionNames = cdeVariablesRepository.getAllCdeVersionNames();
        for (String vn : allCdeVersionNames) {
            if (versionName.equals(vn)) {
                return true;
            }
        }
        return false;
    }


    public List<CDEVariables> findAll() {
        return cdeVariablesRepository.findAll();
    }


}
