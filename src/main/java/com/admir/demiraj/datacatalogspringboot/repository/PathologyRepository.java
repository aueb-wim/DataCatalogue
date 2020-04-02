package com.admir.demiraj.datacatalogspringboot.repository;

import com.admir.demiraj.datacatalogspringboot.resources.Pathology;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;





/**
 *
 * @author root
 */

public interface PathologyRepository extends JpaRepository<Pathology, BigInteger> {

}

