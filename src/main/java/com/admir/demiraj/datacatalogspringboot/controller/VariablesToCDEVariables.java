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
import com.admir.demiraj.datacatalogspringboot.resources.CDEVariables;
import com.admir.demiraj.datacatalogspringboot.resources.Functions;
import com.admir.demiraj.datacatalogspringboot.resources.Hospitals;
import com.admir.demiraj.datacatalogspringboot.resources.Variables;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.admir.demiraj.datacatalogspringboot.service.StorageService;
import com.admir.demiraj.datacatalogspringboot.service.UploadCdes;
import com.admir.demiraj.datacatalogspringboot.service.UploadVariables;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.util.MultiValueMap;
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
    private VersionDAO versionDAO;
    
   @Autowired
   private HospitalDAO hospitalDAO;
    
   @Autowired
   private FunctionsDAO functionsDAO;
   
   @Autowired
   private CDEVariableDAO cdeVariableDAO;

///////////////////////////////////////////////////////////////////////
@Autowired
StorageService storageService;

@Autowired
    UploadVariables uploadVariables;

    List<String> files = new ArrayList<String>();

    @PostMapping("/post")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            storageService.store(file);
            files.add(file.getOriginalFilename());

            message = "You successfully uploaded " + file.getOriginalFilename() + "!";
            uploadVariables.readExcelFile();///////////////testing
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } catch (Exception e) {
            message = "FAIL to upload " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }
    }

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
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

///////////////////////////////////////////////////////////////////////
    @GetMapping("/down")
    public ResponseEntity<byte[]> down() throws IOException {
        ByteArrayOutputStream outByteStream = new ByteArrayOutputStream();
        Workbook wb = new HSSFWorkbook();
        for(int sNo=1;sNo<=5;sNo++) {
            Sheet sheet = wb.createSheet("s"+sNo);
            for(int i=1;i<6;i++) {
                Row row = sheet.createRow(i);
                for(int j=1;j<=5;j++) {
                    Cell cell = row.createCell(j);
                    cell.setCellValue("test "+j);
                }

            }
        }
        wb.write(outByteStream);
        //wb.close();

        MultiValueMap<String, String> headers = new HttpHeaders();
        List<String> list = new ArrayList<>();
        list.add("application/vnd.ms-excel");
        headers.put(HttpHeaders.CONTENT_TYPE, list);
        return new ResponseEntity<byte[]>(outByteStream.toByteArray(),headers, HttpStatus.OK);
    }

   @PostMapping("/variables/{variable_id}")
   public List<Variables> getVariablesForEachMapping(@PathVariable(value="variable_id") BigInteger variableId){
       return variableDAO.variablesToCdeVariables(variableId);

   }

    //save variables
    @GetMapping("/variables")
    public void saveVariable(){
        Versions ver = new Versions("version 1");
        versionDAO.saveVersion(ver);
        
        Hospitals hosp = new Hospitals("hospital 1");
        hospitalDAO.save(hosp);
        
        ///////////////////  2 DIFFRENT CASES FOR CREATING VARIABLES  //////////
        
        ///// CASE 1: One function for multiple variables //////// 
        Functions function1 = new Functions("turn 0 to F, turn 1 to M","rule description 1");
        CDEVariables cdeVariable = new CDEVariables("cd1", "file1", null, null, null, null, null, null,null,null,null);
        
        //function1.setCdeVariable(cdeVariable);
        functionsDAO.save(function1);
        cdeVariable.setFunction(function1);
        cdeVariableDAO.save(cdeVariable);
        
        
        
        for(int i=0;i<3;i++){
        Variables var = new Variables("name"+i, "hbp", null, "text", null, "NOT NULL",
                null, null,null,null,null);
        variableDAO.saveVersionToVariable(var, ver);
        variableDAO.saveHospitalToVariable(var, hosp);
        variableDAO.saveFunctionToVariable(var, function1);
        variableDAO.save(var);
        }
        
        ///// CASE 2: Two functions for one hospital ////////
        
        Functions function2 = new Functions("turn 1 to 2","rule description 2");
        CDEVariables cdeVariable2 = new CDEVariables("cd2", "file2", null, null, null, null, null, null,null,null,null);
        
        //function2.setCdeVariable(cdeVariable2);
        functionsDAO.save(function2);
        cdeVariable2.setFunction(function2);
        cdeVariableDAO.save(cdeVariable2);
        
        
        Functions function3 = new Functions("turn 2 to 3","rule description 3");
        CDEVariables cdeVariable3 = new CDEVariables("cd3", "file3", null, null, null, null, null, null,null,null,null);
        
        //function3.setCdeVariable(cdeVariable3);
        functionsDAO.save(function3);
        cdeVariable3.setFunction(function3);
        cdeVariableDAO.save(cdeVariable3);
        
        
        Variables var2 = new Variables("name", "hbp", null, "text", null, "NOT NULL",
                null, null,null,null,null);
        variableDAO.saveVersionToVariable(var2, ver);
        variableDAO.saveHospitalToVariable(var2, hosp);
        variableDAO.saveFunctionToVariable(var2, function2);
        variableDAO.saveFunctionToVariable(var2, function3);
        variableDAO.save(var2);
        
      
            
        
    }
    
}
