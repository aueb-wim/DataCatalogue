/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.dao;

import com.admir.demiraj.datacatalogspringboot.repository.VersionsRepository;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import jdk.nashorn.internal.runtime.Version;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.management.Query;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

/**
 * @author root
 */
@Service
@CrossOrigin(origins = "http://localhost:4200")
public class VersionDAO {

    @Autowired
    private VersionsRepository versionsRepository;

    public List<Versions> getAllCdeVersions(){

        List<Versions> allversions = versionsRepository.findAll();
        List<Versions> allCdeVerions = new ArrayList<>();
        for (Versions version : allversions){
            if(!version.getCdevariables().isEmpty()){
                allCdeVerions.add(version);
            }
        }
        return allCdeVerions;

    }

    public List<Versions> getAllCdeVersions2(){
        return versionsRepository.getAllCdeVersions();
    }

    public Versions saveVersion(Versions ver) {
        return versionsRepository.save(ver);
    }

    public Versions getVersionById(BigInteger versionId) {
        return versionsRepository.getVersionById(versionId);
    }

    public List<Versions> getAllVersions() {
        return versionsRepository.getAllVersions();
    }

    public List<Versions> getAllVersionsByVariableId(Long variableId) {
        return versionsRepository.getAllVersionByVariableId(variableId);
    }

    public List<BigInteger> getAllVersionIdsByHospitalId(BigInteger hospitalId) {
        return versionsRepository.getAllVersionByHospitalId(hospitalId);
    }

    public boolean isVersionNameInHospital(String versionName, String hospitalName) {
        List<String> allVersionNames = versionsRepository.getAllVersionNamesByHospitalName(hospitalName);
        for (String ver : allVersionNames) {
            if (ver.equals(versionName)) {
                return true;
            }
        }
        return false;
    }

    public Versions getOne(Long verId) {
        return versionsRepository.getOne(verId);
    }

}
