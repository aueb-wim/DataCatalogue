package com.admir.demiraj.datacatalogspringboot.controller;

import com.admir.demiraj.datacatalogspringboot.dao.PathologyDAO;
import com.admir.demiraj.datacatalogspringboot.resources.Pathology;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;






@Configuration
@EnableWebSecurity
@EnableOAuth2Client
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

    @GetMapping("/allPathologies/{pathology_id}/name")
    public String getPathologyNameById(@PathVariable("pathology_id") Long pathologyId){
        BigInteger pathId = BigInteger.valueOf(pathologyId);
        return pathologyDAO.getPathologyNameById(pathId);
    }

    @GetMapping("/allPathologies/{pathology_name}/latest_cde_version")
    public Versions getLatetsCdeVersionByPathologyName(@PathVariable("pathology_name") String pathologyName){

        return pathologyDAO.getLatestCdeVersionByPathologyName(pathologyName);
    }

    @PostMapping(value = "/newPathology")
    public void create2(@RequestBody String pathologyName){
        //JSONArray jr = new JSONArray(ver);
       // String hospitalName = jr.getString(0);
        //return "ok";
        pathologyDAO.createNewPathologyByName(pathologyName);

    }

    @PostMapping(value = "/deletePathology")
    public void deletePathologyByName(@RequestBody String pathologyName){
        //JSONArray jr = new JSONArray(ver);
        // String hospitalName = jr.getString(0);
        //return "ok";
        System.out.println("Received pathology to delete:"+pathologyName);
        pathologyDAO.deletePathologyByName(pathologyName);

    }

}
