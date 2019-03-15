/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.controller;

import com.admir.demiraj.datacatalogspringboot.dao.CDEVariableDAO;
import com.admir.demiraj.datacatalogspringboot.dao.FunctionsDAO;
import com.admir.demiraj.datacatalogspringboot.dao.HospitalDAO;
import com.admir.demiraj.datacatalogspringboot.dao.VariableDAO;
import com.admir.demiraj.datacatalogspringboot.dao.VersionDAO;
import com.admir.demiraj.datacatalogspringboot.resources.Functions;
import com.admir.demiraj.datacatalogspringboot.resources.Variables;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.admir.demiraj.datacatalogspringboot.service.StorageService;
import com.admir.demiraj.datacatalogspringboot.service.UploadCdes;
import com.admir.demiraj.datacatalogspringboot.service.UploadVariables;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

/**
 *
 * @author root
 */
@RestController
@RequestMapping("/mapping")
public class VariablesToCDEVariables {

    @Autowired
    private VariableDAO variableDAO;
    
   @Autowired
   private FunctionsDAO functionsDAO;

    @Autowired
    StorageService storageService;

    @Autowired
    UploadVariables uploadVariables;

    @Autowired
    UploadCdes uploadCdes;

    List<String> files = new ArrayList<String>();

    /** Method that handle the upload of multipart file (excel file in our case)*/
    @PostMapping("/post")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            storageService.store(file);
            files.add(file.getOriginalFilename());

            message = "You successfully uploaded " + file.getOriginalFilename() + "!";

            if(file.getOriginalFilename().contains("cde")){
                uploadCdes.readExcelFile();
            }else{
                uploadVariables.readExcelFile();
            }

            return ResponseEntity.status(HttpStatus.OK).body(message);
        } catch (Exception e) {
            message = "FAIL to upload " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }
    }

    /** Method that provides a link for each file the user has uploaded*/
    @GetMapping("/getallfiles")
    public ResponseEntity<List<String>> getListFiles(Model model) {
        List<String> fileNames = files
                .stream().map(fileName -> MvcUriComponentsBuilder
                        .fromMethodName(VariablesToCDEVariables.class, "getFile", fileName).build().toString())
                .collect(Collectors.toList());

        return ResponseEntity.ok().body(fileNames);
    }

    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storageService.loadFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,  "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }


    /** Method that receives a filename and returns the sample excel with the provided name */
    @GetMapping("/getsample/{filename}")
    @ResponseBody
    public ResponseEntity<Resource> getSample(@PathVariable(value = "filename") String fileName) {
        Resource file = storageService.loadSampleOrReport(fileName,0);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,  "attachment; filename=\"" + fileName + "\"")
                .body(file);
    }


   @PostMapping("/variables/{variable_id}")
   public List<Variables> getVariablesForEachMapping(@PathVariable(value="variable_id") BigInteger variableId){
       return variableDAO.variablesToCdeVariables(variableId);

   }

   @GetMapping("/functions")
    public List<Functions> getAllFunctions(){
        return this.functionsDAO.findAll();
   }

   @GetMapping("/mapFunctionAndMapCdeByVariableId")
   public String getmapFunctionAndMapCdeByVariableId(){
        return "";
   }

   @GetMapping("/randomFunction")
   public Functions getRandomFunction(){
       return this.functionsDAO.findAll().get(1);
   }


   @GetMapping("/functionsByVersionId/{version_id}")
    public List<Functions> getFunctionsByVariableId(@PathVariable(value = "version_id") Long versionId) {
       BigInteger vId = BigInteger.valueOf(versionId);
        return this.functionsDAO.findByVariableVersionId(vId);}


    
}
