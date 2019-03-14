/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.dao;

import com.admir.demiraj.datacatalogspringboot.repository.FunctionsRepository;
import com.admir.demiraj.datacatalogspringboot.resources.Functions;
import com.admir.demiraj.datacatalogspringboot.resources.Variables;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

/**
 * @author root
 */
@Service
public class FunctionsDAO {

    @Autowired
    FunctionsRepository functionsRepository;

    public Functions save(Functions function) {
        Functions f = functionsRepository.save(function);
        functionsRepository.flush();
        return f;
    }

    public List<Functions> findAll() {
        return this.functionsRepository.findAll();
    }

    public List<Functions> findByVariableVersionId(BigInteger variableVersion) {
        List<Functions> allFunctions = functionsRepository.findAll();
        List<Functions> functionByVariableId = new ArrayList<>();
        for (Functions f : allFunctions) {
            List<Variables> allVariables = f.getVariables();
            for (Variables v : allVariables) {
                List<Versions> versionInsideVariable = v.getVersions();
                for (Versions ver : versionInsideVariable){
                    if (ver.getVersion_id().compareTo(variableVersion) == 0) {
                        functionByVariableId.add(f);
                    }   }
            }
        }
        return functionByVariableId;
    }

    //public String findMapFunctionAndMapCdeByVariableId(BigInteger variableId){}

    public Functions findFunctionById(Functions fun) {
        List<Functions> allFunctions = functionsRepository.findAll();
        for (Functions f : allFunctions) {
            if (f.getFunction_id().compareTo(fun.getFunction_id()) == 0) {
                return f;
            }
        }
        return null;
    }

}
