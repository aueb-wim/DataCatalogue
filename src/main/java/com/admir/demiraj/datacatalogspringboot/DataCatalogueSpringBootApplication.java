package com.admir.demiraj.datacatalogspringboot;

import java.text.ParseException;
import com.admir.demiraj.datacatalogspringboot.service.StorageService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.bind.annotation.*;
import javax.annotation.Resource;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
@EnableJpaAuditing
@RestController
public class DataCatalogueSpringBootApplication extends SpringBootServletInitializer {


    @Resource
    StorageService storageService;

    public static void main(String[] args) throws ParseException {
        SpringApplication.run(DataCatalogueSpringBootApplication.class, args); }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(DataCatalogueSpringBootApplication.class);
    }


      /**
       * we can use this method to delete the preexisting files in variables
    @Override
    public void run(String... arg) throws Exception {
        storageService.deleteAll();
        storageService.init();
    }
*/
}
