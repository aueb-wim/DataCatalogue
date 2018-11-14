/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.repository;

import com.admir.demiraj.datacatalogspringboot.resources.Variables;

import java.math.BigInteger;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 *
 * @author root
 */
//@CrossOrigin(origins = "http://195.251.252.222:2442")
//@CrossOrigin(origins = "http://172.16.10.138:4200")
//@CrossOrigin
public interface VariablesRepository extends JpaRepository<Variables, BigInteger>{

    @Query(value = "SELECT * FROM variables v "
            + "INNER JOIN variables_versions vv ON v.variable_id = vv.variable_id "
            + "INNER JOIN versions ver ON ver.version_id = vv.version_id "
            + "WHERE vv.version_id = ?1",nativeQuery=true )
    List<Variables> findVariablesByVersionId(BigInteger versionId);

    // I may need to select the functions as well in order to print one mapping for each one of them
    @Query(value= "SELECT * FROM variables v "
            + "INNER JOIN variables_functions vf ON v.variable_id = vf.variable_id "
            + "INNER JOIN functions AS f ON vf.function_id = f.function_id "
            + "INNER JOIN cdevariables AS cv ON cv.function_id = f.function_id "
            + "WHERE v.variable_id = ?1 ", nativeQuery=true )
    List<Variables> variablesToCdeVariables( BigInteger variableId);
    
    
    @Query(value = "select * from variables where variables.hospital_id = ?1", nativeQuery=true) 
    List<Variables> findByHospitalid(BigInteger hospitalId);

}
