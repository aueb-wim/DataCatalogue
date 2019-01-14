package com.admir.demiraj.datacatalogspringboot.service;

import com.admir.demiraj.datacatalogspringboot.dao.*;
import com.admir.demiraj.datacatalogspringboot.resources.*;
import jdk.nashorn.internal.objects.annotations.Function;
import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.Version;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.omg.Messaging.SYNC_WITH_TRANSPORT;
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

    public void createVersion(String versionName, String filePath, Hospitals currentHospital) {
        //generateConceptPathFromMapping(filePath);
        Versions version = new Versions(versionName);
        System.out.println("Saving Version");
        Set<Variables> allVar = new HashSet<>();
        try {
            allVar = Read_xlsx(filePath, version, currentHospital);
        } catch (FileNotFoundException fnfe) {
            System.err.println("Xlsx not found...!!!");
        } catch (IOException io) {
            System.err.println("Problem with the xlsx...");
        }

        for (Variables var : allVar) {
            System.out.println("Code : " + var.getCode() + " Concept path : " + var.getConceptPath());
        }


        VariablesXLSX_JSON.Node testTree = variablesXLSX_json.createTree(allVar);
        System.out.println("Retrieving jsonString from file");
        //version.setJsonString(variablesXLSX_json.createJSONMetadata(testTree).toString());
        version.setJsonString(variablesXLSX_json.createJSONMetadataWithCDEs(allVar).toString());
        System.out.println("Retrieving jsonStringVisualizable from file");
        version.setJsonStringVisualizable(variablesXLSX_json.createJSONVisualization(testTree).toString());
        versionDAO.saveVersion(version);

    }

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
                    hospitalDAO.save(createdHospital);
                    createVersion(versionName, filePath, createdHospital);
                }
            }
        }
    }


    public Set<Variables> Read_xlsx(String ff, Versions version, Hospitals hospital) throws IOException {
        Set<Variables> xlsxVars = new HashSet<>();//<Variables>
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
            while (cellIterator.hasNext()) {
                Cell cell = (Cell) cellIterator.next();
                if (cell.getColumnIndex() == 0) //
                {
                    newVar.setCsvFile(cell.getStringCellValue());
                } else if (cell.getColumnIndex() == 1)
                    newVar.setName(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 2)
                    newVar.setCode(cell.getStringCellValue());
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
                    if (cc12 != "") {
                        if(cc12.contains(",")){
                            newVar = mappingToMultipleCdes(cc12, mapFunction, newVar, version, hospital);
                        }else{
                            newVar = mappingToSingleCde(cc12, mapFunction, newVar, version, hospital);
                        }
                    }else{//cell is empty
                        variableDAO.saveVersionToVariable(newVar, version);
                        variableDAO.saveHospitalToVariable(newVar, hospital);
                        variableDAO.save(newVar);
                    }

                }


            }
            xlsxVars.add(newVar);


        }
        System.out.println("********* Total of " + xlsxVars.size() + " XLSX elements **********");
        return xlsxVars;
    }




    public Variables mappingToMultipleCdes( String cc12, String cc11, Variables newVar, Versions version, Hospitals hospital) {
        System.out.println("MAPPING TO MULTIPLE CDES");

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
                System.out.println("i is : " + i + "cc11Parts : " + cc11Parts.get(i) + "cc12Parts: " + cc12Parts[i]);
                if (cde != null) {
                    System.out.println("The cdevariable has been retrieved " + cde + "and has concept path of:" + cde.getConceptPath());
                    Functions functions = new Functions();
                    allFunctions.add(functions);
                    allCdeVariables.add(cde);

                }
            }
            System.out.println("THE SIZE OF THE ALLCDEVARIABLES IS : " + allCdeVariables.size());
            if (allCdeVariables.size() > 0) {
                newVar.setFunction(allFunctions);
                String cpath = allCdeVariables.get(0).getConceptPath();////////////////////////////one
                cpath = cpath.substring(0, cpath.lastIndexOf("/"))+"/"+newVar.getCode();
                newVar.setConceptPath(cpath);
                newVar.setVersions(version);
                newVar.setHospital(hospital);
                variableDAO.save(newVar);
                System.out.println("SAVED VARIABLE TO DATABASE");
                allVariables.add(newVar);

                List<Functions> cdeFunctions = new ArrayList<>();
                for (int i = 0; i < allCdeVariables.size(); i++) {
                        System.out.println("ITERATION: " + i);
                        allFunctions.get(i).setVariables(allVariables);
                        allFunctions.get(i).setRule(cc11Parts.get(i));
                        List<CDEVariables> acde = new ArrayList<>();
                        acde.add(allCdeVariables.get(i));
                        allFunctions.get(i).setCdeVariable(acde);
                        System.out.println("LINKED FUNCTIONS WITH VARIABLES AND CDEVARIABLES");

                        cdeFunctions = new ArrayList<>(allCdeVariables.get(i).getFunction());
                        System.out.println("BLOCK: " + 1);
                        cdeFunctions.add(allFunctions.get(i));
                        System.out.println("BLOCK: " + 2);
                        allCdeVariables.get(i).setFunction(cdeFunctions);
                        System.out.println("BLOCK: " + 3);
                        //allCdeVariables.get(i).setFunction(allCdeVariables.get(i).getFunction().add(allFunctions.get(i)));
                        //cdeFunctions = allCdeVariables.get(i).getFunction();
                        System.out.println("LINKED CDEVARIABLES WITH FUNCTIONS");


                        functionsDAO.save(allFunctions.get(i));
                        System.out.println("SAVED FUNCTION TO DATABASE");
                        cdeVariableDAO.save(allCdeVariables.get(i));
                        System.out.println("SAVED CDEVARIABLE TO DATABASE");

                }
            }else{//no cdes were found
                    System.out.println("The cdevariable with name: "+ cc12 +"does no exist.We cannot create a mapping function");
                    variableDAO.saveVersionToVariable(newVar, version);
                    variableDAO.saveHospitalToVariable(newVar, hospital);
                    variableDAO.save(newVar);
            }


        return newVar;

    }

    public Variables mappingToSingleCde( String cc12, String cc11, Variables newVar, Versions version, Hospitals hospital) {
        System.out.println("MAPPING TO A SINGLE CDE");

        CDEVariables cde = cdeVariableDAO.getCDEVariableByCode(cc12);
        if (cde != null) { //the cde variable exists
            System.out.println("The cdevariable has been retrieved and has concept path of:" + cde.getConceptPath());
            Functions functions = new Functions();

            List<Variables> allVariables = new ArrayList<>();
            List<Functions> allFunctions = new ArrayList<>();
            List<CDEVariables> allCdeVariables = new ArrayList<>();

            allVariables.add(newVar);
            allCdeVariables.add(cde);

            functions.setVariables(allVariables);
            functions.setRule(cc11);
            functions.setCdeVariable(allCdeVariables);
            allFunctions.add(functions);

            newVar.setFunction(allFunctions);

            String cpath = cde.getConceptPath();////////////////////////////two
            cpath = cpath.substring(0, cpath.lastIndexOf("/"))+"/"+newVar.getCode();
            newVar.setConceptPath(cpath);

            List<Functions> cdeFunctions = cde.getFunction();
            cdeFunctions.add(functions);
            cde.setFunction(cdeFunctions);

            variableDAO.saveVersionToVariable(newVar, version);
            variableDAO.saveHospitalToVariable(newVar, hospital);
            variableDAO.save(newVar);
            cdeVariableDAO.save(cde);
            functionsDAO.save(functions);

        }else{
            System.out.println("The cdevariable with name: "+ cc12 +"does no exist.We cannot create a mapping function");
            variableDAO.saveVersionToVariable(newVar, version);
            variableDAO.saveHospitalToVariable(newVar, hospital);
            variableDAO.save(newVar);
        }
        return newVar;
    }

}
