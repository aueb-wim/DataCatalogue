/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.dao;

import com.admir.demiraj.datacatalogspringboot.repository.FunctionsRepository;
import com.admir.demiraj.datacatalogspringboot.resources.Functions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

/**
 *
 * @author root
 */
@Service
public class FunctionsDAO {
    
    @Autowired
    FunctionsRepository functionsRepository;

    public Functions save(Functions function){
        return functionsRepository.save(function);
    }
    
    public List<Functions> findAll(){
        return this.functionsRepository.findAll();
    }
    
}
