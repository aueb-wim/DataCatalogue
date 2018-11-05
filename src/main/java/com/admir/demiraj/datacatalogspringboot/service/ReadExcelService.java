package com.admir.demiraj.datacatalogspringboot.service;

import com.admir.demiraj.datacatalogspringboot.dao.HospitalDAO;
import com.admir.demiraj.datacatalogspringboot.dao.VariableDAO;
import com.admir.demiraj.datacatalogspringboot.dao.VersionDAO;
import com.admir.demiraj.datacatalogspringboot.resources.Hospitals;
import com.admir.demiraj.datacatalogspringboot.resources.Variables;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Iterator;

@Service
public class ReadExcelService {

    private static final String FOLDER_NAME = System.getProperty("user.dir") + "/src/main/resources/data/";


    @Autowired
    private HospitalDAO hospitalDAO;

    @Autowired
    private VersionDAO versionDAO;

    @Autowired
    private VariableDAO variableDAO;


    public void readExcelFile(){
        File folder = new File(FOLDER_NAME);
        // Get all the files from the folder
        File[] listOfFiles = folder.listFiles();

        for (int i = 0; i < listOfFiles.length; i++) {
            if (listOfFiles[i].isFile()) {
                //Split the file name in hospital_name and version_name
                String[] parts = listOfFiles[i].getName().split("_");
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
                       Versions version = new Versions(versionName);
                       versionDAO.saveVersion(version);
                       String filePath = FOLDER_NAME + listOfFiles[i].getName();
                       readExcelSaveToVariabe(filePath, version, currentHospital);

                   }
                //The hospital doesn't exist
                }else{
                    Hospitals createdHospital = new Hospitals(hospitalName);
                    hospitalDAO.save(createdHospital);

                    Versions version = new Versions(versionName);
                    versionDAO.saveVersion(version);

                    String filePath = FOLDER_NAME + listOfFiles[i].getName();
                    readExcelSaveToVariabe(filePath, version, createdHospital);

                }


            }
        }

    }



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
                System.out.println("Tab name: "+datatypeSheet.getSheetName());
                while (iterator.hasNext()) {
                    Variables variable = new Variables();
                    currentRow = iterator.next();
                    Iterator<Cell> cellIterator = currentRow.iterator();
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
                                variable.setType(currentCell.getStringCellValue());
                                break;
                            case 3:
                                variable.setValues(currentCell.getStringCellValue());
                                break;
                            case 4:
                                variable.setUnit(currentCell.getStringCellValue());
                                break;
                            case 5:
                                variable.setCanBeNull(currentCell.getStringCellValue());
                                break;
                            case 6:
                                variable.setDescription(currentCell.getStringCellValue());
                                break;
                            case 7:
                                variable.setComments(currentCell.getStringCellValue());
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

}
