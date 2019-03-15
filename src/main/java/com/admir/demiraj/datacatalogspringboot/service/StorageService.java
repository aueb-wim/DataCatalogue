package com.admir.demiraj.datacatalogspringboot.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class StorageService {


    private static final String FOLDER_VARIABLES = System.getProperty("user.dir") + "/src/main/resources/data/variables/";
    private static final String FOLDER_CDES = System.getProperty("user.dir") + "/src/main/resources/data/cdes/";
    private static final String FOLDER_SAMPLES = System.getProperty("user.dir") + "/src/main/resources/data/samples/";
    private static final String FOLDER_BATCH_REPORTS = System.getProperty("user.dir") + "/src/main/resources/data/reports/batch";
    private static final String FOLDER_VARIABLE_REPORTS = System.getProperty("user.dir") + "/src/main/resources/data/reports/variable";

    Logger log = LoggerFactory.getLogger(this.getClass().getName());
    //private final Path rootLocation = Paths.get("upload-dir");//// note I have to provide a proper location
    private final Path variableLocation = Paths.get(FOLDER_VARIABLES);
    private final Path cdeLocation = Paths.get(FOLDER_CDES);
    private final Path sampleLocation = Paths.get(FOLDER_SAMPLES);
    private final Path batchReportLocation = Paths.get(FOLDER_BATCH_REPORTS);
    private final Path variableReportLocation = Paths.get(FOLDER_VARIABLE_REPORTS);

    public void store(MultipartFile file) {
        try {
            if(file.getOriginalFilename().contains("cde")){
                Files.copy(file.getInputStream(), this.cdeLocation.resolve(file.getOriginalFilename()));
            }else{
                Files.copy(file.getInputStream(), this.variableLocation.resolve(file.getOriginalFilename()));
            }

        } catch (Exception e) {
            throw new RuntimeException("FAIL!");
        }
    }

    public Resource loadFile(String filename) {
        try {
            Path file = variableLocation.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("FAIL!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("FAIL!");
        }
    }


    /**Method that given a specific filename and a type finds the appropriate directory and returns that file.
     * type : 0 --> sample
     * type : 1 --> batchReport
     * type : 2 --> variableReport*/

    public Resource loadSampleOrReport(String fileName, int type){
        try {
            Path file;
            if(type == 0)
             file = sampleLocation.resolve("sample.xlsx");
            else if(type == 1)
                file = batchReportLocation.resolve(fileName);
            else if(type ==2)
                file = variableReportLocation.resolve(fileName);
            else
                file = sampleLocation.resolve("sample.xlsx");

            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("FAIL!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("FAIL!");
        }
    }

    public void deleteAll() {
        FileSystemUtils.deleteRecursively(variableLocation.toFile());
    }

    public void init() {
        try {
            Files.createDirectory(variableLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage!");
        }
    }
}
