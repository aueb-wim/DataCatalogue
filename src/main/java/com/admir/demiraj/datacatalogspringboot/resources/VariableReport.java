package com.admir.demiraj.datacatalogspringboot.resources;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.math.BigInteger;



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
@Table(name="TotalReport")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EntityListeners(AuditingEntityListener.class)
public class VariableReport implements Serializable {

    public VariableReport(String typeDeclared, String typeEstimated, String listOfCategoryValues,
                          String numberOfCategoryValues, String countOfUniqueValues, String mostFrequentValue,
                          String numberOfOccurrencesForMostFrequentValue, String countOfRecordsFilled,
                          String percentageOfNonNullRows, String mean, String std, String min, String max,
                          String the25PercebtOfRecordsBelowThisValue, String the50PercebtOfRecordsBelowThisValue,
                          String the75PercebtOfRecordsBelowThisValue, String numberOfOutliersOutside3Std,
                          String the5LeastFrequestValues, String the5MostFrequentValues, String comments) {

        this.typeDeclared = typeDeclared;
        this.typeEstimated = typeEstimated;
        this.listOfCategoryValues = listOfCategoryValues;
        this.numberOfCategoryValues = numberOfCategoryValues;
        this.countOfUniqueValues = countOfUniqueValues;
        this.mostFrequentValue = mostFrequentValue;
        this.numberOfOccurrencesForMostFrequentValue = numberOfOccurrencesForMostFrequentValue;
        this.countOfRecordsFilled = countOfRecordsFilled;
        this.percentageOfNonNullRows = percentageOfNonNullRows;
        this.mean = mean;
        this.std = std;
        this.min = min;
        this.max = max;
        this.the25PercebtOfRecordsBelowThisValue = the25PercebtOfRecordsBelowThisValue;
        this.the50PercebtOfRecordsBelowThisValue = the50PercebtOfRecordsBelowThisValue;
        this.the75PercebtOfRecordsBelowThisValue = the75PercebtOfRecordsBelowThisValue;
        this.numberOfOutliersOutside3Std = numberOfOutliersOutside3Std;
        this.the5LeastFrequestValues = the5LeastFrequestValues;
        this.the5MostFrequentValues = the5MostFrequentValues;
        this.comments = comments;
    }

    public VariableReport() {
    }


    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private BigInteger variablereport_id;

    @Column
    private String typeDeclared;

    @Column
    private String typeEstimated;

    @Column
    private String listOfCategoryValues;

    @Column
    private String numberOfCategoryValues;

    @Column
    private String countOfUniqueValues;

    @Column
    private String mostFrequentValue;

    @Column
    private String numberOfOccurrencesForMostFrequentValue;
    @Column
    private String countOfRecordsFilled;

    @Column
    private String percentageOfNonNullRows;

    @Column
    private String mean;

    @Column
    private String std;

    @Column
    private String min;
    @Column
    private String max;

    @Column
    private String the25PercebtOfRecordsBelowThisValue;

    @Column
    private String the50PercebtOfRecordsBelowThisValue;

    @Column
    private String the75PercebtOfRecordsBelowThisValue;

    @Column
    private String numberOfOutliersOutside3Std;

    @Column
    private String the5LeastFrequestValues;

    @Column
    private String the5MostFrequentValues;

