package com.admir.demiraj.datacatalogspringboot.service;


import com.admir.demiraj.datacatalogspringboot.dao.*;
import com.admir.demiraj.datacatalogspringboot.resources.*;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.bouncycastle.math.ec.ScaleYPointMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class UploadCdes {

    private static final String FOLDER_NAME = System.getProperty("user.dir") + "/src/main/resources/data/cdes/";

    @Autowired
    private CDEVariableDAO cdeVariableDAO; //= new CDEVariableDAO();


    @Autowired
    private VersionDAO versionDAO;// = new VersionDAO();

    @Autowired
    private FunctionsDAO functionsDAO;

    @Autowired
    private VariablesXLSX_JSON variablesXLSX_json;


    public void readExcelFile() {
        File folder = new File(FOLDER_NAME);
        // Get all the files from the folder
        File[] listOfFiles = folder.listFiles();
        System.out.println("The total files found are: " + listOfFiles.length);
        for (int i = 0; i < listOfFiles.length; i++) {
            if (listOfFiles[i].isFile()) {
                //Split the file name in hospital_name and version_name
                String fileName = listOfFiles[i].getName();
                String filePath = FOLDER_NAME + fileName;
                String[] parts = fileName.split("_");
                String[] parts2 = parts[1].toString().split("\\.");
                String versionName = parts2[0];
                //The cdeversion already exists
                if (cdeVariableDAO.isCdeVersionPresent(versionName)) {
                    System.out.println("This version already exists");
                    //The cdeversion does not exist
                } else {

                    Versions version = new Versions(versionName);
                    List<CDEVariables> cdeVariablesList = readExcelSaveToVariabe(filePath, version);
                    System.out.println("Retrieving node from file");
                    //for(CDEVariables cde : cdeVariablesList){
                     //   System.out.println(cde.getCode());
                   // }
                    System.out.println("The size of the cdevariables:---> "+cdeVariablesList.size());

                    //////////////////////////////////////////////////////VariablesXLSX_JSON.Node node = variablesXLSX_json.loadXLSXInMemory(filePath);
                    VariablesXLSX_JSON.Node node = variablesXLSX_json.createTree3(cdeVariablesList);
                    //////////////////////////////////////////////////////
                    //////////////////////////////////////////////////////
                    System.out.println("Retrieving jsonString from file");
                    version.setJsonString(variablesXLSX_json.createJSONMetadata(node).toString());
                    System.out.println("Retrieving jsonStringVisualizable from file");
                    version.setJsonStringVisualizable(variablesXLSX_json.createJSONVisualization(node).toString());
                    System.out.println("Saving Version");
                    versionDAO.saveVersion(version);

                }

            }
        }

    }


    public List<CDEVariables> readExcelSaveToVariabe(String filePath, Versions version) {

        FileInputStream excelFile = null;
        List<CDEVariables> cdeVariablesList = new ArrayList<>();
        try {
            excelFile = new FileInputStream(new File(filePath));
            Workbook workbook = new XSSFWorkbook(excelFile);
            for (int i = 0; i < workbook.getNumberOfSheets(); i++) {
                Sheet datatypeSheet = workbook.getSheetAt(i);
                Iterator<Row> iterator = datatypeSheet.iterator();
                //Ignore first row since it is the header
                Row currentRow = iterator.next();
                System.out.println("Tab name: " + datatypeSheet.getSheetName());
                while (iterator.hasNext()) {
                    CDEVariables cdeVariables = new CDEVariables();
                    //Functions function = new Functions("","");
                    //functionsDAO.save(function);
                    //cdeVariableDAO.saveFunctionToCDEVariable(cdeVariables, function);
                    currentRow = iterator.next();
                    Iterator<Cell> cellIterator = currentRow.iterator();
                    while (cellIterator.hasNext()) {

                        Cell currentCell = cellIterator.next();
                        //Save each CellValue to variables
                        switch (currentCell.getColumnIndex()) {
                            case 0:
                                cdeVariables.setCsvFile(currentCell.getStringCellValue());
                                break;
                            case 1:
                                cdeVariables.setName(currentCell.getStringCellValue());
                                break;
                            case 2:
                                if (currentCell.getStringCellValue() == null || currentCell.getStringCellValue().isEmpty()) {
                                    break;
                                } else {
                                    cdeVariables.setCode(currentCell.getStringCellValue());
                                }
                                //cdeVariables.setCode(currentCell.getStringCellValue());
                                break;
                            case 3:
                                cdeVariables.setType(currentCell.getStringCellValue());
                                break;
                            case 4:
                                cdeVariables.setSqlType(currentCell.getStringCellValue());
                                break;
                            case 5:
                                cdeVariables.setIsCategorical(currentCell.getStringCellValue());
                                break;
                            case 6:
                                cdeVariables.setValues(currentCell.getStringCellValue());
                                break;
                            case 7:
                                cdeVariables.setUnit(currentCell.getStringCellValue());
                                break;
                            case 8:
                                cdeVariables.setCanBeNull(currentCell.getStringCellValue());
                                break;
                            case 9:
                                cdeVariables.setDescription(currentCell.getStringCellValue());
                                break;
                            case 10:
                                cdeVariables.setComments(currentCell.getStringCellValue());
                                break;
                            case 11:
                                cdeVariables.setConceptPath(currentCell.getStringCellValue());
                                break;
                            case 12:
                                cdeVariables.setMethodology(currentCell.getStringCellValue());
                                break;
                        }


                    }
                    if (validateCdeFields(cdeVariables)) {
                        //it is a cdevariable
                        cdeVariableDAO.saveVersionToCDEVariable(cdeVariables, version);
                        cdeVariableDAO.save(cdeVariables);
                        cdeVariablesList.add(cdeVariables);
                    } else if (validateCategoryFields(cdeVariables)) {
                        //it is a category
                        cdeVariablesList.add(cdeVariables);
                    } else {
                        System.out.println("CDE variable with empty code cannot be saved.");
                    }


                }
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return cdeVariablesList;
    }

    /**
     * If all test pass it means that we can save the cdevariable
     */
    private boolean validateCdeFields(CDEVariables cdevar) {
        //System.out.println("CHECK IF IT IS A CDEVARIABLE");
        if (neitherEmptyNorNull(cdevar.getCode()) && neitherEmptyNorNull(cdevar.getSqlType()) && neitherEmptyNorNull(cdevar.getIsCategorical())) {
            //System.out.println("code - sqltype - isCategorical --> ok");
            if (cdevar.getSqlType().trim().toLowerCase().equals("real") || cdevar.getSqlType().trim().toLowerCase().equals("integer") || cdevar.getSqlType().trim().toLowerCase().equals("text")) {
               // System.out.println("sqltype (integer,real,text) --> ok");
                if (cdevar.getIsCategorical().trim().toLowerCase().equals("true") || cdevar.getIsCategorical().trim().toLowerCase().equals("false")) {
                   // System.out.println("isCategorical (true,false) --> ok");
                    return true;
                }
            }
        }
        return false;


    }

    /**
     * If all tests pass it means it is a category
     */
    private boolean validateCategoryFields(CDEVariables cdevar) {
       // System.out.println("CHECK IF IT IS A CATEGORY");
        //System.out.println("CSV --> "+eitherEmptyOrNull(cdevar.getCsvFile()));
       // System.out.println("TYPE --> "+eitherEmptyOrNull(cdevar.getType()));
       // System.out.println("CANBENULL --> "+eitherEmptyOrNull(cdevar.getCanBeNull()));
     //   System.out.println("SQLTYPE --> "+eitherEmptyOrNull(cdevar.getSqlType()));
     //   System.out.println("ISCATEGORICAL --> "+eitherEmptyOrNull(cdevar.getIsCategorical()));
     //   System.out.println("VALUES --> "+eitherEmptyOrNull(cdevar.getValues()));


        if (eitherEmptyOrNull(cdevar.getCsvFile()) && eitherEmptyOrNull(cdevar.getType()) && eitherEmptyOrNull(cdevar.getCanBeNull())
                && eitherEmptyOrNull(cdevar.getSqlType()) && eitherEmptyOrNull(cdevar.getIsCategorical()) && eitherEmptyOrNull(cdevar.getValues())
                && eitherEmptyOrNull(cdevar.getUnit())) {
           // System.out.println("EVERYTHING --> OK");
            return true;
        }
        return false;
    }

    private static boolean eitherEmptyOrNull(String field) {
        if (field == null || field == "") {
            return true;
        } else {
            return false;
        }
    }

    private static boolean neitherEmptyNorNull(String field) {
        if (field != null && field != "") {
            return true;
        } else {
            return false;
        }
    }

}
