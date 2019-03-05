package com.admir.demiraj.datacatalogspringboot.resources;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigInteger;


/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 *
 * @author root
 */
@Entity
@Table(name="BatchReport")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EntityListeners(AuditingEntityListener.class)
public class BatchReport implements Serializable {
    public BatchReport(String batchReportName, String batchReportNumber, String fileName, String dateQcToolRan,
                       String qctoolVersion, String totalVariables, String totalRows, String rowsWithOnlyId,
                       String rowsWithNoId, String rowsWithAllColumnsFilled, String variablesWith100PercentRecordCoverage,
                       String variablesWith80to100PercentRecordCoverage, String variablesWith60to80PercentRecordCoverage,
                       String variablesWith40to60PercentRecordCoverage, String variablesWith20to40PercentRecordCoverage,
                       String variablesWith0to20PercentRecordCoverage) {

        this.batchReportName = batchReportName;
        this.batchReportNumber = batchReportNumber;
        this.fileName = fileName;
        this.dateQcToolRan = dateQcToolRan;
        this.qctoolVersion = qctoolVersion;
        this.totalVariables = totalVariables;
        this.totalRows = totalRows;
        this.rowsWithOnlyId = rowsWithOnlyId;
        this.rowsWithNoId = rowsWithNoId;
        this.rowsWithAllColumnsFilled = rowsWithAllColumnsFilled;
        this.variablesWith100PercentRecordCoverage = variablesWith100PercentRecordCoverage;
        this.variablesWith80to100PercentRecordCoverage = variablesWith80to100PercentRecordCoverage;
        this.variablesWith60to80PercentRecordCoverage = variablesWith60to80PercentRecordCoverage;
        this.variablesWith40to60PercentRecordCoverage = variablesWith40to60PercentRecordCoverage;
        this.variablesWith20to40PercentRecordCoverage = variablesWith20to40PercentRecordCoverage;
        this.variablesWith0to20PercentRecordCoverage = variablesWith0to20PercentRecordCoverage;
    }

    public BatchReport() {
    }



    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private BigInteger batchreport_id;

 @Column(length = 500)
 private String batchReportName;

 @Column
 private String batchReportNumber;

    @Column
    private String fileName;

    @Column
    private String dateQcToolRan;

    @Column
    private String qctoolVersion;

    @Column
    private String totalVariables;

    @Column
    private String totalRows;

    @Column
    private String rowsWithOnlyId;

    @Column
    private String rowsWithNoId;

    @Column
    private String rowsWithAllColumnsFilled;

    @Column
    private String variablesWith100PercentRecordCoverage;

    @Column
    private String variablesWith80to100PercentRecordCoverage;

    @Column
    private String variablesWith60to80PercentRecordCoverage;

    @Column
    private String variablesWith40to60PercentRecordCoverage;

    @Column
    private String variablesWith20to40PercentRecordCoverage;

    @Column
    private String variablesWith0to20PercentRecordCoverage;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "version_id", nullable = false)
    @JsonBackReference("versionsBatchReport")
    private Versions version;

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

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getDateQcToolRan() {
        return dateQcToolRan;
    }

    public void setDateQcToolRan(String dateQcToolRan) {
        this.dateQcToolRan = dateQcToolRan;
    }

    public String getQctoolVersion() {
        return qctoolVersion;
    }

    public void setQctoolVersion(String qctoolVersion) {
        this.qctoolVersion = qctoolVersion;
    }

    public String getTotalVariables() {
        return totalVariables;
    }

    public void setTotalVariables(String totalVariables) {
        this.totalVariables = totalVariables;
    }

    public String getTotalRows() {
        return totalRows;
    }

    public void setTotalRows(String totalRows) {
        this.totalRows = totalRows;
    }

    public String getRowsWithOnlyId() {
        return rowsWithOnlyId;
    }

    public void setRowsWithOnlyId(String rowsWithOnlyId) {
        this.rowsWithOnlyId = rowsWithOnlyId;
    }

    public String getRowsWithNoId() {
        return rowsWithNoId;
    }

    public void setRowsWithNoId(String rowsWithNoId) {
        this.rowsWithNoId = rowsWithNoId;
    }

    public String getRowsWithAllColumnsFilled() {
        return rowsWithAllColumnsFilled;
    }

    public void setRowsWithAllColumnsFilled(String rowsWithAllColumnsFilled) {
        this.rowsWithAllColumnsFilled = rowsWithAllColumnsFilled;
    }

    public String getVariablesWith100PercentRecordCoverage() {
        return variablesWith100PercentRecordCoverage;
    }

    public void setVariablesWith100PercentRecordCoverage(String variablesWith100PercentRecordCoverage) {
        this.variablesWith100PercentRecordCoverage = variablesWith100PercentRecordCoverage;
    }

    public String getVariablesWith80to100PercentRecordCoverage() {
        return variablesWith80to100PercentRecordCoverage;
    }

    public void setVariablesWith80to100PercentRecordCoverage(String variablesWith80to100PercentRecordCoverage) {
        this.variablesWith80to100PercentRecordCoverage = variablesWith80to100PercentRecordCoverage;
    }

    public String getVariablesWith60to80PercentRecordCoverage() {
        return variablesWith60to80PercentRecordCoverage;
    }

    public void setVariablesWith60to80PercentRecordCoverage(String variablesWith60to80PercentRecordCoverage) {
        this.variablesWith60to80PercentRecordCoverage = variablesWith60to80PercentRecordCoverage;
    }

    public String getVariablesWith40to60PercentRecordCoverage() {
        return variablesWith40to60PercentRecordCoverage;
    }

    public void setVariablesWith40to60PercentRecordCoverage(String variablesWith40to60PercentRecordCoverage) {
        this.variablesWith40to60PercentRecordCoverage = variablesWith40to60PercentRecordCoverage;
    }

    public String getVariablesWith20to40PercentRecordCoverage() {
        return variablesWith20to40PercentRecordCoverage;
    }

    public void setVariablesWith20to40PercentRecordCoverage(String variablesWith20to40PercentRecordCoverage) {
        this.variablesWith20to40PercentRecordCoverage = variablesWith20to40PercentRecordCoverage;
    }

    public String getVariablesWith0to20PercentRecordCoverage() {
        return variablesWith0to20PercentRecordCoverage;
    }

    public void setVariablesWith0to20PercentRecordCoverage(String variablesWith0to20PercentRecordCoverage) {
        this.variablesWith0to20PercentRecordCoverage = variablesWith0to20PercentRecordCoverage;
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


}
