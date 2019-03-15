package com.admir.demiraj.datacatalogspringboot.controller;

import com.admir.demiraj.datacatalogspringboot.dao.BatchReportDAO;
import com.admir.demiraj.datacatalogspringboot.dao.CDEVariableDAO;
import com.admir.demiraj.datacatalogspringboot.dao.VersionDAO;
import com.admir.demiraj.datacatalogspringboot.resources.BatchReport;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import com.admir.demiraj.datacatalogspringboot.service.StorageService;
import com.admir.demiraj.datacatalogspringboot.service.UploadCdes;
import com.admir.demiraj.datacatalogspringboot.service.UploadReports;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * @author root
 */
@RestController
@RequestMapping("/report")
public class ReportController {


    @Autowired
    private VersionDAO versionDAO;

    @Autowired
    private UploadReports uploadReports;

    @Autowired
    private BatchReportDAO batchReportDAO;

    @Autowired
    StorageService storageService;


    @GetMapping("/uploadAllReports")
    private void test2() {
        uploadReports.uploadAllReports();
    }

    @GetMapping("/batchreport/all")
    private List<BatchReport> findAllBatchReport() {
        return batchReportDAO.findAll();
    }


    @GetMapping("/versionPerHospital/{hospitalName}")
    private List<Versions> versionsPerHospital(@PathVariable("hospitalName") String hospitalName) {
        return versionDAO.getAllVersionByHospitalName(hospitalName);
    }


    /** Method that receives a filename and returns the sample excel with the provided name */
    @GetMapping("/getBatchReport/{filename}")
    @ResponseBody
    public ResponseEntity<Resource> getBatchReport(@PathVariable(value = "filename") String fileName) {
        Resource file = storageService.loadSampleOrReport(fileName,1);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,  "attachment;")
                .body(file);
    }

    /** Method that receives a filename and returns the sample excel with the provided name */
    @GetMapping("/getVariableReport/{filename}")
    @ResponseBody
    public ResponseEntity<Resource> getVariableReport(@PathVariable(value = "filename") String fileName) {
        Resource file = storageService.loadSampleOrReport(fileName,2);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,  "attachment;")
                .body(file);
    }
}
