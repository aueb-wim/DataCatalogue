package com.admir.demiraj.datacatalogspringboot.dao;

import com.admir.demiraj.datacatalogspringboot.repository.PathologyRepository;
import com.admir.demiraj.datacatalogspringboot.resources.Hospitals;
import com.admir.demiraj.datacatalogspringboot.resources.Pathology;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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



}
