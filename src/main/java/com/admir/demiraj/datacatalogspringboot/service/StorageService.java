package com.admir.demiraj.datacatalogspringboot.service;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import com.admir.demiraj.datacatalogspringboot.exceptionHandlers.CustomException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import static java.nio.file.StandardCopyOption.ATOMIC_MOVE;

@Service
public class StorageService {


    private static final String FOLDER_VARIABLES = System.getProperty("user.dir") + "/src/main/resources/data/variables/";
    private static final String FOLDER_CDES = System.getProperty("user.dir") + "/src/main/resources/data/cdes/";
    private static final String FOLDER_ERROR_FILES = System.getProperty("user.dir") + "/src/main/resources/data/ErrorFiles/";
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


    public boolean isFilePresent(String possibleFileName,boolean isCdeVersion){
        if(isCdeVersion){
            if(Files.exists(Paths.get(FOLDER_CDES+possibleFileName))){
                return true;
            }else{
                return false;
            }
        }else{
            if(Files.exists(Paths.get(FOLDER_VARIABLES+possibleFileName))){
                return true;
            }else{
                return false;
            }
        }


    }

    public  void changeFileName(String oldName, String newName, boolean isCde){
        String properFolder;
        if(isCde) {
            properFolder = FOLDER_CDES;
        }else{
            properFolder = FOLDER_VARIABLES;
        }

        if(Files.exists(Paths.get(properFolder+oldName))){
            File oldFile = new File(properFolder+oldName);
            File newFile = new File(properFolder+newName);
            boolean success = oldFile.renameTo(newFile);
            if(success){
                System.out.println("File has been renamed: " + oldName+"---->"+newName);
            }
        }

    }

    public String getFilePathOfVersionIfPresent(String possibleFileName,boolean isCdeVersion){

        if(isCdeVersion){
            if(Files.exists(Paths.get(FOLDER_CDES+possibleFileName))){
                return FOLDER_CDES+possibleFileName;
            }else{
                return null;
            }
        }else{
            if(Files.exists(Paths.get(FOLDER_VARIABLES+possibleFileName))){
                return FOLDER_VARIABLES+possibleFileName;
            }else{
                return null;
            }
        }
    }
    public void validateFileName(String location, String fileName, boolean CDEFile) throws CustomException{
        if(Files.exists(Paths.get(location+"/"+fileName))){
            System.out.println("File exists");
            throw new CustomException("This file already exists.", "We cannot use the same version name twice for a " +
                    "single pathology ", "Please create a new version");
        }

        if(Files.exists(Paths.get(location+"/"+fileName))){
            throw new CustomException("This file already exists.", "We cannot use the same version name twice for a " +
                    "single pathology ", "Please create a new version");
        }

        // Validating that the file isn't already saved
        if(Files.exists(Paths.get(location+"/"+fileName))){
            throw new CustomException("This file already exists.", "We cannot use the same version name twice for a " +
                    "single pathology ", "Please create a new version");
        }

        // Check that the name contains 2 underscores
        int numberOfUndescores = fileName.length() - fileName.replaceAll("_","").length();
        if(numberOfUndescores!=2){
            if(CDEFile){
                throw new CustomException("Invalid file name.", "No proper separation by underscore found" ,
                        "Please provide a file name that complies with the format: <pathology>_cdes_<version>");
            }else{
                throw new CustomException("Invalid file name.","No proper separation by underscore found" ,
                        "Please provide a file name that complies with the format: <pathology>_<hospital name>_<version>");
            }

        }


        String[] parts = fileName.split("_");
        System.out.println("char at zero: "+parts[2].charAt(0)+"compare: "+Character.compare(parts[2].charAt(0),'v'));
        if (Character.compare(parts[2].charAt(0),'v')!=0){
            if (CDEFile){
                throw new CustomException("Invalid file name.", "We use the letter <v> to define a version and it should be directly after the underscore" ,
                        "Please provide a file name that complies with the format: <pathology>_cdes_<version>");
            }else{
                throw new CustomException("Invalid file name.", "We use the letter <v> to define a version and it should be directly after the underscore" ,
                        "Please provide a file name that complies with the format: <pathology>_<hospital name>_<version>");
            }


        }
        System.out.println("char at 1: "+parts[2].charAt(1)+"compare: "+Character.compare(parts[2].charAt(1),'0')+"is digit: "+Character.isDigit(parts[2].charAt(1)));
        if (!Character.isDigit(parts[2].charAt(1)) || Character.compare(parts[2].charAt(1),'0')==0){
            if(CDEFile){
                throw new CustomException("Invalid file name.", "The version number cannot start with zero",
                        "Please provide a file name that complies with the format: <pathology>_cdes_<version>");
            }else {
                throw new CustomException("Invalid file name.", "The version number cannot start with zero",
                        "Please provide a file name that complies with the format: <pathology>_<hospital name>_<version>");
            }


        }

        if (CDEFile){
            if(!parts[1].equals("cdes")){
                throw new CustomException("Invalid file name.", "The middle component of file name should be <cdes> " +
                        "separated with underscore from the other components", "Please provide a file name that complies with the format: " +
                        "<pathology>_cdes_<version>.xlsx");

            }
        }



    }
    public void store(MultipartFile file, boolean containsCDE) throws IOException{

            // Validating that the file isn't empty
            if(file.isEmpty()){
                throw new CustomException("This file is empty.", "The file must contain the appropriate columns and at " +
                        "least one line of data ", "Fill in the appropriate fields. ");
            }
            String fileName = file.getOriginalFilename();
            if(containsCDE){

                validateFileName(this.FOLDER_CDES,fileName, containsCDE);
                Files.copy(file.getInputStream(), this.cdeLocation.resolve(file.getOriginalFilename()));
                System.out.println("Saved cde file: "+fileName);
            }else{
                validateFileName(this.FOLDER_VARIABLES,fileName, containsCDE);
                Files.copy(file.getInputStream(), this.variableLocation.resolve(file.getOriginalFilename()));
                System.out.println("Saved variable file: "+fileName);
            }

    }

    public void moveFileToErrorFiles(String filePath){
        if(filePath.equals("")){
            System.out.println("FilePath is empty no need to move files");
        }else{
            Path sourcePath = Paths.get(filePath);
            String fileName = sourcePath.getFileName().toString();

            Path targetPath = Paths.get(this.FOLDER_ERROR_FILES+fileName);
            try {
                Files.move(sourcePath,targetPath,ATOMIC_MOVE);
            }catch (Exception e){
                System.out.println("Error while moving file: "+e);
            }
        }


    }

    public Resource loadFile(String filename) throws MalformedURLException {

            Path file = variableLocation.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
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
            if(type == 0){
                //we return the cde sample if the file that will be given to the file contains the word cde.
                if(fileName.contains("cde")){
                    file = sampleLocation.resolve("samplecdes.xlsx");
                }else{
                    file = sampleLocation.resolve("sample.xlsx");
                }

            }
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
