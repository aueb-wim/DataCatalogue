/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.controller;

import com.admir.demiraj.datacatalogspringboot.dao.HospitalDAO;
import com.admir.demiraj.datacatalogspringboot.dao.VariableDAO;
import com.admir.demiraj.datacatalogspringboot.dao.VersionDAO;
import com.admir.demiraj.datacatalogspringboot.resources.Hospitals;
import com.admir.demiraj.datacatalogspringboot.resources.Variables;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import com.admir.demiraj.datacatalogspringboot.service.UploadVariables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author root
 */
@RestController
//@CrossOrigin(origins = "http://195.251.252.222:2442")
//@CrossOrigin(origins = "http://172.16.10.138:4200")
//@CrossOrigin
@RequestMapping("/hospital")
public class VersionsVariablesController {

    @Autowired
    private VariableDAO variableDAO;

    @Autowired
    private VersionDAO versionDAO;

    @Autowired
    private HospitalDAO hospitalDAO;

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


    /**
     * Method that inserts some variables (up to 10) from 2 different hospitals with 2-3 different versions
     * in order to test some functionalities.This initialization is to be replaced by a csv parser.
     */

    @GetMapping("/addTestVariables")
    public void saveVariable() {


        //FREIBURG
        List<Variables> allVariablesf = new ArrayList<>();

        allVariablesf.add(new Variables("PID_PSEUDONYMOUS", "hbp", null, "text", null, "NOT NULL",
                null, null,null,null,null));

        allVariablesf.add(new Variables("SEX", "hbp", null, "numeric", null, null,
                "Gender: '0' for 'M', '1' for 'F'", null,null,null, null));

        allVariablesf.add(new Variables("EXAMINATION_DATE", "hbp", null, "date", null, null,
                null, null,null,null, null));

        allVariablesf.add(new Variables("YEAR_OF_BIRTH", "hbp", null, "numeric", null, null,
                null, null,null,null, null));

        allVariablesf.add(new Variables("MMSE", "hbp", null, "numeric", null, null,
                "The Mini-Mental State Examination score", null,null,null,null));

        allVariablesf.add(new Variables("DIAGNOSIS", "hbp", null, "text", null, null,
                "'AD', 'MCI', 'LBD', 'FTD', 'VD', 'AD + VD', 'other'", null,null,null,null));

        //save version
        Versions ver = new Versions("version 1");
        versionDAO.saveVersion(ver);
        //
        Versions ver2 = new Versions("version 2");
        versionDAO.saveVersion(ver2);
        //save hospital
        Hospitals hosp = new Hospitals("Freiburg");
        hospitalDAO.save(hosp);

        for (Variables var : allVariablesf) {
            //add 2 versions to all variables
            variableDAO.saveVersionToVariable(var, ver);
            variableDAO.saveVersionToVariable(var, ver2);
            variableDAO.saveHospitalToVariable(var, hosp);
            variableDAO.save(var);
        }

//NIGUARDA
        List<Variables> allVariablesn = new ArrayList<>();
        allVariablesn.add(new Variables("ID_UNI_PAZIENTE", "CCE/RC", null, "NUMBER(20)", null, "NOT NULL",
                "UNIVOCAL PATIENT IDENTIFIER", null,null,null,null));

        allVariablesn.add(new Variables("ID_UNI_NOSOLOGICO", "CCE/RC", null, "VARCHAR2(50)", null, "NOT NULL",
                "UNIVOCAL NOSOLOGIC", "Clinical episode (hospital admission, outpatient episode or emergency access) univocal code",null,null,null));

        allVariablesn.add(new Variables("CODICE_PRESTAZIONE_ICD9", "CCE/RC", null, "VARCHAR2(10)", null, null,
                "TREATMENT CODE", "Hospital treatment code (ICD9). If null, skip row",null,null,null));

        allVariablesn.add(new Variables("MOTIVO_VISITA", "CCE/RC", null, "CLOB", null, null,
                null, "null at present/ Not to be imported or imported as empty field (varchar) for future use",null,null,null));

        allVariablesn.add(new Variables("DIAGNOSI", "CCE/RC", null, "CLOB", null, null,
                null, "null at present/ Not to be imported or imported as empty field (varchar) for future use",null,null,null));

        allVariablesn.add(new Variables("DATA_REFERTO", "CCE/RC", null, "DATE", null, null,
                "DATE OF MEDICAL REPORT", "not always equal to date of visit. Not to be imported",null,null,null));


        //save version
        Versions ver3 = new Versions("version 1");
        versionDAO.saveVersion(ver3);
        //
        Versions ver4 = new Versions("version 2");
        versionDAO.saveVersion(ver4);
        //save hospital
        Hospitals hosp2 = new Hospitals("Niguarda");
        hospitalDAO.save(hosp2);

        for (Variables var : allVariablesn) {
            //add 2 versions to all variables
            variableDAO.saveVersionToVariable(var, ver3);
            variableDAO.saveVersionToVariable(var, ver4);
            variableDAO.saveHospitalToVariable(var, hosp2);
            variableDAO.save(var);

        }


    }


}
