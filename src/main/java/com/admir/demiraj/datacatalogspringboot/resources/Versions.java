/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.resources;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import netscape.javascript.JSObject;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/**
 *
 * @author root
 */
@Entity
@Table(name="Versions")
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
    private Long version_id;
    
    @NotBlank
    private String name;

    @Column(length = 1000000)
    private String jsonString;

    @LastModifiedDate
    private Date createdAt;

    
    @ManyToMany(fetch = FetchType.LAZY,cascade = {CascadeType.PERSIST,CascadeType.MERGE},mappedBy = "versions")
    @JsonManagedReference
    private Set<Variables> variables = new HashSet<>();

    
     
    @ManyToMany(fetch = FetchType.LAZY,cascade = {CascadeType.PERSIST,CascadeType.MERGE},mappedBy = "versions")
    @JsonManagedReference
    private Set<CDEVariables> cdevariables = new HashSet<>();

    public String getJsonString() {
        return jsonString;
    }

    public void setJsonString(String jsonString) {
        this.jsonString = jsonString;
    }

    public Set<Variables> getVariables() {
        return variables;
    }

    public void setVariables(Set<Variables> variables) {
        this.variables = variables;
    }

    public Long getVersion_id() {
        return version_id;
    }

    public void setVersion_id(Long version_id) {
        this.version_id = version_id;
    }

    public Set<CDEVariables> getCdevariables() {
        return cdevariables;
    }

    public void setCdevariables(Set<CDEVariables> cdevariables) {
        this.cdevariables = cdevariables;
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
    
    
    
}
