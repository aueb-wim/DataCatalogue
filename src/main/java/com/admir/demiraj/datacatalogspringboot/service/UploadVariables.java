package com.admir.demiraj.datacatalogspringboot.service;

import com.admir.demiraj.datacatalogspringboot.dao.*;
import com.admir.demiraj.datacatalogspringboot.exceptionHandlers.CustomException;
import com.admir.demiraj.datacatalogspringboot.resources.*;
import io.micrometer.core.instrument.util.StringUtils;
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
    private static final String[] properColumnsNames = {"csvFile","name","code","type","values","unit","canBeNull",
            "description","comments","conceptPath","methodology","mapFunction","mapCDE"};




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

    @Autowired
    private PathologyDAO pathologyDAO;

    @Autowired
    private StorageService storageService;

    @Autowired
    private UploadCdes uploadCdes;


    public void readSingleExcelFile(String fileName){
        String filePath = FOLDER_NAME + fileName;
        String[] parts = fileName.split("_");
        String pathologyName = parts[0];
        String hospitalName = parts[1];
        String[] parts2 = parts[2].toString().split("\\.");
        String versionName = parts2[0];
        Hospitals currentHospital = hospitalDAO.getHospitalByName(hospitalName);
        //The hospital exists
        if (currentHospital != null) {
            System.out.println("The hospital exists");
            //The version is present at hospital
            if (versionDAO.isVersionNameInHospital(versionName, hospitalName)) {

                throw new CustomException("The version : " + versionName + " is already present at : " + hospitalName,
                        "We cannot have the same version twice in the same hospital","Please create a new version");
                //System.out.println("The version : " + versionName + " is already present at : " + hospitalName);
               // System.out.println("The file : " + fileName + " won't be saved");
                //The version isn't present at hospital
            } else {
                createVersion(versionName, filePath, currentHospital, pathologyName);
            }


            //The hospital doesn't exist
        } else {
            //generateConceptPathFromMapping(filePath);
            Hospitals createdHospital = new Hospitals(hospitalName);
            hospitalDAO.save(createdHospital);//////check this
            createVersion(versionName, filePath, createdHospital,pathologyName);

        }


    }

    public void readExcelFile() {
        File folder = new File(FOLDER_NAME);
        // Get all the files from the folder
        File[] listOfFiles = folder.listFiles();
        for (int i = 0; i < listOfFiles.length; i++) {
            if (listOfFiles[i].isFile()) {
                //Split the file name in hospital_name and version_name
                String fileName = listOfFiles[i].getName();
                System.out.println("THE CURRENT FILE NAME IS: "+fileName);
                readSingleExcelFile(fileName);

        }
    }
    }


    public void createVersion(String versionName, String filePath, Hospitals currentHospital, String pathologyName) {
        Versions version = new Versions(versionName);
        Versions harmonizedVersion = new Versions(versionName+"-harmonized");
        ///////////////////////////////////////////////////
        System.out.println("Saving Version");
        List<Variables> allVar = new ArrayList<>();
        List<Variables> allVar3 = new ArrayList<>();
        Map<String,List<Variables>> map;
        try {
            map = Read_xlsx(filePath, version, currentHospital, harmonizedVersion, pathologyName);
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
        variablesXLSX_json.PATHOLOGY_CODE = "";
        variablesXLSX_json.version = version;
        variablesXLSX_json.harmonizedVersion = harmonizedVersion;
        variablesXLSX_json.hospital = currentHospital;
        variablesXLSX_json.filePath = filePath;
        System.out.println("Create tree");
        for(Variables var:allVar){
            System.out.println("variable code:"+var.getCode()+" concept path:"+var.getConceptPath());
        }
        VariablesXLSX_JSON.Node testTree = variablesXLSX_json.createTree(allVar);
        System.out.println("Retrieving jsonStringMetadata from file");
        //Select last Version of the CDEs : TO BE CHANGED!!! We have to parameterize the version it takes ********

        //Versions lastVersion = versionDAO.getLastCdeVersion();
        Versions lastVersion = pathologyDAO.getLatestCdeVersionByPathologyName(pathologyName); //!NOTE CHANGED THIS

        List<CDEVariables> cdeVars = cdeVariableDAO.findCDEVariablesByVersionId(lastVersion.getVersion_id());
        //******** ********* ********* **** TO BE CHANGED!!! ******** ********* ********* ********* ******** ***
        for(CDEVariables cdevar:cdeVars){
            System.out.println("CDE VARS CODE: "+cdevar.getCode());
        }
        version.setJsonString(variablesXLSX_json.createJSONMetadataWithCDEs(allVar, cdeVars).toString());
        System.out.println("Retrieving jsonStringVisualizable from file");
        version.setJsonStringVisualizable(variablesXLSX_json.createJSONVisualization(testTree).toString());
        version.setVariables(allVar2);
        versionDAO.saveVersion(version);


       if(!allVar3.isEmpty()){
           List<CDEVariables> cdeVariables = new ArrayList<>();
           for(CDEVariables cdevar : versionDAO.getLastCdeVersion().getCdevariables()){
               cdevar.setVersions2(harmonizedVersion);
               cdeVariables.add(cdevar);
           }
           System.out.println("Create tree2");
           for(Variables var:allVar){
               System.out.println("variable code:"+var.getCode()+" concept path:"+var.getConceptPath());
           }
           VariablesXLSX_JSON.Node testTree2 = variablesXLSX_json.createTree2(allVar, cdeVars);
           harmonizedVersion.setJsonString(variablesXLSX_json.createJSONMetadataWithCDEs(allVar, cdeVars).toString());
           harmonizedVersion.setJsonStringVisualizable(variablesXLSX_json.createJSONVisualization(testTree2).toString());
           harmonizedVersion.setCdevariables(cdeVariables);
           harmonizedVersion.setVariables(allVar3);
           versionDAO.saveVersion(harmonizedVersion);

       }

    }


    public void validataMapFunctionMapCDE(String variableCode, String mapFunction, String mapCDE, String conceptPath,
                                          String filePath, Versions currentVersion, Versions harmonizedVersion, Hospitals currentHospital){



         System.out.println("Concept PAth: "+conceptPath+"mapFunc: ##"+mapFunction+"## mapCDE: ##"+mapCDE+"##");
        // If the map function and map cde are not given then the conceptPath is mandatory
        if(eitherEmptyOrNull(mapFunction) && eitherEmptyOrNull(mapCDE)){
            if(eitherEmptyOrNull(conceptPath)){
                storageService.moveFileToErrorFiles(filePath);
                versionDAO.deleteVersion( currentHospital,  currentVersion);
                //versionDAO.deleteVersion( currentHospital,  currentVersion);
                throwExceptioAndDelete("Empty conceptPath found for variable: \""+variableCode+"\"","The conceptPath" +
                        "cannot be empty, unless we have defined mapFunction and mapCDE for a particular variable","Either provide a" +
                        "conceptPath or a Map Function and Map Cde",currentHospital,currentVersion,harmonizedVersion,filePath);
                //throw new CustomException("Empty conceptPath found for variable: \""+variableCode+"\"","The conceptPath" +
                //        "cannot be empty, unless we have defined mapFunction and mapCDE for a particular variable","Either provide a" +
               //         "conceptPath or a Map Function and Map Cde");
            }


        }
        // Only the map cde is provided
        if(eitherEmptyOrNull(mapFunction)  && neitherEmptyNorNull(mapCDE)){
            storageService.moveFileToErrorFiles(filePath);
            versionDAO.deleteVersion( currentHospital,  currentVersion);
            throwExceptioAndDelete("The mapCDE is provided for the variable:  \""+variableCode+mapFunction+"\", while the mapFunction " +
                            "is missing","Both mapFunction and mapCDE should be provided for a proper mapping.","",currentHospital,currentVersion,harmonizedVersion,filePath);
            //throw new CustomException("The mapCDE is provided for the variable:  \""+variableCode+mapFunction+"\", while the mapFunction " +
            //        "is missing","Both mapFunction and mapCDE should be provided for a proper mapping.","");
        }
        // Only the map function is provided
        if(eitherEmptyOrNull(mapCDE)  && neitherEmptyNorNull(mapFunction)){
            storageService.moveFileToErrorFiles(filePath);
            versionDAO.deleteVersion( currentHospital,  currentVersion);
            throwExceptioAndDelete("The mapFunction is provided for the variable:  \""+variableCode+"\", while the mapCDE " +
                    "is missing","Both mapFunction and mapCDE should be provided for a proper mapping.","",currentHospital,currentVersion,harmonizedVersion,filePath);


        }

        // Both mapFunction and mapCDE are provided
        if(neitherEmptyNorNull(mapCDE) && neitherEmptyNorNull(mapFunction)){

            if(mapFunction.contains(",") && !mapFunction.contains("[") && !mapFunction.contains("]")){
                storageService.moveFileToErrorFiles(filePath);
                versionDAO.deleteVersion( currentHospital,  currentVersion);
                throwExceptioAndDelete("In the variable:  \""+variableCode+"\", the user is trying to provide multiple " +
                                "mapFunctions, since we have commas(,) but no square brackets([]) were found to separate them","",
                        "The proper format for mapping to multiple CDEs is: [mapFunction1],[mapFunction2] --> mapCDE1,mapCDE2",currentHospital,currentVersion,harmonizedVersion,filePath);



            }

            // check that we are mapping to multiple CDEs
            if(mapFunction.contains("]") && mapFunction.contains("[") && mapFunction.contains(",") && mapCDE.contains(",")){
                Pattern p = Pattern.compile("\\[(.*?)\\]");
                Matcher m = p.matcher(mapFunction);
                mapCDE = mapCDE.replaceAll("\\s+", "");
                String[] cc12Parts = mapCDE.split(",");


                int numOfMapFunctionsFound = 0;
                while (m.find())
                    numOfMapFunctionsFound++;

                int numOfMapCDEsFound = cc12Parts.length;

                if(numOfMapFunctionsFound != numOfMapCDEsFound){
                    storageService.moveFileToErrorFiles(filePath);
                    versionDAO.deleteVersion( currentHospital,  currentVersion);
                    throwExceptioAndDelete("The variable:  \""+variableCode+"\", has: "+numOfMapFunctionsFound+" mapFunctions " +
                                    "and "+numOfMapCDEsFound+" mapCDEs","",
                            "The proper format for mapping to multiple CDEs is: [mapFunction1],[mapFunction2] --> mapCDE1,mapCDE2",currentHospital,currentVersion,harmonizedVersion,filePath);

                    //throw new CustomException("The variable:  \""+variableCode+"\", has: "+numOfMapFunctionsFound+" mapFunctions " +
                    //        "and "+numOfMapCDEsFound+" mapCDEs","",
                     //       "The proper format for mapping to multiple CDEs is: [mapFunction1],[mapFunction2] --> mapCDE1,mapCDE2");
                }
            }

        }

        //

    }

    /**
     * Method that reads each cell of the excel file and saves their values in a new variable. Each row is referring to
     * a new variable and each column to a variable attribute. After the mapping, we save the variable and all connected
     * tables. Finally, we return a list with all variables found.
     */
    public Map<String,List<Variables>> Read_xlsx(String ff, Versions version, Hospitals hospital, Versions harmonizedVersion, String pathologyName) throws IOException {
        final DataFormatter df = new DataFormatter();
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
        //// Delete rows that have all columns empty
        //deleteEmptyExcelRows(sheet);

        Iterator rowIterator = sheet.iterator();
        while (rowIterator.hasNext()) {
            Row row = (Row) rowIterator.next();
            // validate that the column names are as required


            if (row.getRowNum() == 0){
                uploadCdes.validateColumnNames(row,ff,properColumnsNames);
                continue;//first row has column names
            }

            Iterator cellIterator = row.cellIterator();
            Variables newVar = new Variables();
            String mapFunction = null; // keep the value of the mapping function if it is not present
            boolean isVariableSaved = false; //check if the variable is saved during the cell iteration
            Cell cell = null;
            //while (cellIterator.hasNext()) {


            for (int i=0;i<properColumnsNames.length;i++){
                try {
                    cell = row.getCell(i);
                    System.out.println("Cell value is: "+cell.getStringCellValue()+" cell index:"+cell.getColumnIndex());
                }catch (NullPointerException e) {

                    cell = new CustomCell();
                    ((CustomCell) cell).setColumnIndex(i);
                    cell.setCellValue("");
                    System.out.println("Cell value is: "+cell.getStringCellValue()+" cell index:"+cell.getColumnIndex());
                }

                //Cell cell = (Cell) cellIterator.next();

                String cc9 = "";
                if (cell.getColumnIndex() == 0) //
                {
                    newVar.setCsvFile(cell.getStringCellValue());
                } else if (cell.getColumnIndex() == 1)
                    newVar.setName(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 2){
                    if( eitherEmptyOrNull(cell.getStringCellValue())){

                        //throw new CustomException("There are variables that have the field code empty.","Code cannot" +
                        //        " be empty","Please provide code for all the variables");

                        throwExceptioAndDelete("There variable at row: "+row.getRowNum()+" has the field code empty.","Code cannot" +
                                " be empty","Please provide code for all the variables",hospital,version,harmonizedVersion,ff);
                    }else{
                        newVar.setCode(cell.getStringCellValue());

                    }

                }

                else if (cell.getColumnIndex() == 3) {

                    if(cell.getStringCellValue()==null || cell.getStringCellValue().isEmpty()){
                        throwExceptioAndDelete("The variable with code: "+newVar.getCode()+" has no type","Type cannot" +
                                " be empty","Please provide type for all the variables",hospital,version,harmonizedVersion,ff);
                    }else{
                        newVar.setType(cell.getStringCellValue());
                    }


                }
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
                else if (cell.getColumnIndex() == 9){
                    newVar.setConceptPath(cell.getStringCellValue());
                    cc9 = cell.getStringCellValue();}
                else if (cell.getColumnIndex() == 10)
                    newVar.setMethodology(cell.getStringCellValue());
                else if (cell.getColumnIndex() == 11) {
                    if (cell.getStringCellValue() != null) {
                        mapFunction = cell.getStringCellValue();
                    } // keep the cell value only if the cell has value
                } else if (cell.getColumnIndex() == 12) {


                    String cc12 = cell.getStringCellValue();
                    //System.out.println("THE c12 CELL CONTAINS: " + cc12);
                    // The comma indicates that the user is inserting multiple elements
                    cc12 = cc12.replaceAll("\\s+","");
                    System.out.println("THE c12 CELL CONTAINS: " + cc12);
                    if (!cc12.equals("")) {

                        // Method that validates if the fields are proper in mapFunction, mapCDE
                        validataMapFunctionMapCDE(newVar.getCode(), mapFunction, cc12, newVar.getConceptPath(),ff,version,harmonizedVersion, hospital);

                        if (cc12.contains(",")) {
                            System.out.println("MAPPING TO MULTIPLE");
                            newVar = mappingToMultipleCdes(cc12, mapFunction, newVar, version, hospital,pathologyName);
                            isVariableSaved = true;
                        } else {
                            System.out.println("MAPPING TO SINGLE");
                            newVar = mappingToSingleCde(cc12, mapFunction, newVar, version, hospital,pathologyName);
                            isVariableSaved = true;
                        }
                    } else {//cell is empty
                        validataMapFunctionMapCDE(newVar.getCode(), mapFunction, cc12, newVar.getConceptPath(),ff,version,harmonizedVersion, hospital);
                        variableDAO.saveVersionToVariable(newVar, harmonizedVersion);
                        variableDAO.saveVersionToVariable(newVar, version);

                        List<Variables> hospVar = hospital.getVariables();
                        hospVar.add(newVar);
                        hospital.setVariables(hospVar);
/////////////////////////////////////////////////////////////////////////////////////// ADD PATHOLOGY
                        if(hospital.getPathology() == null){
                            Pathology pathology;
                            if(pathologyDAO.isPathologyPresent(pathologyName)){
                                 pathology = pathologyDAO.getPathologyByName(pathologyName);

                            }else{
                                 pathology = new Pathology(pathologyName);

                            }
                            List<Hospitals> hospitalsInPathology = pathology.getHospitals();
                            hospitalsInPathology.add(hospital);
                            pathologyDAO.save(pathology);
                            hospital.setPathology(pathology);


                        }
                        hospitalDAO.save(hospital);
                        newVar.setHospital(hospital);
                        variableDAO.save(newVar);
                        isVariableSaved = true;
                        System.out.println("SAVING BECAUSE CELL IS EMPTY");
                        ////
                        xlsxHarmonizedVars.add(newVar);
                    }

                }
                //System.out.println("this column index is : " + cell.getColumnIndex());

            }
            // Check if the variable already saved. If not save it. It might have not been saved if the 'mapFunction'
            //and 'mapCDE' are null and thus there is no 'cell.getColumnIndex()' for them.
            if (!isVariableSaved && newVar.getCode() != null && newVar.getCode() != "") {
                //System.out.println("Variable: "+newVar.getVariable_id()+newVar.getCode()+" is not saved.");
                variableDAO.saveVersionToVariable(newVar, harmonizedVersion);
                variableDAO.saveVersionToVariable(newVar, version);

                List<Variables> hospVar = hospital.getVariables();
                hospVar.add(newVar);
                hospital.setVariables(hospVar);
                /////////////////////////////////////////////////////////////////////////////////////// ADD PATHOLOGY
                if(hospital.getPathology() == null){
                    Pathology pathology;
                    if(pathologyDAO.isPathologyPresent(pathologyName)){
                        pathology = pathologyDAO.getPathologyByName(pathologyName);

                    }else{
                        pathology = new Pathology(pathologyName);

                    }
                    List<Hospitals> hospitalsInPathology = pathology.getHospitals();
                    hospitalsInPathology.add(hospital);
                    pathologyDAO.save(pathology);
                    hospital.setPathology(pathology);


                }
                hospitalDAO.save(hospital);
                newVar.setHospital(hospital);
                variableDAO.save(newVar);

                /////
                System.out.println("SAVING BECAUSE AFTER CHECK");
                xlsxHarmonizedVars.add(newVar);
            }else{
                System.out.println("Variable: "+newVar.getVariable_id()+newVar.getCode()+" is already saved.");
            }

            xlsxVars.add(newVar);


        }
        Map<String,List<Variables>> map =new HashMap();
        map.put("variables",xlsxVars);
        map.put("hvariables",xlsxHarmonizedVars);
        System.out.println("harmonized variables contain: "+xlsxHarmonizedVars);
        return map;
    }


    /**
     * Method that maps a single variable to multiple CDEs. First extract from the file all mapping functions and mapping
     * CDEs. Then search in the database for the CDEs. Finally, link all tables and save them.
     */
    public Variables mappingToMultipleCdes(String cc12, String cc11, Variables newVar, Versions version, Hospitals hospital, String pathologyName) {
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
            //CDEVariables cde = cdeVariableDAO.getCDEVariableByCode(cc12Parts[i]);
            CDEVariables cde = cdeVariableDAO.getCDEVariableByCodeAndPathologyName(cc12Parts[i],pathologyName);

            if (cde != null) {
                //System.out.println("The cdevariable has been retrieved " + cde + "and has concept path of:" + cde.getConceptPath());
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

            // !NOTE REMOVED THIS
            //newVar = variableDAO.compareVariables(newVar, cc11Parts, cc12Parts);

            List<Versions> currentVersions = newVar.getVersions();
            currentVersions.add(version);
            newVar.setVersions(currentVersions);
            List<Variables> hospVar = hospital.getVariables();
            hospVar.add(newVar);
            hospital.setVariables(hospVar);
            hospitalDAO.save(hospital);
            newVar.setHospital(hospital);
            variableDAO.save(newVar);
            //System.out.println("SAVED VARIABLE TO DATABASE");
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
            //!NOTE i REMOVED THIS
            //newVar = variableDAO.compareVariables(newVar,cc11Parts,cc12Parts);
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
    public Variables mappingToSingleCde(String cc12, String cc11, Variables newVar, Versions version, Hospitals hospital,
                                        String pathologyName) {
        System.out.println("MAPPING TO A SINGLE CDE");
        //Since we have a single mapping we should create the LIst containing only one element
        List<String> cc11Parts = new ArrayList<>();
        cc11Parts.add(cc11);
        String[] cc12Parts = new String[100];
        cc12Parts[0] = cc12;
        ////////////////////////////////////////////
        ////////////////////////////////////////////

        //CDEVariables cde = cdeVariableDAO.getCDEVariableByCode(cc12);
        CDEVariables cde = cdeVariableDAO.getCDEVariableByCodeAndPathologyName(cc12,pathologyName);
        if (cde != null) { //the cde variable exists
            System.out.println("The cdevariable has been retrieved and has concept path of:" + cde.getConceptPath());
            Functions functions = new Functions();

            //!NOTE i REMOVED THIS
            //newVar = variableDAO.compareVariables(newVar, cc11Parts,cc12Parts);

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
            //newVar = variableDAO.compareVariables(newVar,cc11Parts,cc12Parts);
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

    /** This is a method that checks whether all fields in a variable are empty. This in return means that the excel line
     * is empty and thus we should not take further actions.*/
    public boolean areAllVariablesFiledsEmpty(Variables variable){
        if(eitherEmptyOrNull(variable.getCode()) && eitherEmptyOrNull(variable.getConceptPath()) &&
                eitherEmptyOrNull(variable.getType()) && eitherEmptyOrNull(variable.getCsvFile())
                && eitherEmptyOrNull(variable.getName()) && eitherEmptyOrNull(variable.getValues()) &&
                eitherEmptyOrNull(variable.getUnit()) && eitherEmptyOrNull(variable.getCanBeNull()) &&
                eitherEmptyOrNull(variable.getDescription()) && eitherEmptyOrNull(variable.getComments()) &&
                eitherEmptyOrNull(variable.getMethodology())){
            return true;
        }else {
            return false;
        }
    }


    public static boolean eitherEmptyOrNull(String field) {
        if (field == null || field.equals("")) {
            return true;
        } else {
            return false;
        }
    }

    public static boolean neitherEmptyNorNull(String field) {
        if (field != null && !field.equals("") && !field.isEmpty()) {
            return true;
        } else {
            return false;
        }
    }

    public void throwExceptioAndDelete(String exceMessage,String exceDetails, String exceNextSteps,Hospitals hospital,
                                       Versions version, Versions harmonizedVersion, String filePath){
        storageService.moveFileToErrorFiles(filePath);
        if(hospital==null){
            versionDAO.deleteVersion(version);
        }else {
            versionDAO.deleteVersion(hospital,version);
            versionDAO.deleteVersion(hospital,harmonizedVersion);
        }
        throw new CustomException(exceMessage, exceDetails, exceNextSteps);
    }


    public void deleteEmptyExcelRows(Sheet sheet){
        for(int i = 0; i < sheet.getLastRowNum(); i++){
            if(checkIfRowIsEmpty(sheet.getRow(i))){
                sheet.shiftRows(i + 1, sheet.getLastRowNum(), -1);
                i--;//Adjusts the sweep in accordance to a row removal
            }
        }

    }

        private boolean checkIfRowIsEmpty(Row row){
            if (row == null) {
                return true;
            }
            if (row.getLastCellNum() <= 0) {
                return true;
            }
            for (int cellNum = row.getFirstCellNum(); cellNum < row.getLastCellNum(); cellNum++) {
                Cell cell = row.getCell(cellNum);
                if (cell != null && cell.getCellType() != Cell.CELL_TYPE_BLANK && StringUtils.isNotBlank(cell.toString())) {
                    return false;
                }
            }
            return true;
        }

}
