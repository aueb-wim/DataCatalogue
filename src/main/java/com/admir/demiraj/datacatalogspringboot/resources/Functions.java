/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.resources;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long function_id;
    
    @NotBlank
    private String rule;
    
    @NotBlank
    private String description;
    
    @ManyToMany(fetch = FetchType.LAZY,cascade = {CascadeType.PERSIST,CascadeType.MERGE},mappedBy = "function")
    @JsonManagedReference
    private List<Variables> variables;
    
    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL, mappedBy = "function")
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
