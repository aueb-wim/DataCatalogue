package com.admir.demiraj.datacatalogspringboot.repository;

import com.admir.demiraj.datacatalogspringboot.resources.TotalReport;
import org.springframework.data.jpa.repository.JpaRepository;
import java.math.BigInteger;


/**
 *
 * @author root
 */

public interface TotalReportRepository extends JpaRepository<TotalReport, BigInteger> {

}




