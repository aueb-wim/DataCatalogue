package com.admir.demiraj.datacatalogspringboot.service;


import com.admir.demiraj.datacatalogspringboot.dao.*;
import com.admir.demiraj.datacatalogspringboot.resources.*;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.Lob;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Iterator;

@Service
public class UploadCdes {

    private static final String FOLDER_NAME = System.getProperty("user.dir") + "/src/main/resources/data/cdes/";


    @Autowired
    private CDEVariableDAO cdeVariableDAO;


    @Autowired
    private VersionDAO versionDAO;

    @Autowired
    private FunctionsDAO functionsDAO;


    public void readExcelFile(){
        File folder = new File(FOLDER_NAME);
        // Get all the files from the folder
        File[] listOfFiles = folder.listFiles();
        System.out.println("The total files found are: "+listOfFiles.length);
        for (int i = 0; i < listOfFiles.length; i++) {
            if (listOfFiles[i].isFile()) {
                //Split the file name in hospital_name and version_name
                String[] parts = listOfFiles[i].getName().split("_");
                String[] parts2 = parts[1].toString().split("\\.");
                String versionName = parts2[0];
                //The cdeversion already exists
                if(cdeVariableDAO.isCdeVersionPresent(versionName)){
                    System.out.println("This version already exists");
                //The cdeversion does not exist
                }else{
                    Versions version = new Versions(versionName);
                    versionDAO.saveVersion(version);

                    String filePath = FOLDER_NAME + listOfFiles[i].getName();
                    readExcelSaveToVariabe(filePath, version);

                }

            }
        }

    }



    public void readExcelSaveToVariabe(String filePath, Versions version){

        FileInputStream excelFile = null;
        try {
            excelFile = new FileInputStream(new File(filePath));
            Workbook workbook = new XSSFWorkbook(excelFile);
            for(int i = 0; i<workbook.getNumberOfSheets(); i++) {
                Sheet datatypeSheet = workbook.getSheetAt(i);
                Iterator<Row> iterator = datatypeSheet.iterator();
                //Ignore first row since it is the header
                Row currentRow = iterator.next();
                System.out.println("Tab name: "+datatypeSheet.getSheetName());
                while (iterator.hasNext()) {
                    System.out.println("ITTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
                    CDEVariables cdeVariables = new CDEVariables();
                    Functions function = new Functions("same","Does not change");
                    functionsDAO.save(function);
                    cdeVariableDAO.saveFunctionToCDEVariable(cdeVariables, function);
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
                                cdeVariables.setCode(currentCell.getStringCellValue());
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
                        }


                    }
                    cdeVariableDAO.saveVersionToCDEVariable(cdeVariables, version);
                    cdeVariableDAO.save(cdeVariables);

                }
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
