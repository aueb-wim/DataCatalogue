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
public class VersionDAO {

    @Autowired
    private VersionsRepository versionsRepository;

    public List<Versions> getAllCdeVersions(){

        List<Versions> allversions = versionsRepository.findAll();
        List<Versions> allCdeVersions = new ArrayList<>();
        for (Versions version : allversions){
            if(!version.getCdevariables().isEmpty()){
                allCdeVersions.add(version);
            }
        }
        return allCdeVersions;

    }

    public Versions getLastCdeVersion(){
        List<Versions> allCdeVersions = getAllCdeVersions();
        if (allCdeVersions.isEmpty())
            return null;
        Versions lastOne = allCdeVersions.get(0);
        for (int i=0; i<allCdeVersions.size(); i++)
        {
            if (allCdeVersions.get(i).getVersion_id().compareTo(lastOne.getVersion_id()) == 1)
                lastOne = allCdeVersions.get(i);
        }
        return lastOne;
    }

    public String getJsonStringByVersionId(Long versionId){
        List<Versions> allversions = versionsRepository.findAll();
        for(Versions ver : allversions){
            if(ver.getVersion_id() == BigInteger.valueOf(versionId)) {
                return ver.getJsonString();
            }
        }
        return  null;
    }

    public String getJsonStringVisualizableByVersionId(Long versionId){
        List<Versions> allversions = versionsRepository.findAll();
        for(Versions ver : allversions){
            if(ver.getVersion_id() == BigInteger.valueOf(versionId)) {
                return ver.getJsonStringVisualizable();
            }
        }
        return  null;
    }

    public Versions saveVersion(Versions ver) {
        return versionsRepository.save(ver);
    }


    public Versions getLastCdeVersion(){
        List<Versions> allCdeVersions = getAllCdeVersions();
        if (allCdeVersions.isEmpty())
            return null;
        Versions lastOne = allCdeVersions.get(0);
        for (int i=0; i<allCdeVersions.size(); i++)
        {
            if (allCdeVersions.get(i).getVersion_id().compareTo(lastOne.getVersion_id()) == 1)
                lastOne = allCdeVersions.get(i);
        }
        return lastOne;
    }

    public List<Versions> getAllVersions() {
        return versionsRepository.findAll();
    }

    public Versions getOne(BigInteger verId){
        List<Versions> allVersions = versionsRepository.findAll();
        for(Versions version:allVersions){
            if(version.getVersion_id() == verId){
                return version;
            }
        }
        return null;

    }



    public List<Versions> getAllVersionsByVariableId(BigInteger variableId) {
        return versionsRepository.getAllVersionByVariableId(variableId);
    }

    public List<BigInteger> getAllVersionIdsByHospitalId(BigInteger hospitalId) {
        List<Versions> allVersions = versionsRepository.findAll();
        List<BigInteger> versionIdsByHospitalId = new ArrayList<>();
        for(Versions version : allVersions){
            if(!version.getVariables().isEmpty()){
            if(version.getVariables().get(0).getHospital().getHospital_id() == hospitalId){
                versionIdsByHospitalId.add(version.getVersion_id());
            }}
        }
        return versionIdsByHospitalId;
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

    public Versions getVersionById(BigInteger verId) {
        return versionsRepository.getOne(verId);
    }

}
