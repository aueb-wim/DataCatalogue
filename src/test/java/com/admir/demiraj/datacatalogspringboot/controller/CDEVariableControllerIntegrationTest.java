package com.admir.demiraj.datacatalogspringboot.controller;


import com.admir.demiraj.datacatalogspringboot.DataCatalogueSpringBootApplication;
//import com.admir.demiraj.datacatalogspringboot.Springbootfuultutorial2ApplicationTests;
import com.admir.demiraj.datacatalogspringboot.dao.CDEVariableDAO;
import com.admir.demiraj.datacatalogspringboot.dao.FunctionsDAO;
import com.admir.demiraj.datacatalogspringboot.dao.VersionDAO;
import com.admir.demiraj.datacatalogspringboot.repository.CDEVariablesRepository;
import com.admir.demiraj.datacatalogspringboot.resources.Versions;
import com.admir.demiraj.datacatalogspringboot.service.UploadCdes;
import com.admir.demiraj.datacatalogspringboot.service.VariablesXLSX_JSON;
import org.junit.Before;
//import org.junit.Test;
import org.junit.jupiter.api.Test;
import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.verify;

import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigInteger;
import java.util.Collection;
import java.util.List;


//@RunWith(SpringJUnit4ClassRunner.class)
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CDEVariableControllerIntegrationTest {


    //@Autowired
    //private CDEVariableController cdeVariableController;


    //@Autowired
    //private CDEVariableDAO cdeVariableDAO;

    //@Autowired
    //private CDEVariablesRepository cdeVariablesRepository;


    @Test
    public void dummy_test(){
        String a = "Do nothing";
        assertNotNull("A cannot be null.",a);
        //verify(uploadCdes).readExcelFile();
        //verify(cdeVariableController).readExcel();
    }

    // set up our mocks before each test. Make Mockito acknowledge the @InjectMocks and the @Mocks annotations and that they should be pushed together.

    ///////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////

    //when the method findOne is called -- then return the user u that we have predefined (this way we don't need a database to control our code)
    // when(userRepository.findOne(1l)).thenReturn(u);

    // verify that the findOne method is being called. Fails is the findOne is called more than once. verify is used to see if mocked objects work properly
    //verify(userRepository).findOne(1l);
/*
    @Test
    public void contextLoads() throws Exception {
    }
*/
    /** Check that the method readExcelFile is being called*/
    /*
    @Test
    public void readExcelTest(){
        //verify(uploadCdes).readExcelFile();
        //verify(cdeVariableController).readExcel();
    }
    */
/*
    @Test
    public void allCdeVersionsTest(){
        List<Versions> cdeVersions = cdeVariableDAO.getAllCdeVersions();

        assertNotNull("CdeVersions list cannot be null.",cdeVersions);
        assertThat("CdeVersions list cannot be empty.",cdeVersions,is(not(empty())));

        System.out.println("cde is: ");

        for(Versions cdeVersion: cdeVersions ){
            assertThat("",cdeVersion.getName(),notNullValue());
            assertThat(cdeVersion.getName(),containsString("cderr"));
            //assertThat(cdeVersion.getName(),contains("cde"));
            //assertThat(cdeVersion.getName(),hasToString());
            System.out.println(cdeVersion.getName());
        }
        //assertThat(cdeVariableDAO.getAllCdeVersions(), is());
        //asserSamecdeVariableDAO.getAllCdeVersions();
        //verify(cdeVariableDAO).getAllCdeVersions();
    }
**/
/*
    @Test
    public void getAllCDEVariablesByVersionTest(){
        //System.out.println("Test result :"+cdeVariableController.getAllCDEVariablesByVersion(BigInteger.valueOf(1)));
        System.out.println("Test result1 :"+cdeVariablesRepository.findById(BigInteger.valueOf(1)));
        System.out.println("Test result2 :"+cdeVariableDAO.findCDEVariablesByVersionId(BigInteger.valueOf(1)));
        System.out.println("Test result3 :"+cdeVariableController.getAllCDEVariablesByVersion(BigInteger.valueOf(1)));


    }
    */
    // write test cases here
}