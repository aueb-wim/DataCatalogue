package com.admir.demiraj.datacatalogspringboot.repository;


import com.admir.demiraj.datacatalogspringboot.resources.VariableReport;
import org.springframework.data.jpa.repository.JpaRepository;
import java.math.BigInteger;


/**
 *
 * @author root
 */

public interface VariableReportRepository extends JpaRepository<VariableReport, BigInteger> {

}




