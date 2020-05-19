package com.admir.demiraj.datacatalogspringboot.service;

import com.admir.demiraj.datacatalogspringboot.dao.*;
import com.admir.demiraj.datacatalogspringboot.resources.CDEVariables;
import com.admir.demiraj.datacatalogspringboot.resources.Pathology;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

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

    @Autowired
    private PathologyDAO pathologyDAO;



    public void mapCdeVersion(JSONArray jr){
        // the filePath is used in order to move a file in the error folder in a case an error occurs. In this case no
        // file exists since we create a version from the GUI, so we just add an empty filePath and no move should be made
        String filePath = "";
        String pathologyName = jr.getString(0);
        String versionName = jr.getString(1);
        JSONObject versionJsonObject = jr.getJSONObject(2);

        //The cdeversion already exists
        Versions version;
        // Edit mode decides whether we should delete a version when an error occurs. We don't want to delete a version
        // that already exists and it just happens to have some issue when updating it.
        Boolean editMode = false;
                if(pathologyDAO.isCdeVersionPrentInPathology(pathologyName,versionName)){
                   // If the version already exists. Then delete the cde variables within the version and we change the new fields.
                     version = versionDAO.getVersionById(versionJsonObject.getBigInteger("version_id"));
                     versionDAO.deleteCdeVariablesFromVersion(version);
                    editMode = true;

                }else{
                    version = new Versions(versionName);
                }

                    //Versions version = new Versions(versionName);
                    List<CDEVariables> cdeVariables = customMappings(version, versionJsonObject);
                    System.out.println("Retrieving node from file");
                    //VariablesXLSX_JSON.Node node = variablesXLSX_json.createTree(filePath);
                    variablesXLSX_json.version = version;
                    variablesXLSX_json.editMode = editMode;
                    VariablesXLSX_JSON.Node node = variablesXLSX_json.createTree3(cdeVariables);
                    System.out.println("Retrieving jsonString from file");
                    version.setJsonString(variablesXLSX_json.createJSONMetadata(node).toString());
                    System.out.println("Retrieving jsonStringVisualizable from file");
                    version.setJsonStringVisualizable(variablesXLSX_json.createJSONVisualization(node).toString());
                    System.out.println("Saving Version");

                    Pathology pathology = pathologyDAO.getPathologyByName(pathologyName);
                    List<Versions> pathologyVersions = pathology.getVersions();
                    pathologyVersions.add(version);
                    pathology.setVersions(pathologyVersions);
                    pathologyDAO.save(pathology);

                    version.setPathology(pathology);
                    versionDAO.saveVersion(version);



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
    versionDAO.saveVersion(version);
    cdeVariableDAO.save(newVar);
    xlsxVars.add(newVar);
}else{
    cdeVariableDAO.saveVersionToCDEVariable(newVar2, version);
    versionDAO.saveVersion(version);
    cdeVariableDAO.save(newVar);
    xlsxVars.add(newVar2);
}


        }
        return xlsxVars;

    }
}
