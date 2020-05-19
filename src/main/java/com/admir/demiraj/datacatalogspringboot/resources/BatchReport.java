package com.admir.demiraj.datacatalogspringboot.resources;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;


/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 * @author root
 */
@Entity
@Table(name = "BatchReport")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EntityListeners(AuditingEntityListener.class)
public class BatchReport implements Serializable {
    public BatchReport(String batchReportName, String batchReportNumber) {

        this.batchReportName = batchReportName;
        this.batchReportNumber = batchReportNumber;

    }

    public BatchReport() {
    }


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private BigInteger batchreport_id;

    @Column(length = 500)
    private String batchReportName;

    @Column
    private String batchReportNumber;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "version_id", nullable = false)
    @JsonBackReference("versionsBatchReport")
    private Versions version;

    @OneToMany(mappedBy = "batchReport", fetch = FetchType.LAZY)
    @JsonManagedReference("batchReportFileReport")
    private List<FileReport> fileReports = new ArrayList<>();

    public BigInteger getBatchreport_id() {
        return batchreport_id;
    }

    public void setBatchreport_id(BigInteger batchreport_id) {
        this.batchreport_id = batchreport_id;
    }

    public Versions getVersion() {
        return version;
    }

    public void setVersion(Versions version) {
        this.version = version;
    }

    public String getBatchReportName() {
        return batchReportName;
    }

    public void setBatchReportName(String batchReportName) {
        this.batchReportName = batchReportName;
    }

    public String getBatchReportNumber() {
        return batchReportNumber;
    }

    public void setBatchReportNumber(String batchReportNumber) {
        this.batchReportNumber = batchReportNumber;
    }

    public void setFileReport2(FileReport fr) {
        this.fileReports.add(fr);
    }

    public List<FileReport> getFileReports() {
        return fileReports;
    }

    public void setFileReports(List<FileReport> fileReports) {
        this.fileReports = fileReports;
    }

}
