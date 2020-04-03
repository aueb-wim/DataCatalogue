/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.dao;

import com.admir.demiraj.datacatalogspringboot.exceptionHandlers.CustomException;
import com.admir.demiraj.datacatalogspringboot.repository.HospitalsRepository;
import com.admir.demiraj.datacatalogspringboot.repository.PathologyRepository;
import com.admir.demiraj.datacatalogspringboot.repository.VariableReportRepository;
import com.admir.demiraj.datacatalogspringboot.repository.VariablesRepository;
import com.admir.demiraj.datacatalogspringboot.resources.*;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author root
 */
@Service
public class HospitalDAO {
      
    @Autowired
    private HospitalsRepository hospitalsRepository;

    @Autowired
    private VariablesRepository variablesRepository;

    @Autowired
    private VariableReportRepository variableReportRepository;

    @Autowired
    private PathologyDAO pathologyDAO;


    public List<Hospitals> getAllHospitals(){
        return hospitalsRepository.findAll();
    }
    public Hospitals save(Hospitals hosp){
        return hospitalsRepository.save(hosp);
    }

    public List<BigInteger> getAllHospitalIds(){return hospitalsRepository.getAllHospitalIds();}
    
    public List<Hospitals> findAll(){
        return hospitalsRepository.findAll();
    }

    public List<Hospitals> findAllWithUniqueVariables(){
        List<Hospitals> allHosp = hospitalsRepository.findAll();
        List<Hospitals> allHospUniqVar = new ArrayList<>();
        for (Hospitals hosp: allHosp){
            List<Variables> allVar = hosp.getVariables();
            List<Variables> uniqueVar = new ArrayList<>();
            for(int i=0;i<allVar.size();i++){
                boolean found = false;
                for(int j = i+1;j<allVar.size();j++){
                    if(allVar.get(i).getCode().equals(allVar.get(j).getCode())){
                        found = true;
                    }
                }
                if(!found){
                    uniqueVar.add(allVar.get(i));
                }
            }
            hosp.setVariables(uniqueVar);
            allHospUniqVar.add(hosp);
        }
        return allHospUniqVar;
    }

    public Hospitals getHospital(BigInteger id){
        return hospitalsRepository.getOne(id);
    }

    public String getHospitalNameById(BigInteger hospId){

        return hospitalsRepository.getHospitalNameById(hospId);}

    public Hospitals getHospitalByName(String name){
        return hospitalsRepository.getHospitalByName(name);
   }

   public BigInteger getHospitalIdByName(String hospName){
        List<Hospitals> allHosp = hospitalsRepository.findAll();
        for (Hospitals h : allHosp){
            if(h.getName().equals(hospName)){
                return h.getHospital_id();
            }
        }
        return null;
   }

    /** We need to delete not only the hospital but also everything else that is related to it*/
    public void deleteHospitalByName(String hospitalName){
        //Every action related to the hospital deletion
        Hospitals hospital = getHospitalByName(hospitalName);
        List<Variables> variables = hospital.getVariables();
            for(Variables variable:variables){
                //Delete variableReports
                List<VariableReport> variableReports = variable.getVariableReports();
                variableReportRepository.deleteInBatch(variableReports);
            }
            //Delete variables
            variablesRepository.deleteInBatch(variables);

        //Delete hospitals
        List<Hospitals> hospitalsToDelete = new ArrayList<>();
        hospitalsToDelete.add(hospital);
        hospitalsRepository.deleteInBatch(hospitalsToDelete);


    }

    public void createNewHospitalByName(String hospitalName, String pathologyNme){
        Hospitals hospital = new Hospitals();
        Pathology pathology = pathologyDAO.getPathologyByName(pathologyNme);

        hospital.setName(hospitalName);
        hospital.setPathology(pathology);

        List<Hospitals> hospitalsInPathology = pathology.getHospitals();
        // Validate that the hospital is not already present in pathology
        boolean hospitalFound = false;
        for(Hospitals hosp: hospitalsInPathology){
            if(hosp.getName().equals(hospitalName)){
                hospitalFound = true;
                break;
            }
        }
        if(hospitalFound){
            throw new CustomException("The hospital with name: "+hospitalName+" is already present in the pathology: "+
                    pathologyNme,"The hospital won't be saved","Please provide another hospital name or delete current " +
                    "hospital to create a new one.");

        }else{
            // add the new hospital since it is not already present
            hospitalsInPathology.add(hospital);
            pathology.setHospitals(hospitalsInPathology);
            hospitalsRepository.save(hospital);
            pathologyDAO.save(pathology);

        }




    }

}
