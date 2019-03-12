/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.controller;

import com.admir.demiraj.datacatalogspringboot.dao.VariableDAO;
import com.admir.demiraj.datacatalogspringboot.dao.VersionDAO;
import com.admir.demiraj.datacatalogspringboot.resources.*;

import java.math.BigInteger;
import java.util.List;

import com.admir.demiraj.datacatalogspringboot.service.UploadVariables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author root
 */
@RestController
@RequestMapping("/hospital")
public class VersionsVariablesController {

    @Autowired
    private VariableDAO variableDAO;

    @Autowired
    private VersionDAO versionDAO;


    @Autowired
    private UploadVariables uploadVariables;

    @Autowired
    VersionsVariablesController(UploadVariables uploadVariables) {
        this.uploadVariables = uploadVariables;
    }


    @GetMapping("/{hospital_id}/variables/{version_id}")
    public List<Variables> getVariableByHospitalIdAndVersionId(@PathVariable(value = "hospital_id") BigInteger hospitalId,
                                                               @PathVariable(value = "version_id") BigInteger versionId) {
        return variableDAO.getVariablesByHospitalIdAndVersionId(hospitalId, versionId);
    }
    @GetMapping("/readExcel")
    public void readExcel(){
        uploadVariables.readExcelFile();
    }

    @GetMapping("/allVariables")
    public List<Variables> getAllVariables(){
        return variableDAO.findAll();
    }

    @GetMapping("/allUniqueVariables")
    public List<Variables> getAllUniqueVariables(){
        return variableDAO.findAllUnique();
    }


    @GetMapping("/allVariables/{variable_id}")
    public Variables getVariableById(@PathVariable(value="variable_id") BigInteger variableId){return variableDAO.getVariable(variableId);}

    @GetMapping("/variablesByVersion/{version_id}")
    public List<Variables> getVariableByVersionId(@PathVariable(value="version_id") BigInteger versionId){return variableDAO.findVariablesByVersionId(versionId);}

    @GetMapping("/allVersions")
    public List<Versions> getAllVerions(){return versionDAO.getAllVersions();}


    @GetMapping("/versionsPerVariable/{variable_id}")
    public List<Versions> getAllVersionsByVariableId(@PathVariable(value = "variable_id") BigInteger variableId){
        return versionDAO.getAllVersionsByVariableId(variableId);
    }

}
