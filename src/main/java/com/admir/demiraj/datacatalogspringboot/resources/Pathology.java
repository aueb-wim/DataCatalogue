package com.admir.demiraj.datacatalogspringboot.resources;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
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
@Table(name="Pathology")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EntityListeners(AuditingEntityListener.class)
public class Pathology {

    public Pathology(@NotBlank String name) {
        this.name = name;
    }
    public Pathology() {

    }

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private BigInteger pathology_id;

    @NotBlank
    @Column(length = 1024)
    private String name;


    //@OnDelete(action = OnDeleteAction.CASCADE)
    @OneToMany(mappedBy="pathology",fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Hospitals> hospitals = new ArrayList<>();


    @OneToMany(mappedBy="pathology",fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Versions> versions = new ArrayList<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Hospitals> getHospitals() {
        return hospitals;
    }

    public void setHospitals(List<Hospitals> hospitals) {
        this.hospitals = hospitals;
    }

    public List<Versions> getVersions() {
        return versions;
    }

    public void setVersions(List<Versions> versions) {
        this.versions = versions;
    }

    public BigInteger getPathology_id() {
        return pathology_id;
    }

    public void setPathology_id(BigInteger pathology_id) {
        this.pathology_id = pathology_id;
    }
}
