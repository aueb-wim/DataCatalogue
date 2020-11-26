/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.dao;

import com.admir.demiraj.datacatalogspringboot.repository.*;
import com.admir.demiraj.datacatalogspringboot.resources.*;
import com.admir.demiraj.datacatalogspringboot.service.CustomDictionary;
import com.admir.demiraj.datacatalogspringboot.service.StorageService;
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

    @Autowired
    StorageService storageService;

    @Autowired
    PathologyDAO pathologyDAO;

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
        /** Return the latest non-harmonized hospital version*/
        List<Versions> allVersions = versionsRepository.findAll();
        Versions latestVersionByHospitalId = new Versions();
        // Date now = new Date();
        for (Versions version : allVersions) {
            if (!version.getVariables().isEmpty()) {
                if (version.getVariables().get(version.getVariables().size() - 1).getHospital().getHospital_id().compareTo(hospitalId) == 0 &&
                !version.getName().contains("harmonized")) {
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
        System.out.println("hospital id by name: "+hospitalId);
        for (Versions version : allVersions) {
            if (!version.getVariables().isEmpty()) {
                System.out.println("var1 and var2r hospital id: "+version.getVariables().get(0).getHospital().getHospital_id());
                if (version.getVariables().get(0).getHospital().getHospital_id().compareTo(hospitalId) == 0) {
                    versionsByHospitalName.add(version);
                }
            }
        }
        System.out.println("Size of the versions found in hospital: "+hospitalName+versionsByHospitalName.size());
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
    /** This is used to delete all the variables from a variable version and save it as an empty version.
     * It is a better alternative to deleting the whole version when updating versions*/
    public void deleteVariablesFromHospitalVersion(Hospitals currentHospital,Versions currentVersion){
        if(currentVersion != null){
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

            // Finally save the empty version
            saveVersion(currentVersion);

        }else{
            System.out.println("The versions provided is null and thus we cannot delete ts variables");
        }
    }
    /** In the case of a harmonized version that also has cde variables we have to remove the link between them.
     * We cannot delete the cde variables because we need them*/
    public void removeCdeVariablesFromHarmonizedVersion(Versions harmonizedVersion){
        List<CDEVariables> emptyList = new ArrayList<>();
        harmonizedVersion.setCdevariables(emptyList);
        saveVersion(harmonizedVersion);
    }
    public void deleteVersion(Hospitals currentHospital,Versions currentVersion){

            if(currentVersion != null){
                // Get all information needed to create the possible filename that a version might have been created from
                try {
                    String pathologyName = currentHospital.getPathology().getName();
                    String hospitalName = currentHospital.getName();
                    String versioName = currentVersion.getName().toLowerCase();

                    // We also need to remove the file (if any) that was used for the creation of that version
                    // Create possible file name
                    String possibleFileName = pathologyName + "_" + hospitalName + "_" + versioName + ".xlsx";
                    // Get the path of the file if it exists
                    String filePath = storageService.getFilePathOfVersionIfPresent(possibleFileName, false);
                    if (filePath != null) {
                        // move version file if it is found
                        storageService.moveFileToErrorFiles(filePath);
                    } else {
                        System.out.println("CDE FILE NOT FOUND: " + possibleFileName);
                    }
                }catch (Exception e){
                    System.out.println("Unable to delete file.");
                }

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

    }else{
              System.out.println("The versions provided is null and thus it won't be deleted");
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
        //System.out.println("all the keys in the custom dictionary :"+customDictionary.concatenateAllKeysToSingleString());
      return customDictionary;
    }


    // Only for cde variables
    public void deleteVersion(Versions currentVersion){
        // We also need to remove the file (if any) that was used for the creation of that version
        // Create possible file name
        String possibleFileName =  currentVersion.getPathology().getName().toLowerCase()+"_cdes_"+currentVersion.getName().toLowerCase()+".xlsx";
        // Get the path of the file if it exists
        String filePath = storageService.getFilePathOfVersionIfPresent(possibleFileName,true);
        System.out.println("possibleFileName "+possibleFileName);
        if(filePath!=null){
            // move version file if it is found
            storageService.moveFileToErrorFiles(filePath);
        }else{
            System.out.println("Filepath not found");
        }

        List<CDEVariables> CDEVariablesInVersion = currentVersion.getCdevariables();
        cdeVariablesRepository.deleteInBatch(CDEVariablesInVersion);
        List<Versions> versions2Delete =new ArrayList<>();
        versions2Delete.add(currentVersion);
        saveVersion(currentVersion);
        versionsRepository.deleteInBatch(versions2Delete);

    }


    // Delete delete cde variables from version
    public void deleteCdeVariablesFromVersion(Versions currentVersion){
        List<CDEVariables> CDEVariablesInVersion = currentVersion.getCdevariables();
        cdeVariablesRepository.deleteInBatch(CDEVariablesInVersion);
        saveVersion(currentVersion);

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

    public Versions getVersionByHospitalNameAndVersionName(String hospitalName,String versionName){
        System.out.println("Trying to get hospital and version: "+hospitalName+versionName);
        List<Versions> allVersions = getAllVersionByHospitalName(hospitalName);
        System.out.println("allversions size:"+allVersions.size());
        System.out.println("allversions 0:"+allVersions.get(0).getName());

        for(Versions ver:allVersions){
            System.out.println("Version name for hospital:  "+ver.getName());
            if(ver.getName().equals(versionName)){
                return ver;
            }
        }
        return null;
    }

    public Versions getVersionById(BigInteger verId) {
        return versionsRepository.getOne(verId);
    }

}
