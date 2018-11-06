/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.repository;

import com.admir.demiraj.datacatalogspringboot.resources.CDEVariables;
import java.util.List;

import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.CrossOrigin;


/**
 *
 * @author root
 */
@CrossOrigin(origins = "http://localhost:4200")
public interface CDEVariablesRepository extends JpaRepository<CDEVariables, Long>{
    
    @Query(value = "select * from cdevariables where cdevariables.version.version_id = ?1",nativeQuery=true )
    public List<CDEVariables> findCDEVariablesByVersion(Long VersionId);

    @Query(value = "SELECT ver.name FROM versions ver" +
            " INNER JOIN cdevariables_versions vv ON ver.version_id = vv.version_id " +
            "INNER JOIN cdevariables cdevar ON cdevar.cdevariable_id = vv.cdevariable_id ",nativeQuery=true)
    public List<String> getAllCdeVersionNames();



}

