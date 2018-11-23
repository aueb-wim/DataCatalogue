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

    private final String dataList = "{\n" +
            "        \"code\": \"root\",\n" +
            "                \"groups\": [\n" +
            "        {\n" +
            "            \"code\": \"genetic\",\n" +
            "                \"groups\": [\n" +
            "            {\n" +
            "                \"code\": \"polymorphism\",\n" +
            "                    \"label\": \"polymorphism\",\n" +
            "                    \"groups\": [\n" +
            "                {\n" +
            "                    \"code\": \"apoe4\",\n" +
            "                        \"description\": \"Apolipoprotein E (APOE) e4 allele: is the strongest risk factor for Late Onset Alzheimer Disease (LOAD). At least one copy of APOE-e4 \",\n" +
            "                        \"enumerations\": [\n" +
            "                    {\n" +
            "                        \"code\": 0,\n" +
            "                            \"label\": 0\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 1,\n" +
            "                            \"label\": 1\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 2,\n" +
            "                            \"label\": 2\n" +
            "                    }\n" +
            "                ],\n" +
            "                    \"label\": \"ApoE4\",\n" +
            "                        \"methodology\": \"adni-merge\",\n" +
            "                        \"sql_type\": \"int\",\n" +
            "                        \"type\": \"polynominal\"\n" +
            "                },\n" +
            "                {\n" +
            "                    \"code\": \"rs3818361_t\",\n" +
            "                        \"description\": \"\",\n" +
            "                        \"enumerations\": [\n" +
            "                    {\n" +
            "                        \"code\": 0,\n" +
            "                            \"label\": 0\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 1,\n" +
            "                            \"label\": 1\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 2,\n" +
            "                            \"label\": 2\n" +
            "                    }\n" +
            "                ],\n" +
            "                    \"label\": \"rs3818361_T\",\n" +
            "                        \"methodology\": \"lren-nmm-volumes\",\n" +
            "                        \"sql_type\": \"int\",\n" +
            "                        \"type\": \"polynominal\"\n" +
            "                },\n" +
            "                {\n" +
            "                    \"code\": \"rs744373_c\",\n" +
            "                        \"description\": \"\",\n" +
            "                        \"enumerations\": [\n" +
            "                    {\n" +
            "                        \"code\": 0,\n" +
            "                            \"label\": 0\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 1,\n" +
            "                            \"label\": 1\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 2,\n" +
            "                            \"label\": 2\n" +
            "                    }\n" +
            "                ],\n" +
            "                    \"label\": \"rs744373_C\",\n" +
            "                        \"methodology\": \"lren-nmm-volumes\",\n" +
            "                        \"sql_type\": \"int\",\n" +
            "                        \"type\": \"polynominal\"\n" +
            "                },\n" +
            "                {\n" +
            "                    \"code\": \"rs190982_g\",\n" +
            "                        \"description\": \"\",\n" +
            "                        \"enumerations\": [\n" +
            "                    {\n" +
            "                        \"code\": 0,\n" +
            "                            \"label\": 0\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 1,\n" +
            "                            \"label\": 1\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 2,\n" +
            "                            \"label\": 2\n" +
            "                    }\n" +
            "                ],\n" +
            "                    \"label\": \"rs190982_G\",\n" +
            "                        \"methodology\": \"lren-nmm-volumes\",\n" +
            "                        \"sql_type\": \"int\",\n" +
            "                        \"type\": \"polynominal\"\n" +
            "                },\n" +
            "                {\n" +
            "                    \"code\": \"rs1476679_c\",\n" +
            "                        \"description\": \"\",\n" +
            "                        \"enumerations\": [\n" +
            "                    {\n" +
            "                        \"code\": 0,\n" +
            "                            \"label\": 0\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 1,\n" +
            "                            \"label\": 1\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 2,\n" +
            "                            \"label\": 2\n" +
            "                    }\n" +
            "                ],\n" +
            "                    \"label\": \"rs1476679_C\",\n" +
            "                        \"methodology\": \"lren-nmm-volumes\",\n" +
            "                        \"sql_type\": \"int\",\n" +
            "                        \"type\": \"polynominal\"\n" +
            "                },\n" +
            "                {\n" +
            "                    \"code\": \"rs11767557_c\",\n" +
            "                        \"description\": \"\",\n" +
            "                        \"enumerations\": [\n" +
            "                    {\n" +
            "                        \"code\": 0,\n" +
            "                            \"label\": 0\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 1,\n" +
            "                            \"label\": 1\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 2,\n" +
            "                            \"label\": 2\n" +
            "                    }\n" +
            "                ],\n" +
            "                    \"label\": \"rs11767557_C\",\n" +
            "                        \"methodology\": \"lren-nmm-volumes\",\n" +
            "                        \"sql_type\": \"int\",\n" +
            "                        \"type\": \"polynominal\"\n" +
            "                },\n" +
            "                {\n" +
            "                    \"code\": \"rs11136000_t\",\n" +
            "                        \"description\": \"\",\n" +
            "                        \"enumerations\": [\n" +
            "                    {\n" +
            "                        \"code\": 0,\n" +
            "                            \"label\": 0\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 1,\n" +
            "                            \"label\": 1\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 2,\n" +
            "                            \"label\": 2\n" +
            "                    }\n" +
            "                ],\n" +
            "                    \"label\": \"rs11136000_T\",\n" +
            "                        \"methodology\": \"lren-nmm-volumes\",\n" +
            "                        \"sql_type\": \"int\",\n" +
            "                        \"type\": \"polynominal\"\n" +
            "                },\n" +
            "                {\n" +
            "                    \"code\": \"rs610932_a\",\n" +
            "                        \"description\": \"\",\n" +
            "                        \"enumerations\": [\n" +
            "                    {\n" +
            "                        \"code\": 0,\n" +
            "                            \"label\": 0\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 1,\n" +
            "                            \"label\": 1\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 2,\n" +
            "                            \"label\": 2\n" +
            "                    }\n" +
            "                ],\n" +
            "                    \"label\": \"rs610932_A\",\n" +
            "                        \"methodology\": \"lren-nmm-volumes\",\n" +
            "                        \"sql_type\": \"int\",\n" +
            "                        \"type\": \"polynominal\"\n" +
            "                },\n" +
            "                {\n" +
            "                    \"code\": \"rs3851179_a\",\n" +
            "                        \"description\": \"\",\n" +
            "                        \"enumerations\": [\n" +
            "                    {\n" +
            "                        \"code\": 0,\n" +
            "                            \"label\": 0\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 1,\n" +
            "                            \"label\": 1\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 2,\n" +
            "                            \"label\": 2\n" +
            "                    }\n" +
            "                ],\n" +
            "                    \"label\": \"rs3851179_A\",\n" +
            "                        \"methodology\": \"lren-nmm-volumes\",\n" +
            "                        \"sql_type\": \"int\",\n" +
            "                        \"type\": \"polynominal\"\n" +
            "                },\n" +
            "                {\n" +
            "                    \"code\": \"rs17125944_c\",\n" +
            "                        \"description\": \"\",\n" +
            "                        \"enumerations\": [\n" +
            "                    {\n" +
            "                        \"code\": 0,\n" +
            "                            \"label\": 0\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 1,\n" +
            "                            \"label\": 1\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 2,\n" +
            "                            \"label\": 2\n" +
            "                    }\n" +
            "                ],\n" +
            "                    \"label\": \"rs17125944_C\",\n" +
            "                        \"methodology\": \"lren-nmm-volumes\",\n" +
            "                        \"sql_type\": \"int\",\n" +
            "                        \"type\": \"polynominal\"\n" +
            "                },\n" +
            "                {\n" +
            "                    \"code\": \"rs10498633_t\",\n" +
            "                        \"description\": \"\",\n" +
            "                        \"enumerations\": [\n" +
            "                    {\n" +
            "                        \"code\": 0,\n" +
            "                            \"label\": 0\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 1,\n" +
            "                            \"label\": 1\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 2,\n" +
            "                            \"label\": 2\n" +
            "                    }\n" +
            "                ],\n" +
            "                    \"label\": \"rs10498633_T\",\n" +
            "                        \"methodology\": \"lren-nmm-volumes\",\n" +
            "                        \"sql_type\": \"int\",\n" +
            "                        \"type\": \"polynominal\"\n" +
            "                },\n" +
            "                {\n" +
            "                    \"code\": \"rs3764650_g\",\n" +
            "                        \"description\": \"\",\n" +
            "                        \"enumerations\": [\n" +
            "                    {\n" +
            "                        \"code\": 0,\n" +
            "                            \"label\": 0\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 1,\n" +
            "                            \"label\": 1\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 2,\n" +
            "                            \"label\": 2\n" +
            "                    }\n" +
            "                ],\n" +
            "                    \"label\": \"rs3764650_G\",\n" +
            "                        \"methodology\": \"lren-nmm-volumes\",\n" +
            "                        \"sql_type\": \"int\",\n" +
            "                        \"type\": \"polynominal\"\n" +
            "                },\n" +
            "                {\n" +
            "                    \"code\": \"rs3865444_t\",\n" +
            "                        \"description\": \"\",\n" +
            "                        \"enumerations\": [\n" +
            "                    {\n" +
            "                        \"code\": 0,\n" +
            "                            \"label\": 0\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 1,\n" +
            "                            \"label\": 1\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 2,\n" +
            "                            \"label\": 2\n" +
            "                    }\n" +
            "                ],\n" +
            "                    \"label\": \"rs3865444_T\",\n" +
            "                        \"methodology\": \"lren-nmm-volumes\",\n" +
            "                        \"sql_type\": \"int\",\n" +
            "                        \"type\": \"polynominal\"\n" +
            "                },\n" +
            "                {\n" +
            "                    \"code\": \"rs2718058_g\",\n" +
            "                        \"description\": \"\",\n" +
            "                        \"enumerations\": [\n" +
            "                    {\n" +
            "                        \"code\": 0,\n" +
            "                            \"label\": 0\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 1,\n" +
            "                            \"label\": 1\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"code\": 2,\n" +
            "                            \"label\": 2\n" +
            "                    }\n" +
            "                ],\n" +
            "                    \"label\": \"rs2718058_G\",\n" +
            "                        \"methodology\": \"lren-nmm-volumes\",\n" +
            "                        \"sql_type\": \"int\",\n" +
            "                        \"type\": \"polynominal\"\n" +
            "                }\n" +
            "            ]\n" +
            "            },\n" +
            "\n" +
            "        ],\n" +
            "            \"label\": \"Genetic\"\n" +
            "        },\n" +
            "        {\n" +
            "            \"code\": \"pet\",\n" +
            "                \"label\": \"PET - Positron Emission Tomography\",\n" +
            "                \"groups\": [\n" +
            "            {\n" +
            "                \"code\": \"fdg\",\n" +
            "                    \"description\": \" Average FDG-PET of angular, temporal, and posterior cingulate. Most important hypometabolic regions that are indicative of pathological metabolic change in MCI and AD.\",\n" +
            "                    \"label\": \"FDG-PET\",\n" +
            "                    \"methodology\": \"adni-merge\",\n" +
            "                    \"type\": \"real\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"code\": \"pib\",\n" +
            "                    \"description\": \"Average PIB SUVR of frontal cortex, anterior cingulate, precuneus cortex, and parietal cortex.\",\n" +
            "                    \"label\": \"PIB\",\n" +
            "                    \"methodology\": \"adni-merge\",\n" +
            "                    \"type\": \"real\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"code\": \"av45\",\n" +
            "                    \"description\": \"AV45 Average AV45 SUVR of frontal, anterior cingulate, precuneus, and parietal cortex relative to the cerebellum\",\n" +
            "                    \"label\": \"AV45\",\n" +
            "                    \"methodology\": \"adni-merge\",\n" +
            "                    \"type\": \"real\"\n" +
            "            }\n" +
            "        ]\n" +
            "        }]}";

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
                    /////////////////////////////////////////
                    version.setJsonString(dataList);
                    //////////////////////////////////
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
