package com.admir.demiraj.datacatalogspringboot.service;

import com.admir.demiraj.datacatalogspringboot.dao.CDEVariableDAO;
import com.admir.demiraj.datacatalogspringboot.dao.HospitalDAO;
import com.admir.demiraj.datacatalogspringboot.dao.VariableDAO;
import com.admir.demiraj.datacatalogspringboot.dao.VersionDAO;
import com.admir.demiraj.datacatalogspringboot.resources.CDEVariables;
import com.admir.demiraj.datacatalogspringboot.resources.Hospitals;
import com.admir.demiraj.datacatalogspringboot.resources.Variables;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CustomMapperCDEs {

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



    public void mapCdeVersion(JSONArray jr){
        String versionName = jr.getString(0);
        JSONObject versionJsonObject = jr.getJSONObject(1);

        //The cdeversion already exists
                if(cdeVariableDAO.isCdeVersionPresent(versionName)){
                    System.out.println("This version already exists");
                    //The cdeversion does not exist
                }else{

                    Versions version = new Versions(versionName);
                    List<CDEVariables> cdeVariables = customMappings(version, versionJsonObject);
                    System.out.println("Retrieving node from file");
                    //VariablesXLSX_JSON.Node node = variablesXLSX_json.createTree(filePath);
                    VariablesXLSX_JSON.Node node = variablesXLSX_json.createTree3(cdeVariables);
                    System.out.println("Retrieving jsonString from file");
                    version.setJsonString(variablesXLSX_json.createJSONMetadata(node).toString());
                    System.out.println("Retrieving jsonStringVisualizable from file");
                    version.setJsonStringVisualizable(variablesXLSX_json.createJSONVisualization(node).toString());
                    System.out.println("Saving Version");
                    versionDAO.saveVersion(version);

                }

    }





    public List<CDEVariables> customMappings(Versions version, JSONObject versionObject) {
        List<CDEVariables> xlsxVars = new ArrayList<>();

        System.out.println("Inside custom cde mapping");
        JSONArray variablesJsonArray = versionObject.getJSONArray("cdevariables");
        for (int i = 0; i < variablesJsonArray.length(); i++) {
            CDEVariables newVar = new CDEVariables();
            JSONObject variableJsonObject = variablesJsonArray.getJSONObject(i);
            newVar.setCsvFile(variableJsonObject.get("csvFile").toString());
            newVar.setName(variableJsonObject.get("name").toString());
            newVar.setCode(variableJsonObject.get("code").toString());
            newVar.setType(variableJsonObject.get("type").toString());
            newVar.setValues(variableJsonObject.get("values").toString());
            newVar.setUnit(variableJsonObject.get("unit").toString());
            newVar.setCanBeNull(variableJsonObject.get("canBeNull").toString());
            newVar.setDescription(variableJsonObject.get("description").toString());
            newVar.setComments(variableJsonObject.get("comments").toString());
            newVar.setComments(variableJsonObject.get("comments").toString());
            newVar.setConceptPath(variableJsonObject.get("conceptPath").toString());

            //check if the cde variable already exists and if yes retrieve it from the database
           CDEVariables newVar2 = cdeVariableDAO.compareVariableAttributes(newVar);
if(newVar2 == null){
    cdeVariableDAO.saveVersionToCDEVariable(newVar, version);
    cdeVariableDAO.save(newVar);
    xlsxVars.add(newVar);
}else{
    cdeVariableDAO.saveVersionToCDEVariable(newVar2, version);
    cdeVariableDAO.save(newVar);
    xlsxVars.add(newVar2);
}


        }
        return xlsxVars;

    }
}
