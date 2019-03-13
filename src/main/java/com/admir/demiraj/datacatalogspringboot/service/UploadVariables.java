package com.admir.demiraj.datacatalogspringboot.service;

import antlr.StringUtils;
import com.admir.demiraj.datacatalogspringboot.dao.*;
import com.admir.demiraj.datacatalogspringboot.resources.*;
import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UploadVariables {

    private static final String FOLDER_NAME = System.getProperty("user.dir") + "/src/main/resources/data/variables/";

    @Autowired
    private HospitalDAO hospitalDAO;

    @Autowired
    private VersionDAO versionDAO;

    @Autowired
    private VariableDAO variableDAO;

    @Autowired
    private CDEVariableDAO cdeVariableDAO;

    @Autowired
    private VariablesXLSX_JSON variablesXLSX_json;

    @Autowired
    private FunctionsDAO functionsDAO;


    public void readExcelFile() {
        File folder = new File(FOLDER_NAME);
        // Get all the files from the folder
        File[] listOfFiles = folder.listFiles();
        for (int i = 0; i < listOfFiles.length; i++) {
            if (listOfFiles[i].isFile()) {
                //Split the file name in hospital_name and version_name
                String fileName = listOfFiles[i].getName();
                String filePath = FOLDER_NAME + fileName;
                String[] parts = fileName.split("_");
                String hospitalName = parts[0];
                String[] parts2 = parts[1].toString().split("\\.");
                String versionName = parts2[0];
                Hospitals currentHospital = hospitalDAO.getHospitalByName(hospitalName);
                //The hospital exists
                if (currentHospital != null) {
                    System.out.println("The hospital exists");
                    //The version is present at hospital
                    if (versionDAO.isVersionNameInHospital(versionName, hospitalName)) {
                        System.out.println("The version : " + versionName + " is already present at : " + hospitalName);
                        System.out.println("The file : " + listOfFiles[i].getName() + " won't be saved");
                        //The version isn't present at hospital
                    } else {
                        createVersion(versionName, filePath, currentHospital);
                    }


                    //The hospital doesn't exist
                } else {
                    //generateConceptPathFromMapping(filePath);
                    Hospitals createdHospital = new Hospitals(hospitalName);
                    //hospitalDAO.save(createdHospital);//////check this
                    createVersion(versionName, filePath, createdHospital);

                }
            }
        }
    }


    public void createVersion(String versionName, String filePath, Hospitals currentHospital) {
        Versions version = new Versions(versionName);
        Versions harmonizedVersion = new Versions(versionName+"-harmonized");
        ///////////////////////////////////////////////////
        System.out.println("Saving Version");
        List<Variables> allVar = new ArrayList<>();
        List<Variables> allVar3 = new ArrayList<>();
        Map<String,List<Variables>> map;
        try {
            map = Read_xlsx(filePath, version, currentHospital, harmonizedVersion);
            allVar =  map.get("variables");
            allVar3 =  map.get("hvariables");
        } catch (FileNotFoundException fnfe) {
            System.err.println("Xlsx not found...!!!");
        } catch (IOException io) {
            System.err.println("Problem with the xlsx...");
        }

        List<Variables> allVar2 = new ArrayList<>();
        for (Variables var : allVar) {
            if (var.getHospital() != null && var.getCode() != null) {
                allVar2.add(var);
            }
        }



// allvar contains all local variables. allvar3 contains only the variables that are not mapped to cdes
        VariablesXLSX_JSON.Node testTree = variablesXLSX_json.createTree(allVar);
        System.out.println("Retrieving jsonString from file");
        version.setJsonString(variablesXLSX_json.createJSONMetadataWithCDEs(allVar).toString());
        System.out.println("Retrieving jsonStringVisualizable from file");
        version.setJsonStringVisualizable(variablesXLSX_json.createJSONVisualization(testTree).toString());
        version.setVariables(allVar2);
        versionDAO.saveVersion(version);


        //harmonizedVersion.setCdevariables(versionDAO.getLastCdeVersion().getCdevariables());
        List<CDEVariables> cdeVariables = new ArrayList<>();
        for(CDEVariables cdevar : versionDAO.getLastCdeVersion().getCdevariables()){
            cdevar.setVersions2(harmonizedVersion);
            cdeVariables.add(cdevar);
        }

        harmonizedVersion.setCdevariables(cdeVariables);
        harmonizedVersion.setVariables(allVar3);
        versionDAO.saveVersion(harmonizedVersion);

    }


    /**
     * Method that reads each cell of the excel file and saves their values in a new variable. Each row is referring to
     * a new variable and each column to a variable attribute. After the mapping, we save the variable and all connected
     * tables. Finally, we return a list with all variables found.
     */
    public Map<String,List<Variables>> Read_xlsx(String ff, Versions version, Hospitals hospital, Versions harmonizedVersion) throws IOException {
        List<Variables> xlsxVars = new ArrayList<>();//<Variables>
        List<Variables> xlsxHarmonizedVars = new ArrayList<>();//<harmonizedVariables>
        FileInputStream fis = null;
        fis = new FileInputStream(ff);
        Workbook workbook = null;
        try {
            workbook = WorkbookFactory.create(fis);
        } catch (InvalidFormatException | EncryptedDocumentException ex) {
            System.err.println("Smthing went wrong.........");
        }
        Sheet sheet = workbook.getSheetAt(0);
        Iterator rowIterator = sheet.iterator();
        while (rowIterator.hasNext()) {
            Row row = (Row) rowIterator.next();
            if (row.getRowNum() == 0)
                continue;//first row has column names
            Iterator cellIterator = row.cellIterator();
            Variables newVar = new Variables();
            String mapFunction = null; // keep the value of the mapping function if it is not present
            boolean isVariableSaved = false; //check if the variable is saved during the cell iteration
            while (cellIterator.hasNext()) {
                Cell cell = (Cell) cellIterator.next();
                if (cell.getColumnIndex() == 0) //
                {
                    newVar.setCsvFile(cell.getStringCellValue());
                } else if (cell.getColumnIndex() == 1)
                    newVar.setName(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 2){
                    if(cell.getStringCellValue()==null || cell.getStringCellValue().isEmpty()){
                        break;
                    }else{
                        newVar.setCode(cell.getStringCellValue());
                    }

                }

                else if (cell.getColumnIndex() == 3)
                    newVar.setType(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 4)
                    newVar.setValues(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 5)
                    newVar.setUnit(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 6)
                    newVar.setCanBeNull(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 7)
                    newVar.setDescription(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 8)
                    newVar.setComments(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 9)
                    newVar.setConceptPath(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 10)
                    newVar.setMethodology(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 11) {
                    String cc11 = cell.getStringCellValue();
                    if (cc11 != null) {
                        mapFunction = cc11;
                    } // keep the cell value only if the cell has value
                } else if (cell.getColumnIndex() == 12) {

                    String cc12 = cell.getStringCellValue();
                    System.out.println("THE c12 CELL CONTAINS: " + cc12);
                    // The comma indicates that the user is inserting multiple elements
                    cc12 = cc12.replaceAll("\\s+","");
                    System.out.println("THE c12 CELL CONTAINS: " + cc12);
                    if (!cc12.equals("")) {
                        if (cc12.contains(",")) {
                            newVar = mappingToMultipleCdes(cc12, mapFunction, newVar, version, hospital);
                            isVariableSaved = true;
                        } else {
                            newVar = mappingToSingleCde(cc12, mapFunction, newVar, version, hospital);
                            isVariableSaved = true;
                        }
                    } else {//cell is empty
                        variableDAO.saveVersionToVariable(newVar, harmonizedVersion);
                        variableDAO.saveVersionToVariable(newVar, version);

                        List<Variables> hospVar = hospital.getVariables();
                        hospVar.add(newVar);
                        hospital.setVariables(hospVar);
                        hospitalDAO.save(hospital);
                        newVar.setHospital(hospital);
                        variableDAO.save(newVar);
                        isVariableSaved = true;

                        ////
                        xlsxHarmonizedVars.add(newVar);
                    }

                }
                System.out.println("this column index is : " + cell.getColumnIndex());

            }
            // Check if the variable already saved. If not save it. It might have not been saved if the 'mapFunction'
            //and 'mapCDE' are null and thus there is no 'cell.getColumnIndex()' for them.
            if (!isVariableSaved && newVar.getCode() != null && newVar.getCode() != "") {
                System.out.println("Variable: "+newVar.getVariable_id()+newVar.getCode()+" is not saved.");
                variableDAO.saveVersionToVariable(newVar, harmonizedVersion);
                variableDAO.saveVersionToVariable(newVar, version);
                //////////////////////////////
                //variableDAO.saveVersionToVariable(newVar, harmonizedVersion);
                /////////////////////////////////
                List<Variables> hospVar = hospital.getVariables();
                hospVar.add(newVar);
                hospital.setVariables(hospVar);
                hospitalDAO.save(hospital);
                newVar.setHospital(hospital);
                variableDAO.save(newVar);

                /////
                xlsxHarmonizedVars.add(newVar);
            }else{
                System.out.println("Variable: "+newVar.getVariable_id()+newVar.getCode()+" is already saved.");
            }

            xlsxVars.add(newVar);


        }
        Map<String,List<Variables>> map =new HashMap();
        map.put("variables",xlsxVars);
        map.put("hvariables",xlsxHarmonizedVars);
        return map;
    }


    /**
     * Method that maps a single variable to multiple CDEs. First extract from the file all mapping functions and mapping
     * CDEs. Then search in the database for the CDEs. Finally, link all tables and save them.
     */
    public Variables mappingToMultipleCdes(String cc12, String cc11, Variables newVar, Versions version, Hospitals hospital) {
        System.out.println("MAPPING TO MULTIPLE CDEs");
        Pattern p = Pattern.compile("\\[(.*?)\\]");
        Matcher m = p.matcher(cc11);
        cc12 = cc12.replaceAll("\\s+", "");
        String[] cc12Parts = cc12.split(",");
        List<String> cc11Parts = new ArrayList<>();
        while (m.find()) {
            cc11Parts.add(m.group(1));
        }


        List<Variables> allVariables = new ArrayList<>();
        List<Functions> allFunctions = new ArrayList<>();
        List<CDEVariables> allCdeVariables = new ArrayList<>();
        for (int i = 0; i < cc11Parts.size(); i++) {
            CDEVariables cde = cdeVariableDAO.getCDEVariableByCode(cc12Parts[i]);
            if (cde != null) {
                System.out.println("The cdevariable has been retrieved " + cde + "and has concept path of:" + cde.getConceptPath());
                Functions functions = new Functions();
                allFunctions.add(functions);
                allCdeVariables.add(cde);

            }
        }
        if (allCdeVariables.size() > 0) {
            newVar.setFunction(allFunctions);
            String cpath = allCdeVariables.get(0).getConceptPath();////////////////////////////one
            cpath = cpath.substring(0, cpath.lastIndexOf("/")) + "/" + newVar.getCode();
            newVar.setConceptPath(cpath);
            newVar = variableDAO.compareVariables(newVar, cc11Parts, cc12Parts);
            List<Versions> currentVersions = newVar.getVersions();
            currentVersions.add(version);
            newVar.setVersions(currentVersions);
            List<Variables> hospVar = hospital.getVariables();
            hospVar.add(newVar);
            hospital.setVariables(hospVar);
            hospitalDAO.save(hospital);
            newVar.setHospital(hospital);
            variableDAO.save(newVar);
            System.out.println("SAVED VARIABLE TO DATABASE");
            allVariables.add(newVar);

            List<Functions> cdeFunctions = new ArrayList<>();
            for (int i = 0; i < allCdeVariables.size(); i++) {
                allFunctions.get(i).setVariables(allVariables);
                allFunctions.get(i).setRule(cc11Parts.get(i));
                List<CDEVariables> acde = new ArrayList<>();
                acde.add(allCdeVariables.get(i));
                allFunctions.get(i).setCdeVariables(acde);
                System.out.println("LINKED FUNCTIONS WITH VARIABLES AND CDEVARIABLES");

                cdeFunctions = new ArrayList<>(allCdeVariables.get(i).getFunction());
                cdeFunctions.add(allFunctions.get(i));
                allCdeVariables.get(i).setFunction(cdeFunctions);
                System.out.println("LINKED CDEVARIABLES WITH FUNCTIONS");


                functionsDAO.save(allFunctions.get(i));
                System.out.println("SAVED FUNCTION TO DATABASE");
                cdeVariableDAO.save(allCdeVariables.get(i));
                System.out.println("SAVED CDEVARIABLE TO DATABASE");

            }
        } else {//no cdes were found
            System.out.println("The cdevariable with name: " + cc12 + "does no exist.We cannot create a mapping function");
            newVar = variableDAO.compareVariables(newVar,cc11Parts,cc12Parts);
            List<Versions> currentVersions = newVar.getVersions();
            currentVersions.add(version);
            newVar.setVersions(currentVersions);
            List<Variables> hospVar = hospital.getVariables();
            hospVar.add(newVar);
            hospital.setVariables(hospVar);
            hospitalDAO.save(hospital);
            newVar.setHospital(hospital);
            variableDAO.save(newVar);
        }


        return newVar;

    }

    /**
     * Method that maps a variable to a CDEs. First extract from the file the mapping function and the mapping
     * CDE. Then search in the database for the CDE. Finally, link all tables and save them.
     */
    public Variables mappingToSingleCde(String cc12, String cc11, Variables newVar, Versions version, Hospitals hospital) {
        System.out.println("MAPPING TO A SINGLE CDE");
        //Since we have a single mapping we should create the LIst containing only one element
        List<String> cc11Parts = new ArrayList<>();
        cc11Parts.add(cc11);
        String[] cc12Parts = new String[100];
        cc12Parts[0] = cc12;
        ////////////////////////////////////////////
        ////////////////////////////////////////////

        CDEVariables cde = cdeVariableDAO.getCDEVariableByCode(cc12);
        if (cde != null) { //the cde variable exists
            System.out.println("The cdevariable has been retrieved and has concept path of:" + cde.getConceptPath());
            Functions functions = new Functions();


            newVar = variableDAO.compareVariables(newVar, cc11Parts,cc12Parts);
            List<Variables> allVariables = new ArrayList<>();
            List<Functions> allFunctions = new ArrayList<>();
            List<CDEVariables> allCdeVariables = new ArrayList<>();

            allVariables.add(newVar);
            allCdeVariables.add(cde);


            newVar.setHospital(hospital);

            functions.setVariables(allVariables);
            functions.setRule(cc11);
            functions.setCdeVariables(allCdeVariables);
            allFunctions.add(functions);

            newVar.setFunction(allFunctions);

            String cpath = cde.getConceptPath();////////////////////////////two
            if (cpath != null) {
                cpath = cpath.substring(0, cpath.lastIndexOf("/")) + "/" + newVar.getCode();
                newVar.setConceptPath(cpath);
            } else {
                System.out.println("The cde without concept path is: " + cde.getCode());
            }


            List<Functions> cdeFunctions = cde.getFunction();
            cdeFunctions.add(functions);
            cde.setFunction(cdeFunctions);

            List<Versions> currentVersions = newVar.getVersions();
            currentVersions.add(version);
            newVar.setVersions(currentVersions);

            List<Variables> hospVar = hospital.getVariables();
            hospVar.add(newVar);
            hospital.setVariables(hospVar);
            hospitalDAO.save(hospital);
            newVar.setHospital(hospital);
            variableDAO.save(newVar);
            cdeVariableDAO.save(cde);
            functionsDAO.save(functions);

        } else {
            System.out.println("newVar before comparison: " + newVar.getCode());
            newVar = variableDAO.compareVariables(newVar,cc11Parts,cc12Parts);
            System.out.println("newVar after comparison: " + newVar.getCode());
            List<Versions> currentVersions = newVar.getVersions();
            currentVersions.add(version);
            newVar.setVersions(currentVersions);
            System.out.println("The cdevariable with name: " + cc12 + "does no exist.We cannot create a mapping function");
            hospital.setVariablesOneByOne(newVar);
            hospitalDAO.save(hospital);
            newVar.setHospital(hospital);
            variableDAO.save(newVar);
        }
        return newVar;
    }


    /**Method that given a list of variables and a harmonized version includes that variable in the version*/
    public void includeVariableInHarmonizedVersion(List<Variables> allVar3, Versions harmonizedVersion){
        List<CDEVariables> allCdeVariablesInVersion = harmonizedVersion.getCdevariables();

    }

    /**Method that given the name of the previous version creates a harmonized version with all the latest cdes*/
    public Versions createHarmonizedVersion(String normalVersionName){
        String harmonizedVersionName = normalVersionName + "-harmonized";
        Versions harmonizedVersion = new Versions(harmonizedVersionName);
        Versions latestCdeVersion = versionDAO.getLastCdeVersion();
        List<CDEVariables> allCDEVariables = latestCdeVersion.getCdevariables();
        for(CDEVariables cdevar : allCDEVariables){
            cdeVariableDAO.saveVersionToCDEVariable(cdevar, harmonizedVersion);
            cdeVariableDAO.save(cdevar);
        }
        harmonizedVersion.setCdevariables(allCDEVariables);
        //versionDAO.saveVersion(harmonizedVersion);
        return harmonizedVersion;
    }
}
