package com.admir.demiraj.datacatalogspringboot.dao;

import com.admir.demiraj.datacatalogspringboot.repository.*;
import com.admir.demiraj.datacatalogspringboot.resources.*;
import javassist.compiler.ast.Variable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Service
public class PathologyDAO {

    @Autowired
    PathologyRepository pathologyRepository;

    @Autowired
    VersionsRepository versionsRepository;

    @Autowired
    HospitalsRepository hospitalsRepository;

    @Autowired
    VariablesRepository variablesRepository;

    @Autowired
    VariableReportRepository variableReportRepository;

    @Autowired
    CDEVariablesRepository cdeVariablesRepository;



    public List<Pathology> findAll(){
        return pathologyRepository.findAll();
    }

    public Pathology save(Pathology path){
        return pathologyRepository.save(path);
    }

    public Pathology getPathologyByName(String pathologyName){
        List<Pathology> pathologies = findAll();
        for(Pathology p : pathologies){
            if(p.getName().toLowerCase().equals(pathologyName.toLowerCase())){
                return p;
            }

        }
        return null;
    }

    public boolean isPathologyPresent(String pathologyName){
        List<Pathology> pathologies = findAll();
        for(Pathology p : pathologies){
            if(p.getName().toLowerCase().equals(pathologyName.toLowerCase())){
                return true;
            }

        }
        return false;
    }


    public Pathology getPathologyById(BigInteger pathId) {
        return pathologyRepository.getOne(pathId);
    }

    public Versions getLatestCdeVersionByPathology(Pathology pathology){
        Versions latestCdeVersion = null;

        for(Versions v: pathology.getVersions()){
            if(v.getCdevariables()!= null){
                latestCdeVersion = v;
            }
        }

        if(latestCdeVersion == null){
            // Create new empty cde version in case it is not found
            latestCdeVersion = new Versions();
            // This is not an official version - once we make changes to it, it will be saved as version v1
            latestCdeVersion.setName("v0");
            // Default values in cde variable
            CDEVariables cdeVariable = new CDEVariables();
            cdeVariable.setCode("sample");
            List<CDEVariables> cdeVariablesList = new ArrayList<>();
            cdeVariablesList.add(cdeVariable);
            // Default values in version
            latestCdeVersion.setCdevariables(cdeVariablesList);
        }else{
            // append the sample variable at the end cde variables list
            List<CDEVariables> cdeVariablesList = latestCdeVersion.getCdevariables();
            CDEVariables cdeVariable = new CDEVariables();
            cdeVariable.setCode("sample");
            cdeVariablesList.add(cdeVariable);
            latestCdeVersion.setCdevariables(cdeVariablesList);

        }

        return latestCdeVersion;
    }
    public Versions getLatestCdeVersionByPathologyId(BigInteger pathId){
        Pathology pathology = getPathologyById(pathId);
        return getLatestCdeVersionByPathology(pathology);

    }

    public Versions getLatestCdeVersionByPathologyName(String pathologyName){
        Pathology pathology = getPathologyByName(pathologyName);
        return getLatestCdeVersionByPathology(pathology);
    }


    public boolean isCdeVersionPrentInPathology(String pathologyName, String versionName){
        Pathology pathology = getPathologyByName(pathologyName);
        System.out.println("PathologyName: "+pathologyName+"Versionname: "+versionName);
        for(Versions v : pathology.getVersions()){
            if(v.getCdevariables() != null && v.getName().equals(versionName)){
                return true;

            }
        }
        return false;

    }

    public String getPathologyNameById(BigInteger pathId){
        Pathology pathology = getPathologyById(pathId);
        return pathology.getName();
    }

    public void createNewPathologyByName(String pathologyName){
        Pathology pathology = new Pathology();
        pathology.setName(pathologyName);
        pathologyRepository.save(pathology);
    }
    /** We need to delete not only the pathology but it order to be a full clear we need to delete and all the hospitals,
     * versions, variables and CDE variables and everything else that is related with those entities*/
    public void deletePathologyByName(String pathologyName){
        Pathology pathology = getPathologyByName(pathologyName);

        //Every action related to the hospital deletion
        List<Hospitals> hospitals = pathology.getHospitals();
        for (Hospitals hospital:hospitals){
            List<Variables> variables = hospital.getVariables();
            for(Variables variable:variables){
                //Delete variableReports
                List<VariableReport> variableReports = variable.getVariableReports();
                variableReportRepository.deleteInBatch(variableReports);
            }
            //Delete variables
            variablesRepository.deleteInBatch(variables);
        }
        //Delete hospitals
        hospitalsRepository.deleteInBatch(hospitals);

        // Every action related to the version deletion
        List<Versions> versions = pathology.getVersions();

        for(Versions version:versions){
            List<CDEVariables> cdeVariables = version.getCdevariables();
            cdeVariablesRepository.deleteInBatch(cdeVariables);

        }
        //Delete pathology
        versionsRepository.deleteInBatch(versions);
        pathologyRepository.delete(pathology);

    }

}
