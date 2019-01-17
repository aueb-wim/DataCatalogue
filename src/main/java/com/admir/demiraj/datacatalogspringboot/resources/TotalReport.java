package com.admir.demiraj.datacatalogspringboot.resources;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
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
 *
 * @author root
 */
@Entity
@Table(name="TotalReport")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EntityListeners(AuditingEntityListener.class)
public class TotalReport implements Serializable {

    public TotalReport(@NotBlank String name, @NotBlank String csvFile, String values, String type, String unit, String canBeNull,
                       String description, String comments, String code, String conceptPath, String methodology) {
        this.name = name;
        this.csvFile = csvFile;
        this.code = code;
        this.values = values;
        this.type = type;
        this.unit = unit;
        this.canBeNull = canBeNull;
        this.description = description;
        this.comments = comments;
        this.conceptPath = conceptPath;
        this.methodology = methodology;
    }

    public TotalReport() {
    }



    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private BigInteger totalreport_id;

    @Column
    private String name;

    @Column
    private String csvFile;

    @Column(length = 500)
    private String values;

    @Column
    private String code;

    @Column
    private String conceptPath;

    @Column
    private String type;

    @Column
    private String unit;

    @Column
    private String canBeNull;

    @Column(length = 1000)
    private String description;

    @Column
    private String comments;

    @Column
    private String methodology;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "version_id", nullable = false)
    @JsonBackReference
    private Versions version;

    @OneToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "variablereport_id", nullable = true)
    @JsonBackReference
    private VariableReport variableReport;


    @OneToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "batchreport_id", nullable = true)
    @JsonBackReference
    private BatchReport batchReport;

    public BigInteger getTotalreport_id() {
        return totalreport_id;
    }

    public void setTotalreport_id(BigInteger totalreport_id) {
        this.totalreport_id = totalreport_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCsvFile() {
        return csvFile;
    }

    public void setCsvFile(String csvFile) {
        this.csvFile = csvFile;
    }

    public String getValues() {
        return values;
    }

    public void setValues(String values) {
        this.values = values;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getConceptPath() {
        return conceptPath;
    }

    public void setConceptPath(String conceptPath) {
        this.conceptPath = conceptPath;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getCanBeNull() {
        return canBeNull;
    }

    public void setCanBeNull(String canBeNull) {
        this.canBeNull = canBeNull;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getMethodology() {
        return methodology;
    }

    public void setMethodology(String methodology) {
        this.methodology = methodology;
    }

    public Versions getVersion() {
        return version;
    }

    public void setVersion(Versions version) {
        this.version = version;
    }

    public VariableReport getVariableReport() {
        return variableReport;
    }

    public void setVariableReport(VariableReport variableReport) {
        this.variableReport = variableReport;
    }

    public BatchReport getBatchReport() {
        return batchReport;
    }

    public void setBatchReport(BatchReport batchReport) {
        this.batchReport = batchReport;
    }
}
