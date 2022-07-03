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
import org.junit.Test;
//import org.junit.jupiter.api.Test;
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
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.io.IOException;
import java.math.BigInteger;
import java.util.List;

@WebMvcTest(CDEVariableController.class)
//@RunWith(SpringJUnit4ClassRunner.class)
//@SpringApplicationConfiguration(DataCatalogueSpringBootApplication.class)
public class CDEVariableControllerUnitTest {
    //@Mock
    //@InjectMocks
    //private UploadCdes uploadCdes;
    /////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////
    @Mock
    //@InjectMocks
    //@Autowired
    private CDEVariableController cdeVariableController;

    @Mock
    private CDEVariableDAO cdeVariableDAO;

    @Mock
    private CDEVariablesRepository cdeVariablesRepository;

    @Mock
    private VariablesXLSX_JSON variablesXLSX_json;


    // set up our mocks before each test. Make Mockito acknowledge the @InjectMocks and the @Mocks annotations and that they should be pushed together.
    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }
    ///////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////

   //when the method findOne is called -- then return the user u that we have predefined (this way we don't need a database to control our code)
    // when(userRepository.findOne(1l)).thenReturn(u);

    // verify that the findOne method is being called. Fails if the findOne is called more than once. verify is used to see if mocked objects work properly
    //verify(userRepository).findOne(1l);

    @Test
    public void dummy_test() throws Exception {
        //String a = "Do nothing";
        //assertNotNull("A cannot be null.", a);
        //verify(uploadCdes).readExcelFile();
        cdeVariableController.readExcel();
        verify(cdeVariableController).readExcel();
    }

    /** Check that the method readExcelFile is being called*/
    @Test
    public void readExcelTest() {
        /*try {
            verify(uploadCdes).readExcelFile();
        } catch (IOException e)
        {   System.err.println("Error when reading the excel file...");
            throw new RuntimeException(e);}*/
        try {cdeVariableController.readExcel();
            verify(cdeVariableController).readExcel();
        } catch (Exception e)
        {   System.err.println("Error when reading the excel file via calling the Controller...");
            throw new RuntimeException(e);}
    }

    @Test
    public void allCdeVersionsTest(){/*Not null does not mean it is not empty...*/
        List<Versions> cdeVersions = cdeVariableDAO.getAllCdeVersions();

        assertNotNull("CdeVersions list cannot be null.",cdeVersions);
        //assertThat("CdeVersions list cannot be empty.",cdeVersions,is(not(empty())));

        System.out.println("cde is: ");

        for(Versions cdeVersion: cdeVersions ){
            assertThat("",cdeVersion.getName(), notNullValue());
            assertThat(cdeVersion.getName(),containsString("cderr"));
            //assertThat(cdeVersion.getName(),contains("cde"));
            //assertThat(cdeVersion.getName(),hasToString());
            System.out.println(cdeVersion.getName());
        }
        //assertThat(cdeVariableDAO.getAllCdeVersions(), is());
        //asserSamecdeVariableDAO.getAllCdeVersions();
        //verify(cdeVariableDAO).getAllCdeVersions();
    }

    @Test
    public void getAllCDEVariablesByVersionTest(){
        //System.out.println("Test result :"+cdeVariableController.getAllCDEVariablesByVersion(BigInteger.valueOf(1)));
        System.out.println("Test result1 :"+cdeVariablesRepository.findById(BigInteger.valueOf(1)));
        System.out.println("Test result2 :"+cdeVariableDAO.findCDEVariablesByVersionId(BigInteger.valueOf(1)));
        System.out.println("Test result3 :"+cdeVariableController.getAllCDEVariablesByVersion(BigInteger.valueOf(1)));


    }
    // write test cases here
}