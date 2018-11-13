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
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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
                     String description, String comments, String code, String conceptPath) {
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

    }

    public Variables() {
    }
    
    
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private BigInteger variable_id;
    
    @NotBlank
    @Column
    private String name;

    @NotBlank
    @Column
    private String csvFile;

    @Column
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

    @Column(length = 700)
    private String description;

    @Column
    private String comments;
    

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "hospital_id", nullable = false) 
    @JsonBackReference
    private Hospitals hospital;
    
    @JsonBackReference
    @ManyToMany(fetch = FetchType.LAZY,cascade =  {CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name = "variables_functions",joinColumns = { @JoinColumn(name = "variable_id") },inverseJoinColumns = { @JoinColumn(name = "function_id") })
    private Set<Functions> function = new HashSet<>();
    
    @JsonBackReference
    @ManyToMany(fetch = FetchType.LAZY,cascade =  {CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(name = "variables_versions",joinColumns = { @JoinColumn(name = "variable_id") },inverseJoinColumns = { @JoinColumn(name = "version_id") })
    private Set<Versions> versions = new HashSet<>();

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

    public Set<Versions> getVersions() {
        return versions;
    }

    public void setVersions(Versions version) {
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

    public Set<Functions> getFunction() {
        return function;
    }

    public void setFunction(Functions function) {
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

    public void setValues(String value) { this.values = values; }

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

    public void setFunction(Set<Functions> function) {
        this.function = function;
    }

    public void setVersions(Set<Versions> versions) {
        this.versions = versions;
    }
}
