package com.admir.demiraj.datacatalogspringboot.service;


import com.admir.demiraj.datacatalogspringboot.dao.*;
import com.admir.demiraj.datacatalogspringboot.resources.*;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.List;


@Service
public class UploadReports {

    private static final String BATCH_REPORT_FOLDER = System.getProperty("user.dir") + "/src/main/resources/data/reports/batch/";
    private static final String VARIABLE_REPORT_FOLDER = System.getProperty("user.dir") + "/src/main/resources/data/reports/variable/";

    @Autowired
    BatchReportDAO batchReportDAO;

    @Autowired
    FileReportDAO fileReportDAO;

    @Autowired
    VariableReportDAO variableReportDAO;


    @Autowired
    VariableDAO variableDAO;

    @Autowired
    VersionDAO versionDAO;

    public void uploadAllReports() {
        File folder = new File(BATCH_REPORT_FOLDER);
        // Get all the files from the folder
        File[] listOfFiles = folder.listFiles();
        System.out.println("Inside readCsvFile2");

        for (int i = 0; i < listOfFiles.length; i++) {
            System.out.println("Inside for");

            System.out.println("Inside if is a file");
            String fileName = listOfFiles[i].getName();
            String filePath = BATCH_REPORT_FOLDER + fileName;
            String[] parts = fileName.split("_");
            System.out.println("Parts[0] : " + parts[0]);
            System.out.println("fileName : " + fileName);
            String batchName = parts[0];
            String batchNumber = parts[1];
            String hospitalName = parts[2].toString().split("\\.")[0];
            System.out.println("HospitalName: " + hospitalName);

            String expectedVariableReportFile = "variableReport_" + batchNumber + "_" + hospitalName + ".csv";
            boolean check = new File(VARIABLE_REPORT_FOLDER, expectedVariableReportFile).exists();
            System.out.println("Expected variable report file: " + expectedVariableReportFile);
            System.out.println("Searching for : " + VARIABLE_REPORT_FOLDER + expectedVariableReportFile);

            if (check) {
                System.out.println("Expected vr file was found");
                try {
                    //NOTE ! WE ARE ADDING TO ALL VERSIONS OF A PARTICULAR HOSPITAL REPORT. WHEN WE HAVE ACTUAL DATA WE NEED TO SPECIFY ONLY ONE VERSION
                    List<Versions> allVersionPerHospital = versionDAO.getAllVersionByHospitalName(hospitalName);
                    for (Versions version : allVersionPerHospital) {
                        System.out.println("Version found: " + hospitalName + " :" + version.getName());
                        BatchReport batchReport = new BatchReport(batchName, batchNumber);
                        List<FileReport> allFileReports = readBatchReportCsv(filePath);
                        readVariableReportCsv(VARIABLE_REPORT_FOLDER + expectedVariableReportFile, batchNumber, batchReport, allFileReports, version);
                    }


                } catch (IOException ioe) {
                    System.out.println(ioe);
                }
            }
        }
    }

    public List<FileReport> readBatchReportCsv(String csvFile) throws IOException {
        Reader in = new FileReader(csvFile);
        //Iterable<CSVRecord> records = CSVFormat.DEFAULT.parse(in);
        Iterable<CSVRecord> records = CSVFormat.DEFAULT.withFirstRecordAsHeader().parse(in);
        //BatchReport batchReport = new BatchReport(batchName, batchNumber);
        List<FileReport> allFileReports = new ArrayList<>();
        for (CSVRecord record : records) {
            FileReport fileReport = new FileReport(record.get(0), record.get(1), record.get(2),
                   record.get(3), record.get(4), record.get(5), record.get(6), record.get(7), record.get(8), record.get(9),
                    record.get(10), record.get(11), record.get(12), record.get(13));
           // System.out.println("Records are: "+record.get(0)+ record.get(1)+ record.get(2)+ record.get(3)+record.get(4)+record.get(5)+record.get(6)+record.get(7)+record.get(8)+record.get(9)+record.get(10)+record.get(11)+record.get(12)+record.get(13));
            //FileReport fileReport = new FileReport();
            //System.out.println("File report id: "+fileReport.getFilereport_id());
            //fileReport.setBatchReport(batchReport);
            //batchReport.setFileReport2(fileReport);
            //batchReportDAO.save(batchReport);
            //fileReportDAO.save(fileReport);
            allFileReports.add(fileReport);
        }
//batchReportDAO.save(batchReport);
        return allFileReports;
    }


    public void readVariableReportCsv(String csvFile, String varReportNumber,BatchReport batchReport, List<FileReport> allFileReports, Versions version) throws IOException {
        System.out.println("Read variable reportcsv");
        // Connect file reports with batch reports

        Reader in = new FileReader(csvFile);
        Iterable<CSVRecord> records = CSVFormat.DEFAULT.parse(in);
        for (CSVRecord record : records) {
            // NOTE !! CURRENTLY WE ARE RUNNING ON MOCK DATA SO ONLY A FEW, IF ANY VARIABLES WILL BE FOUND
            Variables var = variableDAO.findByCode(record.get(0));
            // check if the variableReport is contained in variable
            if (var != null) {
                boolean contained = false;
                if (var != null && var.getVariableReports() != null) {
                    List<VariableReport> vrInsideVariable = var.getVariableReports();

                    for (VariableReport vr : vrInsideVariable) {
                        if (vr.getVariableReportNumber() != null && vr.getVariableReportNumber().equals(varReportNumber)) {
                            contained = true;
                        }
                    }
                }
                if (!contained) {
                    VariableReport variableReport = new VariableReport("variableReport", varReportNumber,
                            record.get(1), record.get(2), record.get(3), record.get(4), record.get(5), record.get(6), record.get(7),
                            record.get(8), record.get(9), record.get(10), record.get(11), record.get(12), record.get(13), record.get(14),
                            record.get(15), record.get(16), record.get(17), record.get(18), record.get(19), record.get(20));

                    variableReport.setVariable(var);
                    List<VariableReport> currentVariableReports = var.getVariableReports();
                    currentVariableReports.add(variableReport);
                    var.setVariableReports(currentVariableReports);
                    variableReportDAO.save(variableReport);
                    variableDAO.save(var);

                }

                List<BatchReport> brInsideVersion = version.getBatchReports();
                boolean contained2 = false;

                    for (BatchReport br : brInsideVersion) {

                        if (br.getBatchReportNumber()!=null && br.getBatchReportNumber().equals(batchReport.getBatchReportNumber())) {
                            contained2 = true;
                        }
                    }

                if (!contained2) {
                    System.out.println("Adding batchReport to version");
                    List<BatchReport> currentBatchReports = version.getBatchReports();
                    currentBatchReports.add(batchReport);
                    version.setBatchReports(currentBatchReports);
                    System.out.println("Saving version");
                    versionDAO.saveVersion(version);

                    System.out.println("Adding version to batchReport");
                    batchReport.setVersion(version);
                    System.out.println("Saving batchReport");
                    batchReportDAO.save(batchReport);
                    for(FileReport fr : allFileReports){
                        fr.setBatchReport(batchReport);
                        batchReport.setFileReport2(fr);
                        fileReportDAO.save(fr);
                    }
                }


            }
        }

    }


}
