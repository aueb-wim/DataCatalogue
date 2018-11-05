package com.admir.demiraj.datacatalogspringboot.repository;

import com.admir.demiraj.datacatalogspringboot.resources.Employees;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author root
 */
public interface EmployeeRepository extends JpaRepository<Employees, Long>{
    
    
    
}
