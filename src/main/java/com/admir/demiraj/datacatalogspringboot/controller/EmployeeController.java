/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.admir.demiraj.datacatalogspringboot.controller;

import com.admir.demiraj.datacatalogspringboot.dao.EmployeeDAO;
import com.admir.demiraj.datacatalogspringboot.resources.Employees;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author root
 */
@RestController
@RequestMapping("/company")
public class EmployeeController {
    @Autowired
    private final EmployeeDAO employeeDAO;

    public EmployeeController() {
        this.employeeDAO = new EmployeeDAO();
    }
    
    //save an employee to database
    @PostMapping("/employees")
    public Employees createEmployee(@Valid @RequestBody Employees emp){
        return employeeDAO.save(emp);
    }
    
    //get all employees
    @GetMapping("/employees")
    public List<Employees> getAllEmployees(){
        return employeeDAO.findAll();
    }
    
    // get employee by id
    @GetMapping("/notes/{id}")
    public ResponseEntity<Employees> getEmployeeById(@PathVariable(value="id") Long id){
        Employees emp = employeeDAO.getEmployee(id);
        if(emp == null){
            return ResponseEntity.notFound().build();
        }else{
            return ResponseEntity.ok().body(emp);
        
        }
    }
    // update an employee by id
    @PutMapping("/employees/{id}")
    public ResponseEntity <Employees> updateEmployee(@PathVariable(value="id") Long id, @Valid @RequestBody Employees empDetails){
        Employees emp = employeeDAO.getEmployee(id);
        if(emp == null){
            return ResponseEntity.notFound().build();
        }else{
            emp.setName(empDetails.getName());
            emp.setExpertise(empDetails.getExpertise());
            emp.setDesignation(empDetails.getDesignation());
            Employees updateEmployee = employeeDAO.save(emp);
            return ResponseEntity.ok().body(updateEmployee);
            
            
        }
        
    
    }
    
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Employees> deleteEmployee(@PathVariable(value="id") Long empId){
        Employees emp = employeeDAO.getEmployee(empId);
        if(emp==null){
            return ResponseEntity.notFound().build();
        }else{
            employeeDAO.deleteEmployee(empId);
            return ResponseEntity.ok().build();

        }
    }
    
}
