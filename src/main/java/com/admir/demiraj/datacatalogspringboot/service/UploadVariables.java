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
public class UploadVariables {


    private final String dataList = "{\n" +
            "    \"code\": \"root\",\n" +
            "    \"groups\": [\n" +
            "      {\n" +
            "        \"code\": \"genetic\",\n" +
            "        \"groups\": [\n" +
            "          {\n" +
            "            \"code\": \"polymorphism\",\n" +
            "            \"label\": \"polymorphism\",\n" +
            "            \"groups\": [\n" +
            "              {\n" +
            "                \"code\": \"apoe4\",\n" +
            "                \"description\": \"Apolipoprotein E (APOE) e4 allele: is the strongest risk factor for Late Onset Alzheimer Disease (LOAD). At least one copy of APOE-e4 \",\n" +
            "                \"enumerations\": [\n" +
            "                  {\n" +
            "                    \"code\": 0,\n" +
            "                    \"label\": 0\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 1,\n" +
            "                    \"label\": 1\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 2,\n" +
            "                    \"label\": 2\n" +
            "                  }\n" +
            "                ],\n" +
            "                \"label\": \"ApoE4\",\n" +
            "                \"methodology\": \"adni-merge\",\n" +
            "                \"sql_type\": \"int\",\n" +
            "                \"type\": \"polynominal\"\n" +
            "              },\n" +
            "              {\n" +
            "                \"code\": \"rs3818361_t\",\n" +
            "                \"description\": \"\",\n" +
            "                \"enumerations\": [\n" +
            "                  {\n" +
            "                    \"code\": 0,\n" +
            "                    \"label\": 0\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 1,\n" +
            "                    \"label\": 1\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 2,\n" +
            "                    \"label\": 2\n" +
            "                  }\n" +
            "                ],\n" +
            "                \"label\": \"rs3818361_T\",\n" +
            "                \"methodology\": \"lren-nmm-volumes\",\n" +
            "                \"sql_type\": \"int\",\n" +
            "                \"type\": \"polynominal\"\n" +
            "              },\n" +
            "              {\n" +
            "                \"code\": \"rs744373_c\",\n" +
            "                \"description\": \"\",\n" +
            "                \"enumerations\": [\n" +
            "                  {\n" +
            "                    \"code\": 0,\n" +
            "                    \"label\": 0\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 1,\n" +
            "                    \"label\": 1\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 2,\n" +
            "                    \"label\": 2\n" +
            "                  }\n" +
            "                ],\n" +
            "                \"label\": \"rs744373_C\",\n" +
            "                \"methodology\": \"lren-nmm-volumes\",\n" +
            "                \"sql_type\": \"int\",\n" +
            "                \"type\": \"polynominal\"\n" +
            "              },\n" +
            "              {\n" +
            "                \"code\": \"rs190982_g\",\n" +
            "                \"description\": \"\",\n" +
            "                \"enumerations\": [\n" +
            "                  {\n" +
            "                    \"code\": 0,\n" +
            "                    \"label\": 0\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 1,\n" +
            "                    \"label\": 1\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 2,\n" +
            "                    \"label\": 2\n" +
            "                  }\n" +
            "                ],\n" +
            "                \"label\": \"rs190982_G\",\n" +
            "                \"methodology\": \"lren-nmm-volumes\",\n" +
            "                \"sql_type\": \"int\",\n" +
            "                \"type\": \"polynominal\"\n" +
            "              },\n" +
            "              {\n" +
            "                \"code\": \"rs1476679_c\",\n" +
            "                \"description\": \"\",\n" +
            "                \"enumerations\": [\n" +
            "                  {\n" +
            "                    \"code\": 0,\n" +
            "                    \"label\": 0\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 1,\n" +
            "                    \"label\": 1\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 2,\n" +
            "                    \"label\": 2\n" +
            "                  }\n" +
            "                ],\n" +
            "                \"label\": \"rs1476679_C\",\n" +
            "                \"methodology\": \"lren-nmm-volumes\",\n" +
            "                \"sql_type\": \"int\",\n" +
            "                \"type\": \"polynominal\"\n" +
            "              },\n" +
            "              {\n" +
            "                \"code\": \"rs11767557_c\",\n" +
            "                \"description\": \"\",\n" +
            "                \"enumerations\": [\n" +
            "                  {\n" +
            "                    \"code\": 0,\n" +
            "                    \"label\": 0\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 1,\n" +
            "                    \"label\": 1\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 2,\n" +
            "                    \"label\": 2\n" +
            "                  }\n" +
            "                ],\n" +
            "                \"label\": \"rs11767557_C\",\n" +
            "                \"methodology\": \"lren-nmm-volumes\",\n" +
            "                \"sql_type\": \"int\",\n" +
            "                \"type\": \"polynominal\"\n" +
            "              },\n" +
            "              {\n" +
            "                \"code\": \"rs11136000_t\",\n" +
            "                \"description\": \"\",\n" +
            "                \"enumerations\": [\n" +
            "                  {\n" +
            "                    \"code\": 0,\n" +
            "                    \"label\": 0\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 1,\n" +
            "                    \"label\": 1\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 2,\n" +
            "                    \"label\": 2\n" +
            "                  }\n" +
            "                ],\n" +
            "                \"label\": \"rs11136000_T\",\n" +
            "                \"methodology\": \"lren-nmm-volumes\",\n" +
            "                \"sql_type\": \"int\",\n" +
            "                \"type\": \"polynominal\"\n" +
            "              },\n" +
            "              {\n" +
            "                \"code\": \"rs610932_a\",\n" +
            "                \"description\": \"\",\n" +
            "                \"enumerations\": [\n" +
            "                  {\n" +
            "                    \"code\": 0,\n" +
            "                    \"label\": 0\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 1,\n" +
            "                    \"label\": 1\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 2,\n" +
            "                    \"label\": 2\n" +
            "                  }\n" +
            "                ],\n" +
            "                \"label\": \"rs610932_A\",\n" +
            "                \"methodology\": \"lren-nmm-volumes\",\n" +
            "                \"sql_type\": \"int\",\n" +
            "                \"type\": \"polynominal\"\n" +
            "              },\n" +
            "              {\n" +
            "                \"code\": \"rs3851179_a\",\n" +
            "                \"description\": \"\",\n" +
            "                \"enumerations\": [\n" +
            "                  {\n" +
            "                    \"code\": 0,\n" +
            "                    \"label\": 0\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 1,\n" +
            "                    \"label\": 1\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 2,\n" +
            "                    \"label\": 2\n" +
            "                  }\n" +
            "                ],\n" +
            "                \"label\": \"rs3851179_A\",\n" +
            "                \"methodology\": \"lren-nmm-volumes\",\n" +
            "                \"sql_type\": \"int\",\n" +
            "                \"type\": \"polynominal\"\n" +
            "              },\n" +
            "              {\n" +
            "                \"code\": \"rs17125944_c\",\n" +
            "                \"description\": \"\",\n" +
            "                \"enumerations\": [\n" +
            "                  {\n" +
            "                    \"code\": 0,\n" +
            "                    \"label\": 0\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 1,\n" +
            "                    \"label\": 1\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 2,\n" +
            "                    \"label\": 2\n" +
            "                  }\n" +
            "                ],\n" +
            "                \"label\": \"rs17125944_C\",\n" +
            "                \"methodology\": \"lren-nmm-volumes\",\n" +
            "                \"sql_type\": \"int\",\n" +
            "                \"type\": \"polynominal\"\n" +
            "              },\n" +
            "              {\n" +
            "                \"code\": \"rs10498633_t\",\n" +
            "                \"description\": \"\",\n" +
            "                \"enumerations\": [\n" +
            "                  {\n" +
            "                    \"code\": 0,\n" +
            "                    \"label\": 0\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 1,\n" +
            "                    \"label\": 1\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 2,\n" +
            "                    \"label\": 2\n" +
            "                  }\n" +
            "                ],\n" +
            "                \"label\": \"rs10498633_T\",\n" +
            "                \"methodology\": \"lren-nmm-volumes\",\n" +
            "                \"sql_type\": \"int\",\n" +
            "                \"type\": \"polynominal\"\n" +
            "              },\n" +
            "              {\n" +
            "                \"code\": \"rs3764650_g\",\n" +
            "                \"description\": \"\",\n" +
            "                \"enumerations\": [\n" +
            "                  {\n" +
            "                    \"code\": 0,\n" +
            "                    \"label\": 0\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 1,\n" +
            "                    \"label\": 1\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 2,\n" +
            "                    \"label\": 2\n" +
            "                  }\n" +
            "                ],\n" +
            "                \"label\": \"rs3764650_G\",\n" +
            "                \"methodology\": \"lren-nmm-volumes\",\n" +
            "                \"sql_type\": \"int\",\n" +
            "                \"type\": \"polynominal\"\n" +
            "              },\n" +
            "              {\n" +
            "                \"code\": \"rs3865444_t\",\n" +
            "                \"description\": \"\",\n" +
            "                \"enumerations\": [\n" +
            "                  {\n" +
            "                    \"code\": 0,\n" +
            "                    \"label\": 0\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 1,\n" +
            "                    \"label\": 1\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 2,\n" +
            "                    \"label\": 2\n" +
            "                  }\n" +
            "                ],\n" +
            "                \"label\": \"rs3865444_T\",\n" +
            "                \"methodology\": \"lren-nmm-volumes\",\n" +
            "                \"sql_type\": \"int\",\n" +
            "                \"type\": \"polynominal\"\n" +
            "              },\n" +
            "              {\n" +
            "                \"code\": \"rs2718058_g\",\n" +
            "                \"description\": \"\",\n" +
            "                \"enumerations\": [\n" +
            "                  {\n" +
            "                    \"code\": 0,\n" +
            "                    \"label\": 0\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 1,\n" +
            "                    \"label\": 1\n" +
            "                  },\n" +
            "                  {\n" +
            "                    \"code\": 2,\n" +
            "                    \"label\": 2\n" +
            "                  }\n" +
            "                ],\n" +
            "                \"label\": \"rs2718058_G\",\n" +
            "                \"methodology\": \"lren-nmm-volumes\",\n" +
            "                \"sql_type\": \"int\",\n" +
            "                \"type\": \"polynominal\"\n" +
            "              }\n" +
            "            ]\n" +
            "          },\n" +
            "\n" +
            "        ],\n" +
            "        \"label\": \"Genetic\"\n" +
            "      },\n" +
            "      {\n" +
            "        \"code\": \"pet\",\n" +
            "        \"label\": \"PET - Positron Emission Tomography\",\n" +
            "        \"groups\": [\n" +
            "          {\n" +
            "            \"code\": \"fdg\",\n" +
            "            \"description\": \" Average FDG-PET of angular, temporal, and posterior cingulate. Most important hypometabolic regions that are indicative of pathological metabolic change in MCI and AD.\",\n" +
            "            \"label\": \"FDG-PET\",\n" +
            "            \"methodology\": \"adni-merge\",\n" +
            "            \"type\": \"real\"\n" +
            "          },\n" +
            "          {\n" +
            "            \"code\": \"pib\",\n" +
            "            \"description\": \"Average PIB SUVR of frontal cortex, anterior cingulate, precuneus cortex, and parietal cortex.\",\n" +
            "            \"label\": \"PIB\",\n" +
            "            \"methodology\": \"adni-merge\",\n" +
            "            \"type\": \"real\"\n" +
            "          },\n" +
            "          {\n" +
            "            \"code\": \"av45\",\n" +
            "            \"description\": \"AV45 Average AV45 SUVR of frontal, anterior cingulate, precuneus, and parietal cortex relative to the cerebellum\",\n" +
            "            \"label\": \"AV45\",\n" +
            "            \"methodology\": \"adni-merge\",\n" +
            "            \"type\": \"real\"\n" +
            "          }\n" +
            "        ]\n" +
            "      }]}";
    private static final String FOLDER_NAME = System.getProperty("user.dir") + "/src/main/resources/data/variables/";


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
                       //////////////////////////////////////////// added to test the vizualization
                       version.setJsonString(dataList);
                       //////////////////////////////////////////////////////////////
                       versionDAO.saveVersion(version);
                       String filePath = FOLDER_NAME + listOfFiles[i].getName();
                       readExcelSaveToVariabe(filePath, version, currentHospital);

                   }
                //The hospital doesn't exist
                }else{
                    Hospitals createdHospital = new Hospitals(hospitalName);
                    hospitalDAO.save(createdHospital);

                    Versions version = new Versions(versionName);
                    /////////////////////////////////// added to test the vizualization
                    version.setJsonString(dataList);
                    /////////////////////////////////////////
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
                                variable.setConceptPath(currentCell.getStringCellValue());
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
