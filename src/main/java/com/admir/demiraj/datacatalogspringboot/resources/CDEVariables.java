/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.resources;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/**
 *
 * @author root
 */
@Entity
@Table(name="CDEVariables")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EntityListeners(AuditingEntityListener.class)
public class CDEVariables implements Serializable {

    public CDEVariables(@NotBlank String name, @NotBlank String csvFile, String values, String type, String unit, String canBeNull,
                        String description, String comments, String code, String conceptPath, String methodology) {
        this.name = name;
        this.csvFile = csvFile;
        this.values = values;
        this.type = type;
        this.unit = unit;
        this.canBeNull = canBeNull;
        this.description = description;
        this.comments = comments;
        this.conceptPath = conceptPath;
        this.code = code;
        this.methodology = methodology;
    }

    public CDEVariables() {
    }



    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private BigInteger cdevariable_id;

    @Column
    private String name;

    @Column
    private String csvFile;

    @Column(length = 500)
    private String values;

    @Column
    private String type;

    @Column
    private String code;

    @Column
    private String conceptPath;

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

    @JsonBackReference("versionsCde")
    @ManyToMany(fetch = FetchType.LAZY,cascade =  {CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name = "cdevariables_versions",joinColumns = { @JoinColumn(name = "cdevariable_id") },inverseJoinColumns = { @JoinColumn(name = "version_id") })
    private List<Versions> versions = new ArrayList<>();


    @JsonBackReference("functionCdevariables")
    @ManyToMany(fetch = FetchType.LAZY,cascade =  {CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name = "cdevariables_functions",joinColumns = { @JoinColumn(name = "cdevariable_id") },inverseJoinColumns = { @JoinColumn(name = "function_id") })
    private List<Functions> function;


    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public List<Functions> getFunction() { return function; }

    public void setFunction(List<Functions> function) { this.function = function; }

    public String getConceptPath() {
        return conceptPath;
    }

    public void setConceptPath(String conceptPath) {
        this.conceptPath = conceptPath;
    }

    public String getMethodology() {
        return methodology;
    }

    public void setMethodology(String methodology) {
        this.methodology = methodology;
    }

    public BigInteger getCdevariable_id() {
        return cdevariable_id;
    }

    public void setCdevariable_id(BigInteger cdevariable_id) {
        this.cdevariable_id = cdevariable_id;
    }

    public List<Versions> getVersions() {
        return versions;
    }

    public void setVersions(List<Versions> versions) {
        this.versions = versions;
    }

    public void setVersions2(Versions versions) {
        this.versions.add(versions);
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

    public void setValues(String value) {
        this.values = value;
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

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
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

}
