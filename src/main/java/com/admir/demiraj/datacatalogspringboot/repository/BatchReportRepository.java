package com.admir.demiraj.datacatalogspringboot.repository;


import com.admir.demiraj.datacatalogspringboot.resources.BatchReport;
import org.springframework.data.jpa.repository.JpaRepository;
import java.math.BigInteger;


/**
 *
 * @author root
 */

public interface BatchReportRepository extends JpaRepository<BatchReport, BigInteger> {

}