    @Column
    private String comments;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "variable_id", nullable = false)
    @JsonBackReference
    private Variables variable;

    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL, mappedBy = "variableReport")
    @JsonManagedReference
    private TotalReport totalReport;

    public BigInteger getVariablereport_id() {
        return variablereport_id;
    }

    public void setVariablereport_id(BigInteger variablereport_id) {
        this.variablereport_id = variablereport_id;
    }


    public Variables getVariable() {
        return variable;
    }

    public void setVariable(Variables variable) {
        this.variable = variable;
    }

    public TotalReport getTotalReport() {
        return totalReport;
    }

    public void setTotalReport(TotalReport totalReport) {
        this.totalReport = totalReport;
    }

    public String getTypeDeclared() {
        return typeDeclared;
    }

    public void setTypeDeclared(String typeDeclared) {
        this.typeDeclared = typeDeclared;
    }

    public String getTypeEstimated() {
        return typeEstimated;
    }

    public void setTypeEstimated(String typeEstimated) {
        this.typeEstimated = typeEstimated;
    }

    public String getListOfCategoryValues() {
        return listOfCategoryValues;
    }

    public void setListOfCategoryValues(String listOfCategoryValues) {
        this.listOfCategoryValues = listOfCategoryValues;
    }

    public String getNumberOfCategoryValues() {
        return numberOfCategoryValues;
    }

    public void setNumberOfCategoryValues(String numberOfCategoryValues) {
        this.numberOfCategoryValues = numberOfCategoryValues;
    }

    public String getCountOfUniqueValues() {
        return countOfUniqueValues;
    }

    public void setCountOfUniqueValues(String countOfUniqueValues) {
        this.countOfUniqueValues = countOfUniqueValues;
    }

    public String getMostFrequentValue() {
        return mostFrequentValue;
    }

    public void setMostFrequentValue(String mostFrequentValue) {
        this.mostFrequentValue = mostFrequentValue;
    }

    public String getNumberOfOccurrencesForMostFrequentValue() {
        return numberOfOccurrencesForMostFrequentValue;
    }

    public void setNumberOfOccurrencesForMostFrequentValue(String numberOfOccurrencesForMostFrequentValue) {
        this.numberOfOccurrencesForMostFrequentValue = numberOfOccurrencesForMostFrequentValue;
    }

    public String getCountOfRecordsFilled() {
        return countOfRecordsFilled;
    }

    public void setCountOfRecordsFilled(String countOfRecordsFilled) {
        this.countOfRecordsFilled = countOfRecordsFilled;
    }

    public String getPercentageOfNonNullRows() {
        return percentageOfNonNullRows;
    }

    public void setPercentageOfNonNullRows(String percentageOfNonNullRows) {
        this.percentageOfNonNullRows = percentageOfNonNullRows;
    }

    public String getMean() {
        return mean;
    }

    public void setMean(String mean) {
        this.mean = mean;
    }

    public String getStd() {
        return std;
    }

    public void setStd(String std) {
        this.std = std;
    }

    public String getMin() {
        return min;
    }

    public void setMin(String min) {
        this.min = min;
    }

    public String getMax() {
        return max;
    }

    public void setMax(String max) {
        this.max = max;
    }

    public String getThe25PercebtOfRecordsBelowThisValue() {
        return the25PercebtOfRecordsBelowThisValue;
    }

    public void setThe25PercebtOfRecordsBelowThisValue(String the25PercebtOfRecordsBelowThisValue) {
        this.the25PercebtOfRecordsBelowThisValue = the25PercebtOfRecordsBelowThisValue;
    }

    public String getThe50PercebtOfRecordsBelowThisValue() {
        return the50PercebtOfRecordsBelowThisValue;
    }

    public void setThe50PercebtOfRecordsBelowThisValue(String the50PercebtOfRecordsBelowThisValue) {
        this.the50PercebtOfRecordsBelowThisValue = the50PercebtOfRecordsBelowThisValue;
    }

    public String getThe75PercebtOfRecordsBelowThisValue() {
        return the75PercebtOfRecordsBelowThisValue;
    }

    public void setThe75PercebtOfRecordsBelowThisValue(String the75PercebtOfRecordsBelowThisValue) {
        this.the75PercebtOfRecordsBelowThisValue = the75PercebtOfRecordsBelowThisValue;
    }

    public String getNumberOfOutliersOutside3Std() {
        return numberOfOutliersOutside3Std;
    }

    public void setNumberOfOutliersOutside3Std(String numberOfOutliersOutside3Std) {
        this.numberOfOutliersOutside3Std = numberOfOutliersOutside3Std;
    }

    public String getThe5LeastFrequestValues() {
        return the5LeastFrequestValues;
    }

    public void setThe5LeastFrequestValues(String the5LeastFrequestValues) {
        this.the5LeastFrequestValues = the5LeastFrequestValues;
    }

    public String getThe5MostFrequentValues() {
        return the5MostFrequentValues;
    }

    public void setThe5MostFrequentValues(String the5MostFrequentValues) {
        this.the5MostFrequentValues = the5MostFrequentValues;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}
