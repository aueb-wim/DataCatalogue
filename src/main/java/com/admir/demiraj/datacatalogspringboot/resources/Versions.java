/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.resources;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.io.Serializable;
import java.math.BigInteger;
import java.util.*;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/**
 *
 * @author root
 */
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EntityListeners(AuditingEntityListener.class)
public class Versions implements Serializable{

    public Versions(String name) {
        this.name = name;
    }

    public Versions() {
    }
    
    
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private BigInteger version_id;
    
    @NotBlank
    private String name;

    @Basic(fetch=FetchType.EAGER)
    @Lob
    private String jsonString;

    @Basic(fetch=FetchType.EAGER)
    @Lob
    private String jsonStringVisualizable;

    @LastModifiedDate
    private Date createdAt;


    @OneToMany(mappedBy="version",fetch = FetchType.LAZY)
    @JsonManagedReference("batchReportsVersion")
    private List<BatchReport> batchReports;
    
    @ManyToMany(fetch = FetchType.LAZY,cascade = {CascadeType.PERSIST,CascadeType.MERGE},mappedBy = "versions")
    //@JsonManagedReference("variablesVersion")
    @JsonIgnoreProperties
    private List<Variables> variables = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY,cascade = {CascadeType.PERSIST,CascadeType.MERGE},mappedBy = "versions")
    @JsonManagedReference("cdevariablesVersion")
    private List<CDEVariables> cdevariables = new ArrayList<>();

    public String getJsonString() {
        return jsonString;
    }

    public void setJsonString(String jsonString) {
        this.jsonString = jsonString;
    }

    public List<Variables> getVariables() {
        return variables;
    }

    public void setVariables(List<Variables> variables) {
        this.variables = variables;
    }

    public List<CDEVariables> getCdevariables() {
        return this.cdevariables;
    }

    public void setCdevariables(List<CDEVariables> cdevariables) {
        this.cdevariables = cdevariables;
    }

    public BigInteger getVersion_id() {
        return version_id;
    }

    public void setVersion_id(BigInteger version_id) {
        this.version_id = version_id;
    }

    public String getJsonStringVisualizable() {
        return jsonStringVisualizable;
    }

    public void setJsonStringVisualizable(String jsonStringVisualizable) {
        this.jsonStringVisualizable = jsonStringVisualizable;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public List<BatchReport> getBatchReports() {
        return batchReports;
    }

    public void setBatchReports(List<BatchReport> batchReports) {
        this.batchReports = batchReports;
    }
}
