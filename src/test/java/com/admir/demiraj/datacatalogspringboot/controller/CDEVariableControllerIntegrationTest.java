package com.admir.demiraj.datacatalogspringboot.controller;


import com.admir.demiraj.datacatalogspringboot.DataCatalogueSpringBootApplication;
//import com.admir.demiraj.datacatalogspringboot.Springbootfuultutorial2ApplicationTests;
import com.admir.demiraj.datacatalogspringboot.dao.CDEVariableDAO;
import com.admir.demiraj.datacatalogspringboot.repository.CDEVariablesRepository;
import com.admir.demiraj.datacatalogspringboot.service.UploadCdes;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigInteger;

@WebMvcTest(CDEVariableController.class)
public class CDEVariableControllerIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private UploadCdes uploadCdes;
    /////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////
    @Mock
    private CDEVariableController cdeVariableController;


    @Mock
    private CDEVariableDAO cdeVariableDAO;

    @Mock
    private CDEVariablesRepository cdeVariablesRepository;


    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }
    ///////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////
    @Test
    public void contextLoads() throws Exception {
    }

    @Test
    public void getAllCDEVariablesByVersionTets(){
        //System.out.println("Test result :"+cdeVariableController.getAllCDEVariablesByVersion(BigInteger.valueOf(1)));
        System.out.println("Test result1 :"+cdeVariablesRepository.findById(BigInteger.valueOf(1)));
        System.out.println("Test result2 :"+cdeVariableDAO.findCDEVariablesByVersionId(BigInteger.valueOf(1)));
        System.out.println("Test result3 :"+cdeVariableController.getAllCDEVariablesByVersion(BigInteger.valueOf(1)));


    }
    // write test cases here
}