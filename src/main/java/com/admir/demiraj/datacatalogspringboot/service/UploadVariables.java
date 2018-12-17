package com.admir.demiraj.datacatalogspringboot.service;

import com.admir.demiraj.datacatalogspringboot.dao.*;
import com.admir.demiraj.datacatalogspringboot.resources.*;
import jdk.nashorn.internal.objects.annotations.Function;
import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.*;

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

public void createVersion(String versionName, String filePath, Hospitals currentHospital){
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

    for(Variables var : allVar){
        System.out.println("Code : "+var.getCode()+ " Concept path : "+var.getConceptPath());
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
                        createVersion(versionName,filePath,currentHospital);
                    }


                    //The hospital doesn't exist
                } else {
                    //generateConceptPathFromMapping(filePath);
                    Hospitals createdHospital = new Hospitals(hospitalName);
                    hospitalDAO.save(createdHospital);
                    createVersion(versionName,filePath,createdHospital);
                }
            }
        }
    }



    public Set<Variables> Read_xlsx(String ff, Versions version, Hospitals hospital) throws IOException
    {
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
        while (rowIterator.hasNext())
        {
            Row row = (Row) rowIterator.next();
            if (row.getRowNum() == 0)
                continue;//first row has column names
            Iterator cellIterator = row.cellIterator();
            Variables newVar = new Variables();
            String mapFunction = null; // keep the value of the mapping function if it is not present
            while (cellIterator.hasNext())
            {
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
                else if (cell.getColumnIndex() == 11){
                    String cc11 = cell.getStringCellValue();
                    if(cc11 != null){ mapFunction = cc11; } // keep the cell value only if the cell has value
                }
                else if (cell.getColumnIndex() == 12){

                    String cc12 = cell.getStringCellValue();
                    System.out.println("THE c12 CELL CONTAINS: "+cc12);
                    if(cc12 != ""){
                        CDEVariables cde = cdeVariableDAO.getCDEVariableByName(cc12);
                        if(cde != null){ //the cde variable exists
                            System.out.println("The cdevariable has been retrieved "+cde+"and has concept path of:"+cde.getConceptPath());
                            Functions functions = new Functions();

                            //append in the excel cell the concept path
                            //row.getCell(9, Row.CREATE_NULL_AS_BLANK).setCellValue(cde.getConceptPath());
                            List<Variables> allVariables = new ArrayList<>();
                            List<Functions> allFunctions = new ArrayList<>();
                            List<CDEVariables> allCdeVariables = new ArrayList<>();

                            // functions takes a list of variables to express the many-2-many relationship
                            allVariables.add(newVar);
                            allCdeVariables.add(cde);

                            functions.setVariables(allVariables);
                            functions.setRule(mapFunction);
                            functions.setCdeVariable(allCdeVariables);
                            // variables takes a list of functions to express the many-2-many relationship
                            allFunctions.add(functions);

                            newVar.setFunction(allFunctions);
                            //make the variable have the same conceptPath as the cde equivalent
                            newVar.setConceptPath(cde.getConceptPath());

                            List <Functions> cdeFunctions = cde.getFunction();
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
                    }else{
                        variableDAO.saveVersionToVariable(newVar, version);
                        variableDAO.saveHospitalToVariable(newVar, hospital);
                        variableDAO.save(newVar);
                    }

                }


            }
            xlsxVars.add(newVar);


        }
        System.out.println("********* Total of "+xlsxVars.size()+" XLSX elements **********");
        return xlsxVars;
    }

}



