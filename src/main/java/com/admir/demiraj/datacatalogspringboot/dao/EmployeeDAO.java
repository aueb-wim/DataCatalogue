/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.dao;

import com.admir.demiraj.datacatalogspringboot.repository.EmployeeRepository;
import com.admir.demiraj.datacatalogspringboot.resources.Employees;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author root
 */
@Service
public class EmployeeDAO {

    
    @Autowired
    private EmployeeRepository employeeRepository;

    
    // save an employee
    public Employees save(Employees emp){
        return employeeRepository.save(emp);
    }
    
    
    //search all employees
    
    public List<Employees> findAll(){
        return employeeRepository.findAll();
    }
    
    //get an employee
    public Employees getEmployee(Long id){
        return employeeRepository.getOne(id);
    }
    
    //delete an employee
   public void deleteEmployee(long id){
       employeeRepository.deleteById(id);
   }
    
    
    
}
