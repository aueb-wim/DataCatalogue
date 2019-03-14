/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.repository;


import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;

/**
 *
 * @author root
 */
public interface VersionsRepository extends JpaRepository<Versions, BigInteger>{


}
