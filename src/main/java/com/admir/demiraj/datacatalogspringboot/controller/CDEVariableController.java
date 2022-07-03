/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.controller;

/**
 *
 * @author root
 */
import com.admir.demiraj.datacatalogspringboot.dao.CDEVariableDAO;
import com.admir.demiraj.datacatalogspringboot.resources.CDEVariables;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.math.BigInteger;
import java.util.List;

import com.admir.demiraj.datacatalogspringboot.exceptionHandlers.ApiError;
import com.admir.demiraj.datacatalogspringboot.service.UploadCdes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import javax.servlet.http.HttpServletResponse;


/**
 *
 * @author root
 */
@RestController
@RequestMapping("/CDE")
public class CDEVariableController {

    @Autowired
    private CDEVariableDAO cdeVariableDAO;

    @Autowired
    private UploadCdes uploadCdes;

    @Autowired
    CDEVariableController(UploadCdes uploadCdes) {
        this.uploadCdes = uploadCdes;
    }



    @GetMapping("/readExcel")
    public void readExcel() throws IOException, FileNotFoundException, Exception{
        uploadCdes.readExcelFile();
    }

    @GetMapping("/allCdeVersions")
    public List<Versions> allCdeVersions(){
        return cdeVariableDAO.getAllCdeVersions();
    }


    //get all cde-variables by version
    @GetMapping("/all_by_version/{version_id}")
    public List<CDEVariables> getAllCDEVariablesByVersion(@PathVariable(value="version_id") BigInteger version_id){
        return cdeVariableDAO.findCDEVariablesByVersionId(version_id);
    }

    //get all cde-variables
    @GetMapping("/all")
    public List<CDEVariables> getAllCDEVariables(){
        return cdeVariableDAO.findAll();
    }



}
