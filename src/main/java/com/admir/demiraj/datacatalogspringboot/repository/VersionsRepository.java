/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.repository;


import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.math.BigInteger;
import java.util.List;

/**
 *
 * @author root
 */
@CrossOrigin(origins = "http://localhost:4200")
public interface VersionsRepository extends JpaRepository<Versions, Long>{


    @Query(value = "SELECT * FROM versions ver "
            + "INNER JOIN variables_versions vv ON ver.version_id = vv.version_id "
            + "INNER JOIN variables var ON var.variable_id = vv.variable_id "
            + "WHERE vv.variable_id = ?1",nativeQuery=true )
    public List<Versions> getAllVersionByVariableId(Long variableId);

    @Query(value = "SELECT * FROM versions",nativeQuery=true )
    public List<Versions> getAllVersions();


    @Query(value = "SELECT ver.version_id FROM versions ver "
            + "INNER JOIN variables_versions vv ON ver.version_id = vv.version_id "
            + "INNER JOIN variables var ON var.variable_id = vv.variable_id "
            + "WHERE var.hospital_id=?1 "
            + "GROUP BY ver.version_id "
            + "ORDER BY ver.version_id",nativeQuery=true )
    public List<BigInteger> getAllVersionByHospitalId(BigInteger hospitalId);


    // Does not work properly. Fix this.  We need to find hospital_name not var.name
    @Query(value = "SELECT ver.name FROM versions ver "
            + "INNER JOIN variables_versions vv ON ver.version_id = vv.version_id "
            + "INNER JOIN variables var ON var.variable_id = vv.variable_id "
            + "INNER JOIN hospitals hosp ON var.hospital_id = hosp.hospital_id "
            + "WHERE hosp.name=?1 ",nativeQuery=true )
    public List<String> getAllVersionNamesByHospitalName(String hospitalName);



    @Query(value = "SELECT * FROM versions ver WHERE ver.version_id=?1 ",nativeQuery=true )
    public Versions getVersionById(BigInteger versionId);


    @Query(value = "SELECT * FROM versions ver " +
            "INNER JOIN cdevariables_versions cdevv ON ver.version_id = cdevv.version_id " +
            "INNER JOIN cdevariables cdevar ON cdevar.cdevariable_id = cdevv.cdevariable_id ",nativeQuery=true)
    public List<Versions> getAllCdeVersions();

    @Query(value = "SELECT * FROM versions ver WHERE ver.cdevariables IS NOT NULL",nativeQuery=true)
    public List<Versions> getAllCdeVersions2();


}
