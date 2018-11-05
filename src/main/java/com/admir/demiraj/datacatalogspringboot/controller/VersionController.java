package com.admir.demiraj.datacatalogspringboot.controller;

import com.admir.demiraj.datacatalogspringboot.dao.HospitalDAO;
import com.admir.demiraj.datacatalogspringboot.dao.VersionDAO;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/versions")
public class VersionController {

    @Autowired
    private VersionDAO versionDAO;

    @Autowired
    private HospitalDAO hospitalDAO;

    @GetMapping("/allVersions")
    public List<Versions>  getAllVerions(){return versionDAO.getAllVersions();}


    @GetMapping("/allVersionsPerHospital")
    public List<List<Versions>>  getAllVersionsPerHospital(){
        List<BigInteger> allHospitalIds = new ArrayList<>();
        allHospitalIds = hospitalDAO.getAllHospitalIds();
        List<List<Versions>> versionsPerHospital = new ArrayList<>();

        for(BigInteger hospId : allHospitalIds){
            List<BigInteger> allVersionIds = new ArrayList<>();
            allVersionIds = versionDAO.getAllVersionIdsByHospitalId(hospId);
            //System.out.println(hospId+"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            List<Versions> versions = new ArrayList<>();
             for(BigInteger versionId : allVersionIds){

                 versions.add(versionDAO.getVersionById(versionId));
                 //System.out.println(versionId +"ffffffffffffffffffffffffffffffff");
             }
            //System.out.println(versions.size()+"BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
              versionsPerHospital.add(versions);
            //System.out.println(versionsPerHospital+"CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC");
        }
        return versionsPerHospital;
        }

    @GetMapping("/allVersionsPerHospital2")
    public Map<String, List<Versions>>  getAllVersionsPerHospital2(){
        List<BigInteger> allHospitalIds = new ArrayList<>();
        allHospitalIds = hospitalDAO.getAllHospitalIds();
        Map<String, List<Versions>> versionsPerHospital = new HashMap<>();

        for(BigInteger hospId : allHospitalIds){
            List<BigInteger> allVersionIds = new ArrayList<>();
            allVersionIds = versionDAO.getAllVersionIdsByHospitalId(hospId);
            //System.out.println(hospId+"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            List<Versions> versions = new ArrayList<>();
            for(BigInteger versionId : allVersionIds){

                versions.add(versionDAO.getVersionById(versionId));
                //System.out.println(versionId +"ffffffffffffffffffffffffffffffff");
            }
            String hospName = hospitalDAO.getHospitalNameById(hospId);
            //System.out.println(versions.size()+"BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
            versionsPerHospital.put(hospName, versions);
            //System.out.println(versionsPerHospital+"CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC");
        }
        return versionsPerHospital;
    }
}
