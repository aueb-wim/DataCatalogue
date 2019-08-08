/* Copyright 2015-2016 by the Athens University of Economics and Business (AUEB).
   This file is part of WebMIPMap.
   WebMIPMap is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    WebMIPMap is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with WebMIPMap.  If not, see <http://www.gnu.org/licenses/>.
 */

package com.admir.demiraj.datacatalogspringboot.service;

import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.util.Arrays;


@Configuration
@EnableOAuth2Sso
@RestController
@EnableWebSecurity
public class MIPSecurity extends WebSecurityConfigurerAdapter{

	@RequestMapping("/user")
	public Principal user(Principal principal) {
		return principal;
	}
         
	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http.antMatcher("/**")
			.authorizeRequests()
				.antMatchers("/", "/login**","/token","/user","/logout","/home", "/login",
                        "/pathology/allPathologies",
                        "/pathology/allPathologies/*",
                        "/pathology/allPathologies/**/name",
                        "/pathology/allPathologies/**/latest_cde_version",
                        "/hospital/readExcel",
                        "/report/batchreport/all",
                        "/mapping/mapFunctionAndMapCdeByVariableId",
                        "/CDE/readExcel",
                        "/hospital/allVariables",
                        "/hospital/allUniqueVariables",
                        "/CDE/allCdeVersions",
                        "/hospitals/hosp",
                        "/hospitals/hosp/*",
                        "/hospitals/allWithUniqueVariables",
                        "/versions/allVersionsPerHospital/*",
                        "/versions/latestVersionIdByHospId/*",
                        "/versions/getLatestVersionByHospitalId/*",
                        "/versions/allVersions/*",
                        "/versions/allVersions",
                        "/versions/jsonStringByVersionId/*",
                        "/versions/jsonStringVisualizableByVersionId/*",
                        "/versions/allVersionsPerHospital",
                        "/versions/latestCDEVersion",
                        "/mapping/down",
                        "/hospitals/name",
                        "/mapping/functions/",
                        "/mapping/randomFunction",
                        "/mapping/functionsByVersionId/*",
                        "//mapping/getallfiles",
                        "/report/getBatchReport/*",
                        "/report/getVariableReport/*",
                        "//mapping/getsample").permitAll()
				.anyRequest().authenticated()
                        .and().logout().logoutSuccessUrl("/").permitAll()
                        .and().exceptionHandling().authenticationEntryPoint(new CustomLoginUrlAuthenticationEntryPoint("http://195.251.252.222:2443/login"))
			.and().csrf().csrfTokenRepository(csrfTokenRepository())
			.and().addFilterAfter(csrfHeaderFilter(), CsrfFilter.class)
			;
	}



    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token","x-requested-with","X-Requested-With","XMLHttpRequest"));
        configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    private Filter csrfHeaderFilter() {
        return new OncePerRequestFilter() {
            @Override
            protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                            FilterChain filterChain) throws ServletException, IOException {

System.out.println("URL DETAILS: "+request.getRequestURL()+" token name: "+CsrfToken.class.getName());
                CsrfToken csrf = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
                if (csrf != null) {
                    Cookie cookie = WebUtils.getCookie(request, "XSRF-TOKEN");
                    System.out.println("cookie is :"+cookie);
                    String token = csrf.getToken();
                    System.out.println("token is  :"+token);
                    System.out.println("response header names :"+response);
                    if (cookie == null || token != null && !token.equals(cookie.getValue())) {
                        cookie = new Cookie("XSRF-TOKEN", token);
                        cookie.setPath("/");
                        response.addCookie(cookie);
                    }
                }
                filterChain.doFilter(request, response);
            }
        };
    }

    private CsrfTokenRepository csrfTokenRepository() {
        HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
        repository.setHeaderName("X-XSRF-TOKEN");
        return repository;
    }



}
