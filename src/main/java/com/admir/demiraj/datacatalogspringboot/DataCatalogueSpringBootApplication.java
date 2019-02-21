package com.admir.demiraj.datacatalogspringboot;

import java.text.ParseException;
import java.util.Collections;
import java.util.Map;
import java.util.UUID;

//import com.admir.demiraj.datacatalogspringboot.service.StorageService;

import com.admir.demiraj.datacatalogspringboot.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
//import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestOperations;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.resource.OAuth2ProtectedResourceDetails;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
@EnableJpaAuditing
@RestController
//@EnableOAuth2Sso
//@Configuration
//@CrossOrigin(origins = "*", allowedHeaders={"x-auth-token", "x-requested-with", "x-xsrf-token"})
//@EnableOAuth2Sso
//@EnableOAuth2Resource
@EnableZuulProxy
//@EnableOAuth2Sso
//@EnableWebSecurity
///check this
//@EnableResourceServer
//check this
//@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders={"x-auth-token", "x-requested-with", "x-xsrf-token"})
@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders={"x-auth-token", "x-requested-with", "x-xsrf-token","Authorization","Content-Type"},
        methods = {RequestMethod.POST,RequestMethod.OPTIONS,RequestMethod.GET,RequestMethod.DELETE,RequestMethod.PUT})
//public class DataCatalogueSpringBootApplication implements CommandLineRunner {
public class DataCatalogueSpringBootApplication extends SpringBootServletInitializer {


    @Resource
    StorageService storageService;

    public static void main(String[] args) throws ParseException {
        SpringApplication.run(DataCatalogueSpringBootApplication.class, args); }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(DataCatalogueSpringBootApplication.class);
    }

    @Bean
    public OAuth2RestOperations restOperations(
            OAuth2ProtectedResourceDetails resource, @Qualifier("oauth2ClientContext") OAuth2ClientContext context) {
        return new OAuth2RestTemplate(resource, context);
    }

    @RequestMapping("/")
    @CrossOrigin(origins="*", maxAge=3600)
    public ModelAndView home1() {
        return new ModelAndView("redirect:" + "http://195.251.252.222:2442/login");
        //return "Hello";
    }
    @RequestMapping("/login2")
    @CrossOrigin(origins="*", maxAge=3600)
    public ModelAndView login2() {
        return new ModelAndView("redirect:" + "http://195.251.252.222:2442/login");
        //return "Hello from login";
    }



    @RequestMapping("/home")
    @CrossOrigin(origins="*", maxAge=3600)
    public String home() {

        //return "welcome";
        return "home2";
    }

    @RequestMapping("/token")
    public Map<String,String> token(HttpSession session) {
        return Collections.singletonMap("token", session.getId());
    }


    /*

     @RequestMapping("/login")
    @CrossOrigin(origins="*", maxAge=3600)
    public String login() {
        //return new ModelAndView("redirect:" + "http://195.251.252.222:2442/login");
        return "Hello from login";
    }

 @RequestMapping("/login")
    @CrossOrigin(origins="*", maxAge=3600)
    public ModelAndView login() {

        return new ModelAndView("redirect:" + "http://195.251.252.222:2442/login");
    }
    @RequestMapping("/login")
    @CrossOrigin(origins="*", maxAge=3600)
    public String login() {
        return "Hello World";
    }

    @Bean
    public OAuth2RestOperations restOperations(
            OAuth2ProtectedResourceDetails resource, @Qualifier("oauth2ClientContext") OAuth2ClientContext context) {
        return new OAuth2RestTemplate(resource, context);
    }

    ///oauth2ClientContext   (OAuth2ClientConfiguration.class) oauth2ClientContext   (OAuth2RestOperationsConfiguration.class)
    @Primary
    @Bean
    public OAuth2RestOperations restOperations(
            OAuth2ProtectedResourceDetails resource, OAuth2ClientContext context) {
        return new OAuth2RestTemplate(resource, context);
    }
*/


/*
 @GetMapping("/person")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public @ResponseBody
    String personInfo(){
        return  "andy";
    }

    @CrossOrigin(origins="*", maxAge=3600)
    @RequestMapping("/token")
    public Map<String,String> token(HttpSession session) {
        return Collections.singletonMap("token", session.getId());
    }

    @RequestMapping(value = "/available")
    public String available() {
        return "Spring in Action";
    }

    @RequestMapping(value = "/checked-out")
    public String checkedOut() {
        return "Spring Boot in Action";
    }

 @RequestMapping("/")
    public void home() {

        //return "welcome";
        //return new ModelAndView("redirect:" + "http://195.251.252.222:2442/login");
    }

    @RequestMapping("/")
    @CrossOrigin(origins="*", maxAge=3600)
    public String home() {
        return "Hello World";
    }
    @CrossOrigin(origins="*", maxAge=3600)
    @RequestMapping("/token")
    public Map<String,String> token(HttpSession session) {
        return Collections.singletonMap("token", session.getId());
    }

    @RequestMapping("/")
    public ModelAndView home() {

        //return "welcome";
        return new ModelAndView("redirect:" + "http://195.251.252.222:2442/login");
    }

     /////sending token to the frontend
    @RequestMapping("/token")
    public Map<String,String> token(HttpSession session) {
        return Collections.singletonMap("token", session.getId());
    }

*/



      /**
       * we can use this method to delete the preexisting files in variables
    @Override
    public void run(String... arg) throws Exception {
        storageService.deleteAll();
        storageService.init();
    }
*/
}
