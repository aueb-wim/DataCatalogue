/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.repository;

import com.admir.demiraj.datacatalogspringboot.resources.Hospitals;
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
public interface HospitalsRepository extends JpaRepository<Hospitals, Long>{

    @Query(value = "select hospital_id from hospitals", nativeQuery=true)
    public List<BigInteger> getAllHospitalIds();

    @Query(value = "select name from hospitals where hospitals.hospital_id = ?1", nativeQuery=true)
    public String getHospitalNameById(BigInteger hospId);

    @Query(value = "select * from hospitals where hospitals.name = ?1", nativeQuery=true)
    public Hospitals getHospitalByName(String name);


}




