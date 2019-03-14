/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.resources;

import com.fasterxml.jackson.annotation.*;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/**
 *
 * @author root
 */
@Entity
@Table(name="Variables")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EntityListeners(AuditingEntityListener.class)
public class Variables implements Serializable{

    public Variables(@NotBlank String name, @NotBlank String csvFile, String values, String type, String unit, String canBeNull,
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

    public Variables() {
    }

    public Variables(CDEVariables cde) {
        this.name = cde.getName();
        this.csvFile = cde.getCsvFile();
        this.code = cde.getCode();
        this.values = cde.getValues();
        this.type = cde.getType();
        this.unit = cde.getUnit();
        this.canBeNull = cde.getCanBeNull();
        this.description = cde.getDescription();
        this.comments = cde.getComments();
        this.conceptPath = cde.getConceptPath();
        this.methodology = cde.getMethodology();
    }

    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private BigInteger variable_id;

    @Column(length = 500)
    private String name;

    @Column
    private String csvFile;

    @Column(length = 500)
    private String values;

    @Column(length = 500)
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
    @JoinColumn(name = "hospital_id", nullable = false) 
    @JsonBackReference("hospitalVariables")
    //@JsonManagedReference
    private Hospitals hospital;
    
    @JsonBackReference("functionVariables")
    @ManyToMany(fetch = FetchType.LAZY,cascade =  {CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name = "variables_functions",joinColumns = { @JoinColumn(name = "variable_id") },inverseJoinColumns = { @JoinColumn(name = "function_id") })
    private List<Functions> function = new ArrayList<>();
    
    @JsonBackReference("versionsVariables")
    @ManyToMany(fetch = FetchType.LAZY,cascade =  {CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name = "variables_versions",joinColumns = { @JoinColumn(name = "variable_id") },inverseJoinColumns = { @JoinColumn(name = "version_id") })
    private List<Versions> versions = new ArrayList<>();

    @OneToMany(mappedBy="variable",fetch = FetchType.LAZY)
    @JsonManagedReference("variableReportsVariables")
    private List<VariableReport> variableReports;


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

    public List<Versions> getVersions() {
        return versions;
    }

    public void setVersions(List<Versions> versions) {
        this.versions = versions;
    }

    public void setVersions2(Versions version) {
        this.versions.add(version);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Hospitals getHospital() {
        return hospital;
    }
 
    public void setHospital(Hospitals hospital) {
        this.hospital = hospital;
    }

    public List<Functions> getFunction() {
        return function;
    }

    public void setFunction2(Functions function) {
        this.function.add(function);
    }

    public BigInteger getVariable_id() {
        return variable_id;
    }

    public void setVariable_id(BigInteger variable_id) {
        this.variable_id = variable_id;
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

    public void setValues(String values) { this.values = values; }

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

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public void setFunction(List<Functions> function) {
        this.function = function;
    }

    public String getMethodology() { return methodology; }

    public void setMethodology(String methodology) {
        this.methodology = methodology;
    }

    public List<VariableReport> getVariableReports() {
        return variableReports;
    }

    public void setVariableReports(List<VariableReport> variableReports) {
        this.variableReports = variableReports;
    }
}
