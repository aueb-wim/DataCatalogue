/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.resources;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.math.BigInteger;
import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/**
 *
 * @author root
 */
@Entity
@Table(name="Hospitals")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EntityListeners(AuditingEntityListener.class)
public class Hospitals {

    public Hospitals(String name) {
        this.name = name;
    }

    public Hospitals() {
    }
    
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private BigInteger hospital_id;
    
    @NotBlank
    @Column(length = 1024)
    private String name;
  
    @OneToMany(mappedBy="hospital",fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Variables> variables;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigInteger getHospital_id() {
        return hospital_id;
    }

    public void setHospital_id(BigInteger hospital_id) {
        this.hospital_id = hospital_id;
    }

    public List<Variables> getVariables() {
        return variables;
    }

    public void setVariables(List<Variables> variables) {
        this.variables = variables;
    }

    
    
    
}
