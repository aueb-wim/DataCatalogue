package com.admir.demiraj.datacatalogspringboot.controller;

import com.admir.demiraj.datacatalogspringboot.dao.PathologyDAO;
import com.admir.demiraj.datacatalogspringboot.resources.Pathology;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;







@RestController
@RequestMapping("/pathology")
public class PathologyController {

   @Autowired
    PathologyDAO pathologyDAO;



    @GetMapping("/allPathologies")
    public List<Pathology> getAllPathologies(){return pathologyDAO.findAll();}


    @GetMapping("/{pathologyName}")
    public Pathology  getPathologyByName(@PathVariable("pathologyName") String pathologyName){

        return pathologyDAO.getPathologyByName(pathologyName);
    }


    @GetMapping("/allPathologies/{pathology_id}")
    public Pathology getPathologyById(@PathVariable("pathology_id") Long pathologyId){
        BigInteger pathId = BigInteger.valueOf(pathologyId);
        return pathologyDAO.getPathologyById(pathId);
    }

}
