/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.dao;

import com.admir.demiraj.datacatalogspringboot.repository.*;
import com.admir.demiraj.datacatalogspringboot.resources.*;
import com.admir.demiraj.datacatalogspringboot.service.CustomDictionary;
import javassist.compiler.ast.Variable;
import jdk.nashorn.internal.runtime.Version;
import org.omg.Messaging.SYNC_WITH_TRANSPORT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.management.Query;
import java.math.BigInteger;
import java.util.*;

/**
 * @author root
 */
@Service
public class VersionDAO {

    @Autowired
    private VersionsRepository versionsRepository;

    @Autowired
    HospitalDAO hospitalDAO;

    @Autowired
    VariablesRepository variablesRepository;

    @Autowired
    VariableReportRepository variableReportRepository;

    @Autowired
    CDEVariablesRepository cdeVariablesRepository;

    @Autowired
    FunctionsRepository functionsRepository;

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
            if (ver.getVersion_id().compareTo(BigInteger.valueOf(versionId)) == 0) {
                return ver.getJsonString();
            }
        }
        return null;
    }

    public String getJsonStringVisualizableByVersionId(Long versionId) {
        List<Versions> allversions = versionsRepository.findAll();
        for (Versions ver : allversions) {
            if (ver.getVersion_id().compareTo(BigInteger.valueOf(versionId)) == 0) {
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
            if (version.getVersion_id().compareTo(verId) == 0) {
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
                if (randomVar.getHospital().getHospital_id().compareTo(hospitalId) == 0) {
                    versionIdsByHospitalId.add(version.getVersion_id());
                }
            }
        }
        return versionIdsByHospitalId;
    }

    /**
     * Retrieve the variables of each hospital and in each variable get all the versions that it belongs to. We keep a
     * set with all the unique versions encountered in the variables.
     */
    public List<Versions> getAllVersionsByHospitalId(BigInteger hospId){
        Hospitals currentHospital = hospitalDAO.getHospital(hospId);
        List<Variables> allVariablesInHospital = currentHospital.getVariables();
        List<Versions> allHospitalVersions = new ArrayList<>();
        for(Variables var : allVariablesInHospital){
            List<Versions> allVersionsInVar = var.getVersions();
            for(Versions ver : allVersionsInVar){
                if(!allHospitalVersions.contains(ver)){
                    allHospitalVersions.add(ver);
                }
            }
        }
        return allHospitalVersions;
    }

    public Versions getLatestVersionByHospitalId(BigInteger hospitalId) {
        List<Versions> allVersions = versionsRepository.findAll();
        Versions latestVersionByHospitalId = new Versions();
        // Date now = new Date();
        for (Versions version : allVersions) {
            if (!version.getVariables().isEmpty()) {
                if (version.getVariables().get(version.getVariables().size() - 1).getHospital().getHospital_id().compareTo(hospitalId) == 0) {
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
                if (version.getVariables().get(0).getHospital().getHospital_id().compareTo(hospitalId) == 0) {
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


    public void deleteVersion(Hospitals currentHospital,Versions currentVersion){
        try {


            List<Variables> variablesInVersion = currentVersion.getVariables();

            List<String> versionNamesInHosp = getAllVersionNamesByHospitalName(currentHospital.getName());
            List<Variables> variablesInHospital = currentHospital.getVariables();
            System.out.println("all var names in hosp" + versionNamesInHosp.toString());
            for (Variables varInVersion : variablesInVersion) {
                System.out.println("comparing var in version: " + varInVersion.getName());
                if (versionNamesInHosp.contains(varInVersion.getName())) {
                    System.out.println("Contains works");
                    variablesInHospital.remove(varInVersion);
                }
            }

            currentHospital.setVariables(variablesInHospital);
            hospitalDAO.save(currentHospital);

            for (Variables var : variablesInVersion) {
                List<VariableReport> variableReports = var.getVariableReports();
                variableReportRepository.deleteInBatch(variableReports);
            }
            variablesRepository.deleteInBatch(variablesInVersion);


            List<Versions> versions2Delete = new ArrayList<>();
            versions2Delete.add(currentVersion);
            saveVersion(currentVersion);
            versionsRepository.deleteInBatch(versions2Delete);

            System.out.println("Curent version id:" + currentVersion.getVersion_id());


            //System.out.println("Trying to get deleted version: " + versionsRepository.findById(currentVersion.getVersion_id()));

        }catch (Exception e){
            System.out.println("Error when trying to delete version: "+e);
        }
    }

    public CustomDictionary hospitalsAndVersionsMappingToCDEVersion(Versions CDEVersion){

        // All cde variables in a version
        List<CDEVariables> CDEVariables = CDEVersion.getCdevariables();

        CustomDictionary customDictionary = new CustomDictionary();
        // In order a cde variable to be related with a variable (mapping) there should be a function that contains it.
        List<Functions> allFunctions = functionsRepository.findAll();
        for(Functions function:allFunctions){
            List<CDEVariables> cdeVariablesInFunction = function.getCdeVariables();
            for(CDEVariables cdeVar: CDEVariables){
                if(cdeVariablesInFunction.contains(cdeVar)){
                          for(Variables var: function.getVariables()){
                              // A single variable id belongs to only one method
                              customDictionary.put(var.getHospital().getName(),var.getVersions());
                          }
                }
            }

        }
        System.out.println("all the keys in the custom dictionary :"+customDictionary.concatenateAllKeysToSingleString());
      return customDictionary;
    }
    public void deleteVersion(Versions currentVersion){
        List<CDEVariables> CDEVariablesInVersion = currentVersion.getCdevariables();
        cdeVariablesRepository.deleteInBatch(CDEVariablesInVersion);
        List<Versions> versions2Delete =new ArrayList<>();
        versions2Delete.add(currentVersion);
        saveVersion(currentVersion);
        versionsRepository.deleteInBatch(versions2Delete);

    }



    public List<String> getAllVersionNamesByHospitalName(String hospitalName){
        System.out.println("hospital name:"+hospitalName);
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
