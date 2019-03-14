/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.dao;

import com.admir.demiraj.datacatalogspringboot.repository.HospitalsRepository;
import com.admir.demiraj.datacatalogspringboot.repository.VersionsRepository;
import com.admir.demiraj.datacatalogspringboot.resources.Hospitals;
import com.admir.demiraj.datacatalogspringboot.resources.Variables;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import jdk.nashorn.internal.runtime.Version;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.management.Query;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author root
 */
@Service
public class VersionDAO {

    @Autowired
    private VersionsRepository versionsRepository;

    @Autowired
    HospitalDAO hospitalDAO;

    public List<Versions> getAllCdeVersions() {

        List<Versions> allversions = versionsRepository.findAll();
        List<Versions> allCdeVersions = new ArrayList<>();
        for (Versions version : allversions) {
            if (!version.getCdevariables().isEmpty() && version.getVariables().isEmpty()) {
                allCdeVersions.add(version);
            }
        }
        return allCdeVersions;

    }

    public Versions getLastCdeVersion() {
        List<Versions> allCdeVersions = getAllCdeVersions();
        if (allCdeVersions.isEmpty())
            return null;
        Versions lastOne = allCdeVersions.get(0);
        for (int i = 0; i < allCdeVersions.size(); i++) {
            if (allCdeVersions.get(i).getVersion_id().compareTo(lastOne.getVersion_id()) == 1)
                lastOne = allCdeVersions.get(i);
        }
        return lastOne;
    }

    public String getJsonStringByVersionId(Long versionId) {
        List<Versions> allversions = versionsRepository.findAll();
        for (Versions ver : allversions) {
            if (ver.getVersion_id() == BigInteger.valueOf(versionId)) {
                return ver.getJsonString();
            }
        }
        return null;
    }

    public String getJsonStringVisualizableByVersionId(Long versionId) {
        List<Versions> allversions = versionsRepository.findAll();
        for (Versions ver : allversions) {
            if (ver.getVersion_id() == BigInteger.valueOf(versionId)) {
                return ver.getJsonStringVisualizable();
            }
        }
        return null;
    }

    public Versions saveVersion(Versions ver) {
        return versionsRepository.save(ver);
    }


    public List<Versions> getAllVersions() {
        return versionsRepository.findAll();
    }

    public Versions getOne(BigInteger verId) {
        List<Versions> allVersions = versionsRepository.findAll();
        for (Versions version : allVersions) {
            if (version.getVersion_id() == verId) {
                return version;
            }
        }
        return null;

    }


    public void saveVariablesToVersion(Versions version, List<Variables> variables) {
        version.setVariables(variables);
    }




    public List<BigInteger> getAllVersionIdsByHospitalId(BigInteger hospitalId) {
        List<Versions> allVersions = versionsRepository.findAll();
        List<BigInteger> versionIdsByHospitalId = new ArrayList<>();
        for (Versions version : allVersions) {
            if (!version.getVariables().isEmpty() && version.getCdevariables().isEmpty()) {
                Variables randomVar = new Variables();
                for (Variables var : version.getVariables()) {
                    randomVar = var;
                    break;
                }
                if (randomVar.getHospital().getHospital_id() == hospitalId) {
                    versionIdsByHospitalId.add(version.getVersion_id());
                }
            }
        }
        return versionIdsByHospitalId;
    }

    /**
     * Check if all variables contained in one version belong to the same hospital and if they do , we can say that
     * the version belong to a hospital.
     */
    public List<Versions> getAllVersionsByHospitalId(BigInteger hospId) {
        List<Versions> allVersions = versionsRepository.findAll();
        List<Versions> hospitalVersions = new ArrayList<>();
        for (Versions version : allVersions) {
            if (!version.getVariables().isEmpty()) {
                boolean allVariablesBelongToHospital = false;
                for (Variables var : version.getVariables()) {
                    if (var.getHospital().getHospital_id() == hospId) {
                        allVariablesBelongToHospital = true;
                    } else {
                        allVariablesBelongToHospital = false;
                        break;
                    }
                }
             if(allVariablesBelongToHospital){
                 hospitalVersions.add(version);
             }
            }

        }
        return hospitalVersions;
    }

    public Versions getLatestVersionByHospitalId(BigInteger hospitalId) {
        List<Versions> allVersions = versionsRepository.findAll();
        Versions latestVersionByHospitalId = new Versions();
        // Date now = new Date();
        for (Versions version : allVersions) {
            if (!version.getVariables().isEmpty()) {
                if (version.getVariables().get(version.getVariables().size() - 1).getHospital().getHospital_id() == hospitalId) {
                    latestVersionByHospitalId = version;
                    //now = version.getCreatedAt();
                }
            }
        }
        return latestVersionByHospitalId;


    }

    public List<Versions> getAllVersionByHospitalName(String hospitalName) {
        List<Versions> allVersions = versionsRepository.findAll();
        List<Versions> versionsByHospitalName = new ArrayList<>();
        BigInteger hospitalId = hospitalDAO.getHospitalIdByName(hospitalName);
        for (Versions version : allVersions) {
            if (!version.getVariables().isEmpty()) {
                if (version.getVariables().get(0).getHospital().getHospital_id() == hospitalId) {
                    versionsByHospitalName.add(version);
                }
            }
        }
        return versionsByHospitalName;
    }


    public boolean isVersionNameInHospital(String versionName, String hospitalName) {
        List<String> allVersionNames = getAllVersionNamesByHospitalName(hospitalName);

        for (String ver : allVersionNames) {
            if (ver.equals(versionName)) {
                return true;
            }
        }
        return false;
    }

    public List<String> getAllVersionNamesByHospitalName(String hospitalName){
        List<String> allVersionNames = new ArrayList<>();
        Hospitals currentHospital = hospitalDAO.getHospitalByName(hospitalName);
        List<Variables> variablesInHospital = currentHospital.getVariables();
        for(Variables var : variablesInHospital){
            List<Versions> versionsInVariable = var.getVersions();
            for(Versions ver : versionsInVariable){
                if(!allVersionNames.contains(ver.getName())){
                    allVersionNames.add(ver.getName());
                }
            }

        }
        return allVersionNames;
    }
    public Versions getVersionById(BigInteger verId) {
        return versionsRepository.getOne(verId);
    }

}
