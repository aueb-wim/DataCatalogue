package com.admir.demiraj.datacatalogspringboot.controller;

import com.admir.demiraj.datacatalogspringboot.dao.HospitalDAO;
import com.admir.demiraj.datacatalogspringboot.dao.VersionDAO;
import com.admir.demiraj.datacatalogspringboot.resources.CDEVariables;
import com.admir.demiraj.datacatalogspringboot.resources.Hospitals;
import com.admir.demiraj.datacatalogspringboot.resources.Variables;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import com.admir.demiraj.datacatalogspringboot.service.CustomMapper;
import com.admir.demiraj.datacatalogspringboot.service.CustomMapperCDEs;
import jdk.nashorn.internal.runtime.Version;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;



@RestController
@RequestMapping("/versions")
public class VersionController {

    @Autowired
    private VersionDAO versionDAO;

    @Autowired
    private HospitalDAO hospitalDAO;

    @Autowired
    private CustomMapper customMapper;

    @Autowired
    private CustomMapperCDEs customMapperCDEs;



    @GetMapping("/allVersions")
    public List<Versions>  getAllVerions(){return versionDAO.getAllVersions();}

    @GetMapping("/allVersions/{version_id}")
    public Versions  getVersionById(@PathVariable("version_id") Long versionId){
        BigInteger verId = BigInteger.valueOf(versionId);
        return versionDAO.getVersionById(verId);
    }

    @GetMapping("/jsonStringByVersionId/{version_id}")
    public String getJsonStringByVersionId(@PathVariable(value="version_id") Long version_id){
        return versionDAO.getJsonStringByVersionId(version_id);
    }

    @GetMapping("/jsonStringVisualizableByVersionId/{version_id}")
    public String  getJsonStringVisualizableByVersionId(@PathVariable(value="version_id") Long version_id){return versionDAO.getJsonStringVisualizableByVersionId(version_id);}


    @GetMapping("/allVersionsPerHospital/{hospital_id}")
    public List<Versions>  getAllVersionsPerHospital(@PathVariable(value = "hospital_id") Long hospitalId){
        BigInteger hospId = BigInteger.valueOf(hospitalId);
        return versionDAO.getAllVersionsByHospitalId(hospId);
    }

    @GetMapping("/latestVersionIdByHospId/{hospital_id}")
    public BigInteger latestVersionIdByHospId(@PathVariable(value = "hospital_id") Long hospitalId){
        BigInteger hospId = BigInteger.valueOf(hospitalId);
        List<Versions> allVersionsByHospitalId = versionDAO.getAllVersionsByHospitalId(hospId);
        return allVersionsByHospitalId.get(allVersionsByHospitalId.size()-1).getVersion_id();
    }

    @GetMapping("/getLatestVersionByHospitalId/{hospital_id}")
    public Versions  getLatestVersionByHospital(@PathVariable(value = "hospital_id") Long hospitalId){
        BigInteger hId = BigInteger.valueOf(hospitalId);
        List<Versions> allVersionsByHospitalId = versionDAO.getAllVersionsByHospitalId(hId);
        // if the hospital has no versions then return a single version with a sample variable
        if(allVersionsByHospitalId.isEmpty()){
            // Create new empty cde version in case it is not found
            Versions latestVersion = new Versions();
            // This is not an official version - once we make changes to it, it will be saved as version v1
            latestVersion.setName("v0");
            // Default values in cde variable
            Variables variable = new Variables();
            variable.setCode("sample");
            List<Variables> variablesList = new ArrayList<>();
            variablesList.add(variable);
            // Default values in version
            latestVersion.setVariables(variablesList);
            // Add the newly created version to the empty list in order to return a sample version instead of an empty array
            allVersionsByHospitalId.add(latestVersion);
            System.out.println("Returning sample version with variables: "+latestVersion.getVariables());
        }else{
            // Since we do have at least one hospital version get the latest one
            Versions latestVersion = allVersionsByHospitalId.get(allVersionsByHospitalId.size()-1);
            // Update the list of variables of the hospital version with a sample variable added at the end
            List<Variables> variablesList = latestVersion.getVariables();
            Variables variable = new Variables();
            variable.setCode("sample");
            variablesList.add(variable);
            latestVersion.setVariables(variablesList);
            // Add the latest version to the list in order to be returned
            allVersionsByHospitalId.add(latestVersion);
            System.out.println("Returning version: "+allVersionsByHospitalId.get(allVersionsByHospitalId.size()-1).getName());
        }
        return allVersionsByHospitalId.get(allVersionsByHospitalId.size()-1);
    }

    @GetMapping("/latestCDEVersion")
    public Versions getCDEVariablesOfLatestVersion(){
        List<Versions> allCDEVersions = versionDAO.getAllCdeVersions();
        if(allCDEVersions !=null){
            return allCDEVersions.get(allCDEVersions.size()-1);
        }else{
            return null;
        }

    }

    @PostMapping("/sendNewVersion")
    ResponseEntity<String> receiveNewVersion(@RequestBody(required = false) Versions ver) {
        System.out.println("Received new version");
        String message = "ok";
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);


    }

    @PostMapping(value = "/newVersion2",consumes = MediaType.APPLICATION_JSON_VALUE)
    public String create2(@RequestBody(required = false) Versions ver){
        System.out.println("Received new version "+ver.getName());
        versionDAO.saveVersion(ver);
        System.out.println("Received new version "+ver.getName());
        return "ok";
    }

    @PostMapping(value = "/newVersion")
    public void create2(@RequestBody String ver){
        JSONArray jr = new JSONArray(ver);
        customMapper.mapVersion(jr);
        //return "ok";
    }

    @PostMapping(value = "/newVersionCde")
    public void createCdeVersion(@RequestBody String ver){
        JSONArray jr = new JSONArray(ver);
        customMapperCDEs.mapCdeVersion(jr);
        //return "ok";
    }

    @GetMapping(value = "/deleteCDEVersion/{version_id}")
    public void deleteCDEVersion(@PathVariable(value ="version_id") Long versionId){

            BigInteger verId = BigInteger.valueOf(versionId);
            Versions versionToDelete = versionDAO.getVersionById(verId);
            // This is used only for CDEVersions
            versionDAO.deleteVersion(versionToDelete);
    }


    @GetMapping(value = "/deleteVariableVersion/{hospital_id}/{version_id}")
    public void deleteVariableVersion(@PathVariable(value ="hospital_id") Long hospitalId,@PathVariable(value ="version_id") Long versionId){
        // Get versionBYid
        BigInteger verId = BigInteger.valueOf(versionId);
        Versions versionToDelete = versionDAO.getVersionById(verId);
        // Get hospital by id
        BigInteger hospId = BigInteger.valueOf(hospitalId);
        Hospitals hospitalToDelete = hospitalDAO.getHospitalById(hospId);
        // This is used only for Variable Versions
        versionDAO.deleteVersion(hospitalToDelete,versionToDelete);

    }

}
