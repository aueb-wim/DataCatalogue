package com.admir.demiraj.datacatalogspringboot.dao;

import com.admir.demiraj.datacatalogspringboot.repository.PathologyRepository;
import com.admir.demiraj.datacatalogspringboot.resources.Hospitals;
import com.admir.demiraj.datacatalogspringboot.resources.Pathology;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;

@Service
public class PathologyDAO {

    @Autowired
    PathologyRepository pathologyRepository;

    public List<Pathology> findAll(){
        return pathologyRepository.findAll();
    }

    public Pathology save(Pathology path){
        return pathologyRepository.save(path);
    }

    public Pathology getPathologyByName(String pathologyName){
        List<Pathology> pathologies = findAll();
        for(Pathology p : pathologies){
            if(p.getName().equals(pathologyName)){
                return p;
            }

        }
        return null;
    }

    public boolean isPathologyPresent(String pathologyName){
        List<Pathology> pathologies = findAll();
        for(Pathology p : pathologies){
            if(p.getName().equals(pathologyName)){
                return true;
            }

        }
        return false;
    }


    public Pathology getPathologyById(BigInteger pathId) {
        return pathologyRepository.getOne(pathId);
    }



    public Versions getLatestCdeVersionByPathologyName(String pathologyName){
        Pathology pathology = getPathologyByName(pathologyName);
        Versions latestCdeVersion = null;
        for(Versions v: pathology.getVersions()){
            if(v.getCdevariables()!= null){
                latestCdeVersion = v;
            }
        }
        return latestCdeVersion;
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

}
