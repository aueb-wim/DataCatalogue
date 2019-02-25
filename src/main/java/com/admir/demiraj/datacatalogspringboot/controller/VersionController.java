package com.admir.demiraj.datacatalogspringboot.controller;

import com.admir.demiraj.datacatalogspringboot.dao.HospitalDAO;
import com.admir.demiraj.datacatalogspringboot.dao.VersionDAO;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import com.admir.demiraj.datacatalogspringboot.service.CustomMapper;
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



    @GetMapping("/allVersions")
    public List<Versions>  getAllVerions(){return versionDAO.getAllVersions();}

    @GetMapping("/allVersions/{version_id}")
    public Versions  getVersionById(@PathVariable("version_id") Long versionId){
        BigInteger verId = BigInteger.valueOf(versionId);
        return versionDAO.getOne(verId);}

    @GetMapping("/jsonStringByVersionId/{version_id}")
    public String getJsonStringByVersionId(@PathVariable(value="version_id") Long version_id){
        return versionDAO.getJsonStringByVersionId(version_id);
    }

    @GetMapping("/jsonStringVisualizableByVersionId/{version_id}")
    public String  getJsonStringVisualizableByVersionId(@PathVariable(value="version_id") Long version_id){return versionDAO.getJsonStringVisualizableByVersionId(version_id);}


    @GetMapping("/allVersionsPerHospital")
    public Map<String, List<Versions>>  getAllVersionsPerHospital(){
        List<BigInteger> allHospitalIds = hospitalDAO.getAllHospitalIds();
        Map<String, List<Versions>> versionsPerHospital = new HashMap<>();
        for(BigInteger hospId : allHospitalIds){
            List<BigInteger> allVersionIds = versionDAO.getAllVersionIdsByHospitalId(hospId);
            List<Versions> versions = new ArrayList<>();
            for(BigInteger versionId : allVersionIds){
                versions.add(versionDAO.getVersionById(versionId));
            }

            String hospName = hospitalDAO.getHospitalNameById(hospId);
            versionsPerHospital.put(hospName, versions);

        }
        return versionsPerHospital;
    }

    @GetMapping("/allVersionsPerHospital/{hospital_id}")
    public List<Versions>  getAllVersionsPerHospital(@PathVariable(value = "hospital_id") Long hospitalId){


        BigInteger hospId = BigInteger.valueOf(hospitalId);
            List<BigInteger> allVersionIds = versionDAO.getAllVersionIdsByHospitalId(hospId);
            List<Versions> versions = new ArrayList<>();
            for(BigInteger versionId : allVersionIds){
                versions.add(versionDAO.getVersionById(versionId));
            }
        return versions;
    }

    @GetMapping("/latestVersionIdByHospId/{hospital_id}")
    public BigInteger latestVersionIdByHospId(@PathVariable(value = "hospital_id") Long hospitalId){
        BigInteger hospId = BigInteger.valueOf(hospitalId);
        List<BigInteger> allVersionIds = versionDAO.getAllVersionIdsByHospitalId(hospId);
        return allVersionIds.get(allVersionIds.size()-1);
    }

    @GetMapping("/getLatestVersionByHospitalId/{hospital_id}")
    public Versions  getLatestVersionByHospital(@PathVariable(value = "hospital_id") Long hospitalId){
        BigInteger hId = BigInteger.valueOf(hospitalId);
        return versionDAO.getLatestVersionByHospitalId(hId);
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

}
