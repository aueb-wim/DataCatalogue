package com.admir.demiraj.datacatalogspringboot.service;


import com.admir.demiraj.datacatalogspringboot.dao.*;
import com.admir.demiraj.datacatalogspringboot.exceptionHandlers.CustomException;
import com.admir.demiraj.datacatalogspringboot.resources.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

@Service
public class UploadCdes extends ResponseEntityExceptionHandler {

    private static final String FOLDER_NAME = System.getProperty("user.dir") + "/src/main/resources/data/cdes/";

    private static final String[] properColumnsNames = {"csvFile","name","code","type","values","unit","canBeNull",
            "description","comments","conceptPath","methodology"};

    @Autowired
    private CDEVariableDAO cdeVariableDAO;


    @Autowired
    private VersionDAO versionDAO;

    @Autowired
    private FunctionsDAO functionsDAO;

    @Autowired
    private VariablesXLSX_JSON variablesXLSX_json;

    @Autowired
    private PathologyDAO pathologyDAO;

    @Autowired
    private  StorageService storageService;




   public void readSingleExcelFile(String fileName) throws IOException,FileNotFoundException {
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
           pathology = new Pathology(pathologyName.toLowerCase());
       }


       List<Versions> versionsInPathology = pathology.getVersions();
       System.out.println("Number of version present in pathology: "+versionsInPathology.size());
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
           variablesXLSX_json.filePath = filePath;
           variablesXLSX_json.version = version;
           variablesXLSX_json.hospital = null;
           ///////////////////////////////////////////////////////////////////////////////////////////////////////////

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


    public void readExcelFile() throws IOException,FileNotFoundException {
        File folder = new File(FOLDER_NAME);
        // Get all the files from the folder
        File[] listOfFiles = folder.listFiles();

        System.out.println("The total files found are: " + listOfFiles.length);

        for (int i = 0; i < listOfFiles.length; i++) {
            if (listOfFiles[i].isFile()) {
                //Split the file name in hospital_name and version_name
                String fileName = listOfFiles[i].getName();
                readSingleExcelFile(fileName);


            }
        }

    }

    public void validateColumnNames(Row currentRow,String filePath, String [] properColumnsNames ) {

        final DataFormatter df = new DataFormatter();

        int possibleNumberOfColumns = currentRow.getLastCellNum();
        // Exclude the empty columns from the count
        int noOfColumns = 0;
        for(int i=0;i<possibleNumberOfColumns;i++){
            if(currentRow.getCell(i).getCellType() != CustomCell.CELL_TYPE_BLANK){
                noOfColumns ++;
            }
        }
        if(noOfColumns!=properColumnsNames.length){
            storageService.moveFileToErrorFiles(filePath);
            throw  new CustomException("Invalid number of columns","Expecting "+properColumnsNames.length+" columns, but " +
                    "found "+noOfColumns,"Please validate that your file contains the following columns:"+ Arrays.toString(properColumnsNames));

        }

        // Check that all columns are provided properly
        for(int i=0;i<noOfColumns;i++){
            if(!df.formatCellValue(currentRow.getCell(i)).equals(properColumnsNames[i])){
                storageService.moveFileToErrorFiles(filePath);
                throw  new CustomException("Invalid column "+df.formatCellValue(currentRow.getCell(i)),"Expecting " +
                        "column: "+properColumnsNames[i]+" but found column: "+df.formatCellValue(currentRow.getCell(i)),
                        "Please validate that your file contains the following sequence of columns:"+
                        Arrays.toString(properColumnsNames));
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
                //delete rows that have all their columns empty
                //uploadVariables.deleteEmptyExcelRows(datatypeSheet);

                Iterator<Row> iterator = datatypeSheet.iterator();
                //Ignore first row since it is the header
                Row currentRow = iterator.next();
                // Check that we have the proper column names
                validateColumnNames(currentRow,filePath,properColumnsNames);

                System.out.println("Current row contains " + currentRow);
                while (iterator.hasNext()) {
                    CDEVariables cdeVariables = new CDEVariables();
                    //Functions function = new Functions("","");
                    //functionsDAO.save(function);
                    //cdeVariableDAO.saveFunctionToCDEVariable(cdeVariables, function);
                    currentRow = iterator.next();
                    Iterator<Cell> cellIterator = currentRow.iterator();
                    System.out.println("ROw");
                    System.out.println("iterator is"+cellIterator);
                    Cell currentCell = null;
                    //while (cellIterator.hasNext()) {
                    for (int j=0;j<properColumnsNames.length;j++){
                        try {

                            currentCell = currentRow.getCell(j);
                            System.out.println("Cell value is: "+currentCell.getStringCellValue()+" cell index:"+currentCell.getColumnIndex());
                        }catch (NullPointerException e) {

                            currentCell = new CustomCell();
                            ((CustomCell) currentCell).setColumnIndex(j);
                            currentCell.setCellValue("");
                            System.out.println("Cell value is: "+currentCell.getStringCellValue()+" cell index:"+currentCell.getColumnIndex());
                        }
                        System.out.println("Column");
                        //Cell currentCell = cellIterator.next();
                        //Save each CellValue to variables
                        System.out.println("column index is:"+currentCell.getColumnIndex());

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
                                break;
                            case 3:
                                cdeVariables.setType(currentCell.getStringCellValue());
                                break;
                            case 4:
                                cdeVariables.setValues(currentCell.getStringCellValue());

                                break;
                            case 5:
                                cdeVariables.setUnit(currentCell.getStringCellValue());
                                break;
                            case 6:
                                cdeVariables.setCanBeNull(currentCell.getStringCellValue());
                                break;
                            case 7:
                                cdeVariables.setDescription(currentCell.getStringCellValue());
                                break;
                            case 8:
                                cdeVariables.setComments(currentCell.getStringCellValue());
                                break;
                            case 9:
                                cdeVariables.setConceptPath(currentCell.getStringCellValue());
                                break;
                            case 10:
                                cdeVariables.setMethodology(currentCell.getStringCellValue());
                                break;
                        }

                    }

                    cdeVariables.setSql_type(generateSqlTypeFormType(cdeVariables.getType()));
                    cdeVariables.setIsCategorical(checkIfCategorical(cdeVariables));



                    // In case some particular fields are empty print a message accordingly
                    validateFields(cdeVariables,filePath);
                    cdeVariablesList.add(cdeVariables);




                }
            }

        return cdeVariablesList;
    }



