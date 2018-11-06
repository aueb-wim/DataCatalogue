/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.resources;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    private Long function_id;
    
    @Column(length = 1024)
    private String rule;
    
    @Column(length = 1024)
    private String description;
    
    @ManyToMany(fetch = FetchType.LAZY,cascade = {CascadeType.ALL,CascadeType.MERGE},mappedBy = "function")
    @JsonManagedReference
    private List<Variables> variables;
    
    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL, mappedBy = "function")
    @JsonManagedReference
    private CDEVariables cdeVariable;

    public CDEVariables getCdeVariable() {
        return cdeVariable;
    }

    public void setCdeVariable(CDEVariables cdeVariable) {
        this.cdeVariable = cdeVariable;
    }

    public Long getFunction_id() {
        return function_id;
    }

    public void setFunction_id(Long function_id) {
        this.function_id = function_id;
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
