package com.admir.demiraj.datacatalogspringboot.service;


import com.admir.demiraj.datacatalogspringboot.dao.*;
import com.admir.demiraj.datacatalogspringboot.exceptionHandlers.ApiError;
import com.admir.demiraj.datacatalogspringboot.exceptionHandlers.CustomException;
import com.admir.demiraj.datacatalogspringboot.resources.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class UploadCdes extends ResponseEntityExceptionHandler {

    private static final String FOLDER_NAME = System.getProperty("user.dir") + "/src/main/resources/data/cdes/";

    @Autowired
    private CDEVariableDAO cdeVariableDAO; //= new CDEVariableDAO();


    @Autowired
    private VersionDAO versionDAO;// = new VersionDAO();

    @Autowired
    private FunctionsDAO functionsDAO;

    @Autowired
    private VariablesXLSX_JSON variablesXLSX_json;

    @Autowired
    private PathologyDAO pathologyDAO;






    public void readExcelFile() throws IOException,FileNotFoundException {
        File folder = new File(FOLDER_NAME);
        // Get all the files from the folder
        File[] listOfFiles = folder.listFiles();
        System.out.println("The total files found are: " + listOfFiles.length);
        if(true){


            throw new CustomException("The columns provided are invalid.", "Given Columns [], Needed Columns []",
                    "Please change the column names and sequence if needed:");

        }
        for (int i = 0; i < listOfFiles.length; i++) {
            if (listOfFiles[i].isFile()) {
                //Split the file name in hospital_name and version_name
                String fileName = listOfFiles[i].getName();
                String filePath = FOLDER_NAME + fileName;
                String[] parts = fileName.split("_");


                String pathologyName = parts[0];

                String[] parts2 = parts[2].toString().split("\\.");
                String versionName = parts2[0];
                Pathology pathology;

                if(pathologyDAO.isPathologyPresent(pathologyName)) {
                    System.out.println("The pathology : " + pathologyName + " already exists");
                     pathology = pathologyDAO.getPathologyByName(pathologyName);
                }else{
                    System.out.println("Greating pathology : " + pathologyName);
                     pathology = new Pathology(pathologyName);
                }


                    List<Versions> versionsInPathology = pathology.getVersions();
                    boolean found = false;
                    for(Versions v : versionsInPathology){
                        if(v.getName().equals(versionName)){
                            System.out.println("The version: "+versionName+" already exists in :"+pathologyName);
                            found = true;
                        }

                    }
                    if(found==false){
                        System.out.println("Creating version: "+versionName+" for pathology: "+pathologyName);

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

                        ///////////////////
                        versionsInPathology.add(version);
                        pathology.setVersions(versionsInPathology);
                        pathologyDAO.save(pathology);
                        System.out.println("The id of the pathology is: "+pathology.getPathology_id());

                        System.out.println("Saving Version");
                        version.setPathology(pathology);
                        versionDAO.saveVersion(version);


                        for(CDEVariables cde : cdeVariablesList){
                            cdeVariableDAO.saveVersionToCDEVariable(cde, version);
                            cdeVariableDAO.save(cde);
                        }





                }


            }
        }

    }


    public List<CDEVariables> readExcelSaveToVariabe(String filePath, Versions version) throws FileNotFoundException,IOException{

        FileInputStream excelFile = null;
        List<CDEVariables> cdeVariablesList = new ArrayList<>();
        final DataFormatter df = new DataFormatter();

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
                    System.out.println("ROw");
                    System.out.println("iterator is"+cellIterator);
                    while (cellIterator.hasNext()) {
                        System.out.println("Column");
                        Cell currentCell = cellIterator.next();
                        //Save each CellValue to variables
                        System.out.println("column index is:"+currentCell.getColumnIndex());

                        switch (currentCell.getColumnIndex()) {
                            case 0:
                                cdeVariables.setCsvFile(df.formatCellValue(currentCell));
                                break;
                            case 1:
                                cdeVariables.setName(df.formatCellValue(currentCell));
                                break;
                            case 2:
                                if (df.formatCellValue(currentCell) == null || df.formatCellValue(currentCell).isEmpty()) {
                                    break;
                                } else {
                                    cdeVariables.setCode(df.formatCellValue(currentCell));
                                }
                                //cdeVariables.setCode(currentCell.getStringCellValue());
                                break;
                            case 3:
                                cdeVariables.setType(df.formatCellValue(currentCell));
                                break;
                            case 4:

                                //System.out.println("Setting value:"+currentCell.getStringCellValue());
                                cdeVariables.setValues(df.formatCellValue(currentCell));

                                break;
                            case 5:

                                //System.out.println("unit:"+currentCell.getRichStringCellValue().getString());

                                cdeVariables.setUnit(df.formatCellValue(currentCell));

                                break;
                            case 6:
                                cdeVariables.setCanBeNull(df.formatCellValue(currentCell));
                                break;
                            case 7:
                                cdeVariables.setDescription(df.formatCellValue(currentCell));
                                break;
                            case 8:
                                cdeVariables.setComments(df.formatCellValue(currentCell));
                                break;
                            case 9:
                                cdeVariables.setConceptPath(df.formatCellValue(currentCell));
                                break;
                            case 10:
                                cdeVariables.setMethodology(df.formatCellValue(currentCell));
                                break;
                        }

                    }
                    /*
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


*/
                    cdeVariables.setSql_type(generateSqlTypeFormType(cdeVariables.getType()));
                    cdeVariables.setIsCategorical(checkIfCategorical(cdeVariables));

                    if (neitherEmptyNorNull(cdeVariables.getCode()) && neitherEmptyNorNull(cdeVariables.getType()) && !cdeVariables.getConceptPath().endsWith("/")) {
                        //it is a cdevariable
                        //cdeVariableDAO.saveVersionToCDEVariable(cdeVariables, version);
                        //cdeVariableDAO.save(cdeVariables);
                        cdeVariablesList.add(cdeVariables);
                    } else if (validateCategoryFields(cdeVariables)) {
                        //it is a category
                        cdeVariablesList.add(cdeVariables);
                    } else {
                        System.out.println("CDE variable with empty code cannot be saved.");
                    }

                }
            }

        return cdeVariablesList;
    }

















    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    public List<CDEVariables> readExcelSaveToVariabe_original(String filePath, Versions version) {

        FileInputStream excelFile = null;
        List<CDEVariables> cdeVariablesList = new ArrayList<>();
        final DataFormatter df = new DataFormatter();
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
                    System.out.println("ROw");
                    System.out.println("iterator is"+cellIterator);
                    while (cellIterator.hasNext()) {
                        System.out.println("Column");
                        Cell currentCell = cellIterator.next();
                        //Save each CellValue to variables
                        System.out.println("column index is:"+currentCell.getColumnIndex());

                        switch (currentCell.getColumnIndex()) {
                            case 0:
                                cdeVariables.setCsvFile(df.formatCellValue(currentCell));
                                break;
                            case 1:
                                cdeVariables.setName(df.formatCellValue(currentCell));
                                break;
                            case 2:
                                if (df.formatCellValue(currentCell) == null || df.formatCellValue(currentCell).isEmpty()) {
                                    break;
                                } else {
                                    cdeVariables.setCode(df.formatCellValue(currentCell));
                                }
                                //cdeVariables.setCode(currentCell.getStringCellValue());
                                break;
                            case 3:
                                cdeVariables.setType(df.formatCellValue(currentCell));
                                break;
                            case 4:

                                //System.out.println("Setting value:"+currentCell.getStringCellValue());
                                cdeVariables.setValues(df.formatCellValue(currentCell));

                                break;
                            case 5:

                                //System.out.println("unit:"+currentCell.getRichStringCellValue().getString());
                                System.out.println("value is:"+df.formatCellValue(currentCell));
                                cdeVariables.setUnit(df.formatCellValue(currentCell));

                                break;
                            case 6:
                                cdeVariables.setCanBeNull(df.formatCellValue(currentCell));
                                break;
                            case 7:
                                cdeVariables.setDescription(df.formatCellValue(currentCell));
                                break;
                            case 8:
                                cdeVariables.setComments(df.formatCellValue(currentCell));
                                break;
                            case 9:
                                cdeVariables.setConceptPath(df.formatCellValue(currentCell));
                                break;
                            case 10:
                                cdeVariables.setMethodology(df.formatCellValue(currentCell));
                                break;
                        }

                    }



                    cdeVariables.setSql_type(generateSqlTypeFormType(cdeVariables.getType()));
                    cdeVariables.setIsCategorical(checkIfCategorical(cdeVariables));

                    if (neitherEmptyNorNull(cdeVariables.getCode()) && neitherEmptyNorNull(cdeVariables.getType()) && !cdeVariables.getConceptPath().endsWith("/")) {
                        //it is a cdevariable
                        //cdeVariableDAO.saveVersionToCDEVariable(cdeVariables, version);
                        //cdeVariableDAO.save(cdeVariables);
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


                    */
    public String generateSqlTypeFormType(String type){
        if(type != null){
            if (type.toLowerCase().trim().equals("int") || type.toLowerCase().trim().equals("integer")){
                return "int";
            }else if (type.toLowerCase().trim().equals("real")){
                return "real";
            }else{
                return "text";
            }
        }

            return null;

    }

    public String checkIfCategorical(CDEVariables cde){
        if(cde.getType() != null){
            if(cde.getType().toLowerCase().trim().equals("polynominal") || cde.getType().toLowerCase().trim().equals("nominal")){
                if(cde.getValues() != null){
                if(cde.getValues().toLowerCase().trim().contains("{") && cde.getValues().toLowerCase().trim().contains("}") || cde.getValues().toLowerCase().trim().matches("^s*\\d{2,3}\\s*(?:-\\s*\\d{2,3}\\s*)$")){
                    return "true";
                }}
        }

        return "false";

}
return null;
    }

    /**
     * If all test pass it means that we can save the cdevariable
     */
    private boolean validateCdeFields(CDEVariables cdevar) {
        //System.out.println("CHECK IF IT IS A CDEVARIABLE");
        if (neitherEmptyNorNull(cdevar.getCode()) && neitherEmptyNorNull(cdevar.getSql_type()) && neitherEmptyNorNull(cdevar.getIsCategorical())) {
            //System.out.println("code - sqltype - isCategorical --> ok");
            if (cdevar.getSql_type().trim().toLowerCase().equals("real") || cdevar.getSql_type().trim().toLowerCase().equals("int") || cdevar.getSql_type().trim().toLowerCase().equals("text")) {
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
    public boolean validateCategoryFields(CDEVariables cdevar) {
       // System.out.println("CHECK IF IT IS A CATEGORY");
        //System.out.println("CSV --> "+eitherEmptyOrNull(cdevar.getCsvFile()));
       // System.out.println("TYPE --> "+eitherEmptyOrNull(cdevar.getType()));
       // System.out.println("CANBENULL --> "+eitherEmptyOrNull(cdevar.getCanBeNull()));
     //   System.out.println("SQLTYPE --> "+eitherEmptyOrNull(cdevar.getSqlType()));
     //   System.out.println("ISCATEGORICAL --> "+eitherEmptyOrNull(cdevar.getIsCategorical()));
     //   System.out.println("VALUES --> "+eitherEmptyOrNull(cdevar.getValues()));


        if (eitherEmptyOrNull(cdevar.getType()) && eitherEmptyOrNull(cdevar.getCanBeNull())
                && eitherEmptyOrNull(cdevar.getSql_type()) && eitherEmptyOrNull(cdevar.getIsCategorical()) && eitherEmptyOrNull(cdevar.getValues())
                && eitherEmptyOrNull(cdevar.getUnit())) {
           // System.out.println("EVERYTHING --> OK");
            return true;
        }
        return false;
    }

    public static boolean eitherEmptyOrNull(String field) {
        if (field == null || field == "") {
            return true;
        } else {
            return false;
        }
    }

    public static boolean neitherEmptyNorNull(String field) {
        if (field != null && field != "") {
            return true;
        } else {
            return false;
        }
    }

}

/**
 * //The cdeversion already exists
 *                 if (cdeVariableDAO.isCdeVersionPresent(versionName)) {
 *                     System.out.println("This version already exists");
 *                     //The cdeversion does not exist
 *                 } else {
 *
 *                     Versions version = new Versions(versionName);
 *                     List<CDEVariables> cdeVariablesList = readExcelSaveToVariabe(filePath, version);
 *                     System.out.println("Retrieving node from file");
 *                     //for(CDEVariables cde : cdeVariablesList){
 *                      //   System.out.println(cde.getCode());
 *                    // }
 *                     System.out.println("The size of the cdevariables:---> "+cdeVariablesList.size());
 *
 *                     //////////////////////////////////////////////////////VariablesXLSX_JSON.Node node = variablesXLSX_json.loadXLSXInMemory(filePath);
 *                     VariablesXLSX_JSON.Node node = variablesXLSX_json.createTree3(cdeVariablesList);
 *                     //////////////////////////////////////////////////////
 *                     //////////////////////////////////////////////////////
 *                     System.out.println("Retrieving jsonString from file");
 *                     version.setJsonString(variablesXLSX_json.createJSONMetadata(node).toString());
 *                     System.out.println("Retrieving jsonStringVisualizable from file");
 *                     version.setJsonStringVisualizable(variablesXLSX_json.createJSONVisualization(node).toString());
 *                     System.out.println("Saving Version");
 *                     versionDAO.saveVersion(version);
 *
 *                 }**/