    public void validateFields(CDEVariables cdeVariable, String filePath){
       if(eitherEmptyOrNull(cdeVariable.getCode())){
           throwExceptioAndDelete("A CDE variable with empty code cannot be saved.","","Please provide a code for all CDE variables ",filePath);
       }
        if(eitherEmptyOrNull(cdeVariable.getType())){
            throwExceptioAndDelete("The CDE variable: \""+cdeVariable.getCode()+"\" does not have type.","A CDE variable without type cannot be saved.","Please provide a type for all CDE variables.If you are unsure use type: text",filePath);
        }

        if(eitherEmptyOrNull(cdeVariable.getConceptPath())){
            throwExceptioAndDelete("The CDE variable: \""+cdeVariable.getCode()+"\" does not have conceptPath.","A CDE variable without conceptPath cannot be saved.","Please provide a conceptPath for all CDE variables.",filePath);
        }


    }

    /** This is a method that checks whether all fields in a variable are empty. This in return means that the excel line
     * is empty and thus we should not take further actions.*/
    public boolean areAllCDEVariablesFiledsEmpty(CDEVariables cdeVariable){
       if(eitherEmptyOrNull(cdeVariable.getCode()) && eitherEmptyOrNull(cdeVariable.getConceptPath()) &&
               eitherEmptyOrNull(cdeVariable.getType()) && eitherEmptyOrNull(cdeVariable.getCsvFile())
       && eitherEmptyOrNull(cdeVariable.getName()) && eitherEmptyOrNull(cdeVariable.getValues()) &&
       eitherEmptyOrNull(cdeVariable.getUnit()) && eitherEmptyOrNull(cdeVariable.getCanBeNull()) &&
       eitherEmptyOrNull(cdeVariable.getDescription()) && eitherEmptyOrNull(cdeVariable.getComments()) &&
       eitherEmptyOrNull(cdeVariable.getMethodology())){
           return true;
       }else {
           return false;
       }
    }


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
    public void throwExceptioAndDelete(String exceMessage,String exceDetails, String exceNextSteps, String filePath){
        storageService.moveFileToErrorFiles(filePath);
        throw new CustomException(exceMessage, exceDetails, exceNextSteps);
    }

    /**
     * If all tests pass it means it is a category
     */
    public boolean validateCategoryFields(CDEVariables cdevar) {

        if (eitherEmptyOrNull(cdevar.getType()) && eitherEmptyOrNull(cdevar.getCanBeNull())
                && eitherEmptyOrNull(cdevar.getSql_type()) && eitherEmptyOrNull(cdevar.getIsCategorical()) && eitherEmptyOrNull(cdevar.getValues())
                && eitherEmptyOrNull(cdevar.getUnit())) {
           // System.out.println("EVERYTHING --> OK");
            return true;
        }
        return false;
    }

    public static boolean eitherEmptyOrNull(String field) {
        if (field == null || field.equals("") ) {
            return true;
        } else {
            return false;
        }
    }

    public static boolean neitherEmptyNorNull(String field) {
        if (field != null && !field.equals("")) {
            return true;
        } else {
            return false;
        }
    }

}
