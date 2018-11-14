/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.repository;


import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.math.BigInteger;
import java.util.List;

/**
 *
 * @author root
 */
//@CrossOrigin(origins = "http://195.251.252.222:2442")
//@CrossOrigin(origins = "http://172.16.10.138:4200")
//@CrossOrigin
public interface VersionsRepository extends JpaRepository<Versions, BigInteger>{


    @Query(value = "SELECT * FROM versions ver "
            + "INNER JOIN variables_versions vv ON ver.version_id = vv.version_id "
            + "INNER JOIN variables var ON var.variable_id = vv.variable_id "
            + "WHERE vv.variable_id = ?1",nativeQuery=true )
    List<Versions> getAllVersionByVariableId(BigInteger variableId);


    // Does not work properly. Fix this.  We need to find hospital_name not var.name
    @Query(value = "SELECT ver.name FROM versions ver "
            + "INNER JOIN variables_versions vv ON ver.version_id = vv.version_id "
            + "INNER JOIN variables var ON var.variable_id = vv.variable_id "
            + "INNER JOIN hospitals hosp ON var.hospital_id = hosp.hospital_id "
            + "WHERE hosp.name=?1 ",nativeQuery=true )
    List<String> getAllVersionNamesByHospitalName(String hospitalName);

    @Query(value = "select jsonString from Versions v where v.version_id = :versionId")
    String getStringJsonByVersionId(@Param("versionId") BigInteger versionId);


}
