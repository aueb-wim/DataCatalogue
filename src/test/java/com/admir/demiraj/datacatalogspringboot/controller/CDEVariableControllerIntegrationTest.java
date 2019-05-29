package com.admir.demiraj.datacatalogspringboot.controller;


import com.admir.demiraj.datacatalogspringboot.DataCatalogueSpringBootApplication;
//import com.admir.demiraj.datacatalogspringboot.Springbootfuultutorial2ApplicationTests;
import com.admir.demiraj.datacatalogspringboot.service.UploadCdes;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(CDEVariableController.class)
public class CDEVariableControllerIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private UploadCdes uploadCdes;

    @Test
    public void contextLoads() throws Exception {
    }
    // write test cases here
}