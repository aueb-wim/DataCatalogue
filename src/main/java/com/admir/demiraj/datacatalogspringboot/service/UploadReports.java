package com.admir.demiraj.datacatalogspringboot.service;


import com.admir.demiraj.datacatalogspringboot.dao.*;
import com.admir.demiraj.datacatalogspringboot.resources.*;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.List;


@Service
public class UploadReports {

    private static final String BATCH_REPORT_FOLDER = System.getProperty("user.dir") + "/src/main/resources/data/reports/batch/";
    private static final String VARIABLE_REPORT_FOLDER = System.getProperty("user.dir") + "/src/main/resources/data/reports/variable/";

    @Autowired
    BatchReportDAO batchReportDAO;

    @Autowired
    VariableReportDAO variableReportDAO;


    @Autowired
    VariableDAO variableDAO;

    @Autowired
    VersionDAO versionDAO;

    public void readCsvFile2() {
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
                    //NOTE ! WE ARE ADDING TO ALL VERSIONS OF A PARTICULAR HOSPITAL REPORTS. WHEN WE HAVE ACTUAL DATA WE NEED TO SPECIFY ONLY ONE VERSION
                    List<Versions> allVersionPerHospital = versionDAO.getAllVersionByHospitalName(hospitalName);
                    for (Versions version : allVersionPerHospital) {
                        System.out.println("Version found: " + hospitalName + " :" + version.getName());
                        BatchReport batchReport = readBatchReportCsv(filePath, batchName, batchNumber);
                        readVariableReportCsv(VARIABLE_REPORT_FOLDER + expectedVariableReportFile, batchNumber, batchReport, version);
                    }


                } catch (IOException ioe) {
                    System.out.println(ioe);
                }
            }
        }
    }

    public BatchReport readBatchReportCsv(String csvFile, String batchName, String batchNumber) throws IOException {
        Reader in = new FileReader(csvFile);
        //Iterable<CSVRecord> records = CSVFormat.DEFAULT.parse(in);
        Iterable<CSVRecord> records = CSVFormat.DEFAULT.withFirstRecordAsHeader().parse(in);
        for (CSVRecord record : records) {
            BatchReport batchReport = new BatchReport(batchName, batchNumber, record.get(0), record.get(1), record.get(2),
                    record.get(3), record.get(4), record.get(5), record.get(6), record.get(7), record.get(8), record.get(9),
                    record.get(10), record.get(11), record.get(12), record.get(13));
            return batchReport;
        }
        return null;
    }


    public void readVariableReportCsv(String csvFile, String varReportNumber, BatchReport batchReport, Versions version) throws IOException {
        System.out.println("Read variable reportcsv");
        Reader in = new FileReader(csvFile);
        Iterable<CSVRecord> records = CSVFormat.DEFAULT.parse(in);
        for (CSVRecord record : records) {
            // NOTE !! CURRENTLY WE ARE RUNNING ON MOCK DATA SO ONLY A FEW, IF ANY VARIABLES WILL BE FOUND
            Variables var = variableDAO.findByCode(record.get(0));
            System.out.println("values length: " + record.size());
            // check if the variableReport is contained in variable


            if (var != null) {
                boolean contained = false;
                if(var != null && var.getVariableReports() != null){
                    List<VariableReport> vrInsideVariable = var.getVariableReports();
                    for (VariableReport vr : vrInsideVariable) {
                        if (vr.getVariableReportNumber()!= null && vr.getVariableReportNumber().equals(varReportNumber)) {
                            contained = true;
                        }
                    }
                }
if (!contained){
    System.out.println("Creating variableReportObject");
    VariableReport variableReport = new VariableReport("variableReport", varReportNumber,
            record.get(1), record.get(2), record.get(3), record.get(4), record.get(5), record.get(6), record.get(7),
            record.get(8), record.get(9), record.get(10), record.get(11), record.get(12), record.get(13), record.get(14),
            record.get(15), record.get(16), record.get(17), record.get(18), record.get(19), record.get(20));

    System.out.println("Adding variable to variableReportObject");
    variableReport.setVariable(var);

    System.out.println("Adding variableReportObject to variable");
    List<VariableReport> currentVariableReports = var.getVariableReports();
    currentVariableReports.add(variableReport);
    var.setVariableReports(currentVariableReports);
    System.out.println("Saving variable");
    variableDAO.save(var);
    System.out.println("Saving variableReportObject");
    variableReportDAO.save(variableReport);
}


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


            }
        }

    }


}