/*

    public void readExcelFile(){
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
                if(currentHospital != null){
                    System.out.println("The hospital exists");
                    //The version is present at hospital
                   if(versionDAO.isVersionNameInHospital(versionName, hospitalName)){
                       System.out.println("The version : " + versionName + " is already present at : " + hospitalName);
                       System.out.println("The file : " + listOfFiles[i].getName() + " won't be saved");
                   //The version isn't present at hospital
                   }else{
                       //generateConceptPathFromMapping(filePath);
                       Versions version = new Versions(versionName);
                       Set<Variables> allVar = new HashSet<>();
                       try{
                           allVar = variablesXLSX_json.Read_xlsx(filePath);
                       }catch (FileNotFoundException fnfe)
                       {   System.err.println("Xlsx not found...!!!");
                       }
                       catch (IOException io)
                       {   System.err.println("Problem with the xlsx...");
                       }
                       VariablesXLSX_JSON.Node testTree = variablesXLSX_json.createTree(allVar);
                       System.out.println("Retrieving jsonString from file");
                       version.setJsonString(variablesXLSX_json.createJSONMetadata(testTree).toString());
                       System.out.println("Retrieving jsonStringVisualizable from file");
                       version.setJsonStringVisualizable(variablesXLSX_json.createJSONVisualization(testTree).toString());
                   }



                       System.out.println("Retrieving node from file");

                       VariablesXLSX_JSON.Node node = variablesXLSX_json.loadXLSXInMemory(filePath);
                       System.out.println("Retrieving jsonString from file");
                       version.setJsonString(variablesXLSX_json.createJSONMetadata(node).toString());
                       System.out.println("Retrieving jsonStringVisualizable from file");
                       version.setJsonStringVisualizable(variablesXLSX_json.createJSONVisualization(node).toString());

                       System.out.println("Saving Version");
                       versionDAO.saveVersion(version);

                       readExcelSaveToVariabe(filePath, version, currentHospital);

                   }
                //The hospital doesn't exist
                }else{
                    //generateConceptPathFromMapping(filePath);
                    Hospitals createdHospital = new Hospitals(hospitalName);
                    hospitalDAO.save(createdHospital);

                    Versions version = new Versions(versionName);

                    System.out.println("Retrieving node from file");
                    VariablesXLSX_JSON.Node node = variablesXLSX_json.loadXLSXInMemory(filePath);
                    System.out.println("Retrieving jsonString from file");
                    version.setJsonString(variablesXLSX_json.createJSONMetadata(node).toString());
                    System.out.println("Retrieving jsonStringVisualizable from file");
                    version.setJsonStringVisualizable(variablesXLSX_json.createJSONVisualization(node).toString());
                    System.out.println("Saving Version");

                    versionDAO.saveVersion(version);

                    readExcelSaveToVariabe(filePath, version, createdHospital);

                }


            }
        }

    }

    */


    /*

    public void readExcelSaveToVariabe(String filePath, Versions version, Hospitals hospital){

        FileInputStream excelFile = null;
        try {
            excelFile = new FileInputStream(new File(filePath));
            Workbook workbook = new XSSFWorkbook(excelFile);
            for(int i = 0; i<workbook.getNumberOfSheets(); i++) {
                Sheet datatypeSheet = workbook.getSheetAt(i);
                Iterator<Row> iterator = datatypeSheet.iterator();
                //Ignore first row since it is the header
                Row currentRow = iterator.next();
                System.out.println("Tab name: " + datatypeSheet.getSheetName());
                while (iterator.hasNext()) {
                    Variables variable = new Variables();
                    currentRow = iterator.next();
                    Iterator<Cell> cellIterator = currentRow.iterator();
                    String mapFunction = null; // keep the value of the mapping function if it is not present
                    while (cellIterator.hasNext()) {
                        Cell currentCell = cellIterator.next();
                       //Save each CellValue to variables
                        switch (currentCell.getColumnIndex()) {
                            case 0:
                                variable.setCsvFile(currentCell.getStringCellValue());
                                break;
                            case 1:
                                variable.setName(currentCell.getStringCellValue());
                                break;
                            case 2:
                                variable.setCode(currentCell.getStringCellValue());
                                break;
                            case 3:
                                variable.setType(currentCell.getStringCellValue());
                                break;
                            case 4:
                                variable.setValues(currentCell.getStringCellValue());
                                break;
                            case 5:
                                variable.setUnit(currentCell.getStringCellValue());
                                break;
                            case 6:
                                variable.setCanBeNull(currentCell.getStringCellValue());
                                break;
                            case 7:
                                variable.setDescription(currentCell.getStringCellValue());
                                break;
                            case 8:
                                variable.setComments(currentCell.getStringCellValue());
                                break;
                            case 9:
                                String cc9 = currentCell.getStringCellValue();
                                variable.setConceptPath(cc9);
                                break;
                            case 10:
                                variable.setMethodology(currentCell.getStringCellValue());
                                break;
                            case 11:
                                String cc11 = currentCell.getStringCellValue();
                                if(cc11 != null){ mapFunction = cc11; } // keep the cell value only if the cell has value
                                break;
                            case 12:
                                String cc12 = currentCell.getStringCellValue();
                                if(cc12 != null){
                                    CDEVariables cde = cdeVariableDAO.getCDEVariableByName(cc12);
                                    if(cde != null){ //the cde variable exists
                                        //System.out.println("The cdevariable has been retrieved");
                                        Functions functions = new Functions();

                                        //make the variable have the same coceptPath as the cde equivalent
                                        variable.setConceptPath(cde.getConceptPath());
                                        //append in the excel cell the concept path
                                        currentRow.getCell(9, Row.CREATE_NULL_AS_BLANK).setCellValue(cde.getConceptPath());
                                        List<Variables> allVariables = new ArrayList<>();
                                        List<Functions> allFunctions = new ArrayList<>();
                                        // functions takes a list of variables to express the many-2-many relationship
                                        allVariables.add(variable);
                                        functions.setVariables(allVariables);
                                        functions.setRule(mapFunction);
                                        functions.setCdeVariable(cde);
                                        // cde takes only on function to express the one-2-one relationship
                                        cde.setFunction(functions);
                                        // variables takes a list of functions to express the many-2-many relationship
                                        allFunctions.add(functions);
                                        variable.setFunction(allFunctions);
                                    }else{
                                        System.out.println("The cdevariable with name: "+ cc12 +"does no exist.We cannot create a mapping function");
                                    }


                                }
                                break;
                        }


                    }
                    variableDAO.saveVersionToVariable(variable, version);
                    variableDAO.saveHospitalToVariable(variable, hospital);
                    variableDAO.save(variable);

                }
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }


    public void generateConceptPathFromMapping(String filePath){

        FileInputStream excelFile = null;
        try {
            excelFile = new FileInputStream(new File(filePath));
            Workbook workbook = new XSSFWorkbook(excelFile);
            for(int i = 0; i<workbook.getNumberOfSheets(); i++) {
                Sheet datatypeSheet = workbook.getSheetAt(i);
                Iterator<Row> iterator = datatypeSheet.iterator();
                //Ignore first row since it is the header
                Row currentRow = iterator.next();
                System.out.println("Tab name: " + datatypeSheet.getSheetName());
                while (iterator.hasNext()) {
                    currentRow = iterator.next();
                    Iterator<Cell> cellIterator = currentRow.iterator();
                    Cell cell9 = currentRow.getCell(9);
                    Cell cell11 = currentRow.getCell(11);
                    Cell cell12 = currentRow.getCell(12);
                     if(cell9 == null){ // if the concept path is not given
                         if(cell11 != null ){ // if the function is given
                             if(cell12 != null){ // if the cdeMapping is given
                                 CDEVariables cde = cdeVariableDAO.getCDEVariableByName(cell12.getStringCellValue());
                                 if(cde != null){ //if the given cde exists
                                     System.out.println("The cdevariable has been retrieved");
                                     currentRow.getCell(9, Row.CREATE_NULL_AS_BLANK).setCellValue(cde.getConceptPath());
                                     System.out.println("The value of the row 9  now is : " +currentRow.getCell(9).getStringCellValue());
                                     System.out.println("The cde concept path is :  " +cde.getConceptPath());
                                 } //end if
                             } //end if
                         } //end if
                     } //end if
                } //end while
            } //end for
            excelFile.close();
            //Open FileOutputStream to write updates
            FileOutputStream output_file =new FileOutputStream(new File(filePath));
            //write changes
            workbook.write(output_file);
            //close the stream
            output_file.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    } //end method

}

*/