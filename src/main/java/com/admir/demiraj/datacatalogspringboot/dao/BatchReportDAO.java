package com.admir.demiraj.datacatalogspringboot.dao;

import com.admir.demiraj.datacatalogspringboot.repository.BatchReportRepository;
import com.admir.demiraj.datacatalogspringboot.resources.BatchReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BatchReportDAO {

    @Autowired
    private BatchReportRepository batchReportRepository;

    public BatchReport save(BatchReport br){
        return batchReportRepository.save(br);
    }

    public List<BatchReport> findAll(){
        return batchReportRepository.findAll();
    }
}
