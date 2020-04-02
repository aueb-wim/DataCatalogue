package com.admir.demiraj.datacatalogspringboot.repository;


import com.admir.demiraj.datacatalogspringboot.resources.BatchReport;
import com.admir.demiraj.datacatalogspringboot.resources.FileReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;


/**
 *
 * @author root
 */

public interface FileReportRepository extends JpaRepository<FileReport, BigInteger> {

}




