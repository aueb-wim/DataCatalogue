package com.admir.demiraj.datacatalogspringboot;

import java.text.ParseException;

//import com.admir.demiraj.datacatalogspringboot.service.StorageService;

import com.admir.demiraj.datacatalogspringboot.service.StorageService;
import com.admir.demiraj.datacatalogspringboot.service.UploadCdes;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@SpringBootApplication
@EnableJpaAuditing
@RestController
//public class DataCatalogueSpringBootApplication implements CommandLineRunner {
public class DataCatalogueSpringBootApplication {

    @Resource
    StorageService storageService;

    public static void main(String[] args) throws ParseException {
        SpringApplication.run(DataCatalogueSpringBootApplication.class, args); }

      /**
       * we can use this method to delete the preexisting files in variables
    @Override
    public void run(String... arg) throws Exception {
        storageService.deleteAll();
        storageService.init();
    }
*/
}
