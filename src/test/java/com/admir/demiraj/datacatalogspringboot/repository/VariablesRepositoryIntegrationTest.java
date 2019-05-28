package com.admir.demiraj.datacatalogspringboot.repository;


import com.admir.demiraj.datacatalogspringboot.resources.Variables;
import org.apache.commons.configuration.interpol.ExprLookup;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.math.BigInteger;


//@RunWith(SpringRunner.class) // provide a bridge between Spring Boot test features and JUnit
//@DataJpaTest // provides some standard setup needed for testing the persistence layer
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
public class VariablesRepositoryIntegrationTest {
    @Autowired
    private TestEntityManager entityManager; // To carry out some DB operation, we need some records already setup in
    // our database. To setup such data, we can use TestEntityManager.

    @Autowired
    private VariablesRepository variablesRepository;

    // write test cases here

    @Test
    public void whenFindByName_thenReturnEmployee() {
        System.out.println("Variables integration test is ok");
        // given
        //Employee alex = new Employee("alex");
       // Variables variables = new Variables();
        //variables.setName("Var25");
        //variables.setCode("var25");
        //entityManager.persist(variables);
      //  entityManager.flush();
        //Variables variables = variablesRepository

      //  System.out.println(variablesRepository);
        //assertThat(variablesRepository.findAll()==null);

        // when
       // Employee found = employeeRepository.findByName(alex.getName());

        // then
       // assertThat(found.getName())
       //         .isEqualTo(alex.getName());
    }
}


