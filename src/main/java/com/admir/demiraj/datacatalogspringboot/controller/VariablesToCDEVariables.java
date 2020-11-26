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

import java.io.FileNotFoundException;
import java.io.IOException;
import java.math.BigInteger;
import java.net.MalformedURLException;
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
import org.springframework.http.MediaType;
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
    @PostMapping("/postCDE/{pathology_name}")
    public ResponseEntity<String> handleFileUploadCDE(@RequestParam("file") MultipartFile file,@PathVariable String pathology_name) throws FileNotFoundException, IOException {
        String message = "CDE File Uploaded Successfully";
            System.out.println(message);
            storageService.store(file,true);
            String fileName = file.getOriginalFilename();
            files.add(fileName);
            uploadCdes.readSingleExcelFile(fileName,pathology_name);
            return ResponseEntity.status(HttpStatus.OK).body(message);

    }

     ////!NOTE CHANGE THIS TO GET A SINGLE FILE
    //changed
    /** Method that handle the upload of multipart file (excel file in our case)*/
    @PostMapping("/postVariable/{hospital_name}/{pathology_name}")
    public ResponseEntity<String> handleFileUploadVariable(@RequestParam("file") MultipartFile file,
                                                           @PathVariable String pathology_name,
                                                           @PathVariable String hospital_name) throws FileNotFoundException, IOException {
        String message = "Variable File Uploaded Successfully";
        System.out.println(message);
        storageService.store(file,false);
        System.out.println("Store finished");
        String fileName = file.getOriginalFilename();
        System.out.println("filename when uploading file is: "+fileName);
        files.add(fileName);
        uploadVariables.readSingleExcelFile(fileName,pathology_name,hospital_name);
        System.out.println("Upload finished");
        //uploadVariables.readExcelFile();
        return ResponseEntity.status(HttpStatus.OK).body(message);

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
    public ResponseEntity<Resource> getFile(@PathVariable String filename) throws MalformedURLException {
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
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");
        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(file);


        //return ResponseEntity.ok()
         //       .header(HttpHeaders.CONTENT_DISPOSITION,  "attachment; filename=\"" + fileName + "\"")
          //      .body(file);
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
