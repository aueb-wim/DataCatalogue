package com.admir.demiraj.datacatalogspringboot.dao;

import com.admir.demiraj.datacatalogspringboot.repository.VariableReportRepository;
import com.admir.demiraj.datacatalogspringboot.resources.VariableReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class VariableReportDAO {

    @Autowired
    private VariableReportRepository variableReportRepository;

    public VariableReport save(VariableReport vr){
        return variableReportRepository.save(vr);
    }
}
