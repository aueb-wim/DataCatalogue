/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.repository;

import com.admir.demiraj.datacatalogspringboot.resources.Functions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.math.BigInteger;

/**
 *
 * @author root
 */
//@CrossOrigin(origins = "http://195.251.252.222:2442")
//@CrossOrigin
public interface FunctionsRepository extends JpaRepository<Functions, BigInteger>{
    
}
