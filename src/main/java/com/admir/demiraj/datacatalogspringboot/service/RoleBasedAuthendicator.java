package com.admir.demiraj.datacatalogspringboot.service;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
public class RoleBasedAuthendicator {


    public boolean checkUserHasAccessPathology(Authentication authentication, String pathologyName) {
        // here you can check if the user has the correct authority
        // or implement more complex and custom authorization logic if necessary
        System.out.println("Pathology authendication"+authentication.getAuthorities());


        Collection allExistingAuthorities = authentication.getAuthorities();
        String expectedAuthority = "ROLE_DC_CONTROL_"+pathologyName;
        System.out.println("expectedAuthority"+expectedAuthority);

        if (allExistingAuthorities.contains("ROLE_DC_CONTROL_dementia")){
            System.out.println("You can acces pathology dementia");
        }

        if (allExistingAuthorities.contains(expectedAuthority)){
            return true;
        }else{
            return false;
        }
    }



    public boolean checkUserHasAccessPathology2(Authentication authentication) {
        // here you can check if the user has the correct role
        // or implement more complex and custom authorization logic if necessary
        System.out.println("Pathology authendication"+authentication.getAuthorities());

        return false;


    }
}
