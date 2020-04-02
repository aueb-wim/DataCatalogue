package com.admir.demiraj.datacatalogspringboot.dao;

import com.admir.demiraj.datacatalogspringboot.repository.BatchReportRepository;
import com.admir.demiraj.datacatalogspringboot.repository.FileReportRepository;
import com.admir.demiraj.datacatalogspringboot.resources.BatchReport;
import com.admir.demiraj.datacatalogspringboot.resources.FileReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FileReportDAO {

    @Autowired
    private FileReportRepository fileReportRepository;

    public FileReport save(FileReport fr){
        return fileReportRepository.save(fr);
    }

    public List<FileReport> findAll(){
        return fileReportRepository.findAll();
    }
}
