package com.admir.demiraj.datacatalogspringboot.service;

import com.admir.demiraj.datacatalogspringboot.dao.CDEVariableDAO;
import com.admir.demiraj.datacatalogspringboot.dao.HospitalDAO;
import com.admir.demiraj.datacatalogspringboot.dao.VariableDAO;
import com.admir.demiraj.datacatalogspringboot.dao.VersionDAO;
import com.admir.demiraj.datacatalogspringboot.resources.CDEVariables;
import com.admir.demiraj.datacatalogspringboot.resources.Hospitals;
import com.admir.demiraj.datacatalogspringboot.resources.Variables;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import org.bouncycastle.math.ec.ScaleYPointMap;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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





    public void mapVersion(JSONArray jr) {
        String hospitalName = jr.getString(0);
        String versionName = jr.getString(1);
        JSONObject version = jr.getJSONObject(2);

        Hospitals currentHospital = hospitalDAO.getHospitalByName(hospitalName);
        //The hospital exists
        if (currentHospital != null) {
            System.out.println("The hospital exists");
            //The version is present at hospital
            if (versionDAO.isVersionNameInHospital(versionName, hospitalName)) {
                // NOTE !! PERHAPS WE WANT TO UPDATE A VERSION THAT ALREADY EXISTS
                System.out.println("The version : " + versionName + " is already present at : " + hospitalName + " and won't be saved");
                //The version isn't present at hospital
            } else {
                createVersion(versionName, currentHospital, version);
            }


            //The hospital doesn't exist
        } else {
            System.out.println("The hospital was not found!");

        }
       // System.out.println("Received new mappingfunctions" + mappingArray);
       // System.out.println("Jo IS: " + version.getJSONArray("variables").getJSONObject(0).get("code"));
    }

    public void createVersion(String versionName, Hospitals currentHospital, JSONObject versionObject) {
        //generateConceptPathFromMapping(filePath);
        Versions version = new Versions(versionName);
        Versions harmonizedVersion = new Versions(versionName+"-harmonized");
        System.out.println("Saving Version");
        List<Variables> allVar = new ArrayList<>();
        List<Variables> allVar3 = new ArrayList<>();
        Map<String, List<Variables>> map;
        map = customMappings(version, currentHospital, versionObject, harmonizedVersion);
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

        VariablesXLSX_JSON.Node testTree = variablesXLSX_json.createTree(allVar);
        //Select last Version of the CDEs : TO BE CHANGED!!! We have to parameterize the version it takes ********
        Versions lastVersion = versionDAO.getLastCdeVersion();
        System.out.println("cde variables found : "+ cdeVariableDAO.findCDEVariablesByVersionId(lastVersion.getVersion_id()).size());
        List<CDEVariables> cdeVars = cdeVariableDAO.findCDEVariablesByVersionId(lastVersion.getVersion_id());
        //******** ********* ********* **** TO BE CHANGED!!! ******** ********* ********* ********* ******** ***
        version.setJsonString(variablesXLSX_json.createJSONMetadataWithCDEs(allVar, cdeVars).toString());
        version.setJsonStringVisualizable(variablesXLSX_json.createJSONVisualization(testTree).toString());
        version.setVariables(allVar2);
        versionDAO.saveVersion(version);

        List<CDEVariables> cdeVariables = new ArrayList<>();
        for(CDEVariables cdevar : versionDAO.getLastCdeVersion().getCdevariables()){
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

    public Map<String,List<Variables>> customMappings(Versions version, Hospitals currentHospital, JSONObject versionObject, Versions harmonizedVersion) {
        List<Variables> xlsxVars = new ArrayList<>();
        List<Variables> xlsxHarmonizedVars = new ArrayList<>();//<harmonizedVariables>
        //String mapFunction = null;
        System.out.println("Inside custom mapping");

        JSONArray variablesJsonArray = versionObject.getJSONArray("variables");
        for (int i = 0; i < variablesJsonArray.length(); i++) {
            Variables newVar = new Variables();
            JSONObject variableJsonObject = variablesJsonArray.getJSONObject(i);
            System.out.println("Adding name to variable: " + variableJsonObject.toString());
            newVar.setName(variableJsonObject.get("name").toString());
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


            if (variableJsonObject.get("mapCDE").toString() != "" && !variableJsonObject.get("mapCDE").toString().isEmpty()
            && variableJsonObject.get("mapCDE") != null) {
                if (variableJsonObject.get("mapCDE").toString().contains(",")) {

                    newVar = uploadVariables.mappingToMultipleCdes(variableJsonObject.get("mapCDE").toString(), variableJsonObject.get("mapFunction").toString(), newVar, version, currentHospital);

                } else {

                    newVar = uploadVariables.mappingToSingleCde(variableJsonObject.get("mapCDE").toString(), variableJsonObject.get("mapFunction").toString(), newVar, version, currentHospital);
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
