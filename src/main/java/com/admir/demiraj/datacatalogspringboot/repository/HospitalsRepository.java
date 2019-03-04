/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.repository;

import com.admir.demiraj.datacatalogspringboot.resources.Hospitals;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.math.BigInteger;
import java.util.List;

/**
 *
 * @author root
 */
public interface HospitalsRepository extends JpaRepository<Hospitals, BigInteger>{

    @Query(value = "SELECT hospital_id FROM Hospitals")
    List<BigInteger> getAllHospitalIds();

    @Query(value = "select h.name from Hospitals h where h.hospital_id = :hospitalId")
    String getHospitalNameById(@Param("hospitalId")BigInteger hospitalId);

    @Query(value = "select * from hospitals where hospitals.name = ?1", nativeQuery=true)
    Hospitals getHospitalByName(String name);


}




