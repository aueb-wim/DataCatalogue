package com.admir.demiraj.datacatalogspringboot.controller;

import com.admir.demiraj.datacatalogspringboot.dao.BatchReportDAO;
import com.admir.demiraj.datacatalogspringboot.dao.CDEVariableDAO;
import com.admir.demiraj.datacatalogspringboot.dao.VersionDAO;
import com.admir.demiraj.datacatalogspringboot.resources.BatchReport;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import com.admir.demiraj.datacatalogspringboot.service.UploadCdes;
import com.admir.demiraj.datacatalogspringboot.service.UploadReports;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


/**
 * @author root
 */
@RestController
@RequestMapping("/report")
public class ReportController {

    @Autowired
    private CDEVariableDAO cdeVariableDAO;

    @Autowired
    private VersionDAO versionDAO;

    @Autowired
    private UploadCdes uploadCdes;

    @Autowired
    private UploadReports uploadReports;

    @Autowired
    private BatchReportDAO batchReportDAO;


    @GetMapping("/test2")
    private void test2() {
        uploadReports.readCsvFile2();
    }

    @GetMapping("/batchreport/all")
    private List<BatchReport> findAllBatchReport() {
        return batchReportDAO.findAll();
    }


    @GetMapping("/versionPerHospital/{hospitalName}")
    private List<Versions> versionsPerHospital(@PathVariable("hospitalName") String hospitalName) {
        return versionDAO.getAllVersionByHospitalName(hospitalName);
    }

}
