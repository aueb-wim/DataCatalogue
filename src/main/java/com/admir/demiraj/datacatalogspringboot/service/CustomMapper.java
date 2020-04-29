package com.admir.demiraj.datacatalogspringboot.service;

import com.admir.demiraj.datacatalogspringboot.dao.*;
import com.admir.demiraj.datacatalogspringboot.exceptionHandlers.CustomException;
import com.admir.demiraj.datacatalogspringboot.resources.CDEVariables;
import com.admir.demiraj.datacatalogspringboot.resources.Hospitals;
import com.admir.demiraj.datacatalogspringboot.resources.Variables;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;
//import org.bouncycastle.math.ec.ScaleYPointMap;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CustomMapper {

    @Autowired
    HospitalDAO hospitalDAO;

    @Autowired
    VersionDAO versionDAO;

    @Autowired
    UploadVariables uploadVariables;

    @Autowired
    private VariablesXLSX_JSON variablesXLSX_json;

    @Autowired
    private VariableDAO variableDAO;

    @Autowired
    private CDEVariableDAO cdeVariableDAO;

    @Autowired
    private PathologyDAO pathologyDAO;



    public void throwExceptionOnNull(JSONArray jr){}
    public void throwExceptionOnNull2(JSONArray jr){
        // for all possible indexes
        for(int i=0;i<4;i++){
            if(i==0 && jr.get(i)==null){
                throw new CustomException("The pathology name provided to create a new version is null.",
                        "A version cannot be created without a pathology name","Please ensure that the pathology name is not null.");
            }else if(i==1 && jr.get(i)==null){
                throw new CustomException("The hospitalName name provided to create a new version is null.",
                        "A version cannot be created without a hospitalName name","Please ensure that the hospitalName name is not null.");
            }else if(i==2 && jr.get(i)==null){
                throw new CustomException("The versionName name provided to create a new version is null.",
                        "A version cannot be created without a versionName name","Please ensure that the versionName name is not null.");
            }else if(i==3 && jr.get(i)==null){
                throw new CustomException("The version is null.",
                        "A version cannot be empty","Please ensure that the version is not null.");
            }
        }
    }
    public void mapVersion(JSONArray jr) {
        throwExceptionOnNull(jr);
        System.out.println("at index 0 we have :"+jr.get(0));
        // the elements below should not be null

        //String pathologyName = jr.getString(0);
        String pathologyName = jr.get(0).toString();
        //String hospitalName = jr.getString(1);
        String hospitalName = jr.get(1).toString();
        //String versionName = jr.getString(2);
        String versionName = jr.get(2).toString();
        JSONObject version = jr.getJSONObject(3);

        Hospitals currentHospital = hospitalDAO.getHospitalByName(hospitalName);
        //The hospital exists
        if (currentHospital != null) {
            System.out.println("The hospital exists");
            //The version is present at hospital
            if (versionDAO.isVersionNameInHospital(versionName, hospitalName)) {
                // NOTE !! PERHAPS WE WANT TO UPDATE A VERSION THAT ALREADY EXISTS
                System.out.println("The version : " + versionName + " is already present at : " + hospitalName + " and won't be saved");
                //The version isn't present at hospital
                boolean updatePrevious = true;
                createVersion(versionName, currentHospital, version, pathologyName,updatePrevious);
            } else {
                boolean updatePrevious = false;
                createVersion(versionName, currentHospital, version, pathologyName,updatePrevious);
            }


            //The hospital doesn't exist
        } else {
            System.out.println("The hospital was not found!");

        }
       // System.out.println("Received new mappingfunctions" + mappingArray);
       // System.out.println("Jo IS: " + version.getJSONArray("variables").getJSONObject(0).get("code"));
    }


    public void updateExistingVariableVersion(JSONObject versionObject){
         Versions versionToUpdate = versionDAO.getVersionById(versionObject.getBigInteger("version_id"));

         //We can only change the variables in a version (mappings and jsonVisualizable are affected)



    }

    public void createVersion(String versionName, Hospitals currentHospital, JSONObject versionObject,
                              String pathologyName, boolean updatePrevious) {
        String filePath = "";
        Versions version;
        Versions harmonizedVersion;
        // If we want to update a previous version we just need to load them initially and make all the changes needed
        // to their fields (that means we should also produce a new json array)
        if(updatePrevious){
            // delete previous variables from version and add the newly provided ones
            version = versionDAO.getVersionById(versionObject.getBigInteger("version_id"));

            System.out.println("looking for hospital  and version: "+currentHospital.getName()+versionObject.getString("name")+"-harmonized");
            harmonizedVersion = versionDAO.getVersionByHospitalNameAndVersionName(currentHospital.getName(),
                    versionObject.getString("name")+"-harmonized");

            versionDAO.deleteVariablesFromHospitalVersion(currentHospital, version);
            versionDAO.deleteVariablesFromHospitalVersion(currentHospital, harmonizedVersion);

        }else {
           version = new Versions(versionName);
           harmonizedVersion = new Versions(versionName + "-harmonized");
        }
        System.out.println("Saving Version");
        List<Variables> allVar = new ArrayList<>();
        List<Variables> allVar3 = new ArrayList<>();
        Map<String, List<Variables>> map;
        map = customMappings(version, currentHospital, versionObject, harmonizedVersion,pathologyName);
        allVar =  map.get("variables");
        allVar3 =  map.get("hvariables");

        List<Variables> allVar2 = new ArrayList<>();
        for (Variables var : allVar) {
            System.out.println("The variable returned is: "+var.getCode()+" out of: "+allVar.size());
            if (var.getHospital() != null && var.getCode() != null) {
                allVar2.add(var);
            }
        }
        for(Variables var : allVar2){
            System.out.println("allvar2 contains: "+var.getCode());
        }
        System.out.println("allvar1 size: "+allVar.size()+"allvar2 size: "+allVar2.size());

        variablesXLSX_json.hospital = currentHospital;
        variablesXLSX_json.version = version;
        // Edit mode decides whether we should delete a version after an error or not
        variablesXLSX_json.editMode = updatePrevious;

        VariablesXLSX_JSON.Node testTree = variablesXLSX_json.createTree(allVar);
        //Select last Version of the CDEs : TO BE CHANGED!!! We have to parameterize the version it takes ********
        //Versions lastVersion = versionDAO.getLastCdeVersion();
        Versions lastVersion = pathologyDAO.getLatestCdeVersionByPathologyName(pathologyName);

        System.out.println("cde variables found : "+ cdeVariableDAO.findCDEVariablesByVersionId(lastVersion.getVersion_id()).size());
        List<CDEVariables> cdeVars = cdeVariableDAO.findCDEVariablesByVersionId(lastVersion.getVersion_id());
        //******** ********* ********* **** TO BE CHANGED!!! ******** ********* ********* ********* ******** ***
        version.setJsonString(variablesXLSX_json.createJSONMetadataWithCDEs(allVar, cdeVars).toString());
        version.setJsonStringVisualizable(variablesXLSX_json.createJSONVisualization(testTree).toString());
        version.setVariables(allVar2);
        versionDAO.saveVersion(version);

        List<CDEVariables> cdeVariables = new ArrayList<>();
        for(CDEVariables cdevar : pathologyDAO.getLatestCdeVersionByPathologyName(pathologyName).getCdevariables()){
            cdevar.setVersions2(harmonizedVersion);
            cdeVariables.add(cdevar);
        }
        VariablesXLSX_JSON.Node testTree2 = variablesXLSX_json.createTree2(allVar, cdeVars);
        harmonizedVersion.setJsonString(variablesXLSX_json.createJSONMetadataWithCDEs(allVar, cdeVars).toString());
        harmonizedVersion.setJsonStringVisualizable(variablesXLSX_json.createJSONVisualization(testTree2).toString());
        harmonizedVersion.setCdevariables(cdeVariables);
        harmonizedVersion.setVariables(allVar3);
        versionDAO.saveVersion(harmonizedVersion);

    }

    public Map<String,List<Variables>> customMappings(Versions version, Hospitals currentHospital, JSONObject versionObject,
                                                      Versions harmonizedVersion, String pathologyName) {
        List<Variables> xlsxVars = new ArrayList<>();
        List<Variables> xlsxHarmonizedVars = new ArrayList<>();//<harmonizedVariables>
        //String mapFunction = null;
        System.out.println("Inside custom mapping");

        JSONArray variablesJsonArray = versionObject.getJSONArray("variables");
        for (int i = 0; i < variablesJsonArray.length(); i++) {
            Variables newVar = new Variables();
            JSONObject variableJsonObject = variablesJsonArray.getJSONObject(i);
            System.out.println("Adding name to variable: " + variableJsonObject.toString());
            //newVar.setName(variableJsonObject.get("name").toString());
            newVar.setCsvFile(variableJsonObject.get("csvFile").toString());
            newVar.setName(variableJsonObject.get("name").toString());
            newVar.setCode(variableJsonObject.get("code").toString());
            newVar.setType(variableJsonObject.get("type").toString());
            newVar.setValues(variableJsonObject.get("values").toString());
            newVar.setUnit(variableJsonObject.get("unit").toString());
            newVar.setCanBeNull(variableJsonObject.get("canBeNull").toString());
            newVar.setDescription(variableJsonObject.get("description").toString());
            newVar.setComments(variableJsonObject.get("comments").toString());
            newVar.setConceptPath(variableJsonObject.get("conceptPath").toString());
            newVar.setMethodology(variableJsonObject.get("methodology").toString());


            if (variableJsonObject.has("mapCDE") && variableJsonObject.get("mapCDE").toString() != "" && !variableJsonObject.get("mapCDE").toString().isEmpty()
            && variableJsonObject.get("mapCDE") != null) {
                if (variableJsonObject.get("mapCDE").toString().contains(",")) {

                    newVar = uploadVariables.mappingToMultipleCdes(variableJsonObject.get("mapCDE").toString(), variableJsonObject.get("mapFunction").toString(), newVar, version, currentHospital,pathologyName);

                } else {

                    newVar = uploadVariables.mappingToSingleCde(variableJsonObject.get("mapCDE").toString(), variableJsonObject.get("mapFunction").toString(), newVar, version, currentHospital,pathologyName);
                    System.out.println("newVar after mapping to single: "+newVar.getCode());
                }
            } else {//cell is empty
                variableDAO.saveVersionToVariable(newVar, harmonizedVersion);
                variableDAO.saveVersionToVariable(newVar, version);

                List<Variables> hospVar = currentHospital.getVariables();
                hospVar.add(newVar);
                currentHospital.setVariables(hospVar);
                hospitalDAO.save(currentHospital);
                newVar.setHospital(currentHospital);
                variableDAO.save(newVar);

                xlsxHarmonizedVars.add(newVar);
            }

            xlsxVars.add(newVar);
        }

        Map<String,List<Variables>> map =new HashMap();
        map.put("variables",xlsxVars);
        map.put("hvariables",xlsxHarmonizedVars);
        return map;

    }
}
