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
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 *
 * @author root
 */
@Entity
@Table(name="functions")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EntityListeners(AuditingEntityListener.class)
public class Functions {

    public Functions(String rule, String description) {
        this.rule = rule;
        this.description = description;
    }

    public Functions() {
    }


    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private BigInteger function_id;
    
    @Column(length = 1024)
    private String rule;
    
    @Column(length = 1024)
    private String description;
    
    @ManyToMany(fetch = FetchType.LAZY,cascade = {CascadeType.ALL,CascadeType.MERGE},mappedBy = "function")
    @JsonManagedReference
    private List<Variables> variables;


    @ManyToMany(fetch = FetchType.LAZY,cascade = {CascadeType.ALL,CascadeType.MERGE},mappedBy = "function")
    @JsonManagedReference
    private List<CDEVariables> cdeVariables;

    public List<CDEVariables> getCdeVariables() {
        return cdeVariables;
    }

    public void setCdeVariables(List<CDEVariables> cdeVariables) {
        this.cdeVariables = cdeVariables;
    }

    public BigInteger getFunction_id() {
        return function_id;
    }

    public void setFunction_id(BigInteger function_id) {
        this.function_id = function_id;
    }

    public void setVariables(List<Variables> variables) {
        this.variables = variables;
    }

    public String getRule() {
        return rule;
    }

    public void setRule(String rule) {
        this.rule = rule;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Variables> getVariables() {
        return variables;
    }

    public void setVariables(Variables variables) {
        this.variables.add(variables);
    }

}
