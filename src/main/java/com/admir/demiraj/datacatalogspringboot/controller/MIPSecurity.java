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

package com.admir.demiraj.datacatalogspringboot.controller;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.util.Arrays;


@Configuration
@EnableOAuth2Sso
@EnableZuulProxy
//@Order(SecurityProperties.BASIC_AUTH_ORDER)//check this
//@EnableResourceServer
@RestController
@EnableWebSecurity
//@CrossOrigin(origins = "*", allowedHeaders={"x-auth-token", "x-requested-with", "x-xsrf-token"})
@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders={"x-auth-token", "x-requested-with", "x-xsrf-token","Authorization","Content-Type"},
        methods = {RequestMethod.POST,RequestMethod.OPTIONS,RequestMethod.GET,RequestMethod.DELETE, RequestMethod.PUT})
public class MIPSecurity extends WebSecurityConfigurerAdapter{

    @CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders={"x-auth-token", "x-requested-with", "x-xsrf-token","Authorization","Content-Type"},
            methods = {RequestMethod.POST,RequestMethod.OPTIONS,RequestMethod.GET,RequestMethod.DELETE, RequestMethod.PUT})
	@RequestMapping("/user")
	public Principal user(Principal principal) {
		return principal;
	}
         
	@Override
	protected void configure(HttpSecurity http) throws Exception {
        	System.out.println("Inside configure");
                //http.csrf().disable();		
                // @formatter:off	
		http.antMatcher("/**")
			.authorizeRequests()
				//.antMatchers("/anonymous*").anonymous()//added
				.antMatchers("/", "/login**","/token","/user","/logout","/home", "/login",
                        "/hospital/readExcel",
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
                        "/mapping/down",
                        "/hospitals/name",
                        "/mapping/functions/",
                        "/mapping/randomFunction",
                        "/mapping/functionsByVersionId/*",
                        //"/versions/newVersion",
                        "//mapping/getallfiles",
                        "//mapping/getsample").permitAll()
                                //.antMatchers("/SaveMappingTaskGlobal").hasRole("ADMIN")
				.anyRequest().authenticated()
                        .and().logout().logoutSuccessUrl("/").permitAll()
                        .and().exceptionHandling().authenticationEntryPoint(new CustomLoginUrlAuthenticationEntryPoint("http://195.251.252.222:2443/login"))
			.and().csrf().csrfTokenRepository(csrfTokenRepository())
			.and().addFilterAfter(csrfHeaderFilter(), CsrfFilter.class)
			;
		// @formatter:on
	}

    public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
        security.allowFormAuthenticationForClients();}

   // @Override
    protected void configure9(HttpSecurity http) throws Exception {
        http.httpBasic().disable();
        http.authorizeRequests().anyRequest().authenticated();
    }

    //@Override
    protected void configure2(HttpSecurity http)
            throws Exception {
        http.csrf().disable().authorizeRequests()
                .antMatchers("/").permitAll();
       /*
       *
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/login").permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();

                */
    }

	//@Override
	protected void configure4(HttpSecurity http) throws Exception {
		http
				.httpBasic()
				.and()
				.authorizeRequests()
				.antMatchers("/index.html", "/", "/home", "/login","/hospitals","/token","/user").permitAll()
				.anyRequest().authenticated();
	}


    //@Override
    protected void configure6(HttpSecurity http) throws Exception {
        //http.csrf().disable();
        // @formatter:off
        http.antMatcher("/**")
                .authorizeRequests()
                .antMatchers("/", "/login**","/hospitals","hospitals/cde-variables","/token","/user","hospitals/cde-variables","/logout").permitAll()
                //.antMatchers("/SaveMappingTaskGlobal").hasRole("ADMIN")
                .anyRequest().authenticated()
                .and().logout().logoutSuccessUrl("/").permitAll()
                .and().exceptionHandling().authenticationEntryPoint(new CustomLoginUrlAuthenticationEntryPoint("/login/hbp"))
                .and().csrf().csrfTokenRepository(csrfTokenRepository())
                .and().addFilterAfter(csrfHeaderFilter(), CsrfFilter.class)
        ;
        // @formatter:on
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

               // response.setHeader("Access-Control-Request-Headers", "X-Requested-With, Content-Type, Accept");///
                //response.setHeader("Access-Control-Allow-Headers", "Origin, x-requested-with, content-type, Accept,AUTH-TOKEN, authorization,xsrf-token");///
                //response.addHeader("Access-Control-Allow-Origin", "*");
               // response.addHeader("Access-Control-Allow-Methods", "POST,PUT, GET, OPTIONS, DELETE");////
                //response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
               // response.addHeader("Access-Control-Max-Age", "3600");//////
               // response.setHeader("Access-Control-Allow-Origin", "*");
                //response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                //response.setHeader("Access-Control-Max-Age", "3600");
                //response.setHeader("Access-Control-Allow-Headers", "authorization, content-type, xsrf-token");
               // response.addHeader("Access-Control-Expose-Headers", "xsrf-token");
System.out.println("URL DETAILS: "+request.getRequestURL()+" token name: "+CsrfToken.class.getName());
                CsrfToken csrf = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
                if (csrf != null) {
                    Cookie cookie = WebUtils.getCookie(request, "XSRF-TOKEN");
                    System.out.println("cookie is :"+cookie);
                    String token = csrf.getToken();
                    System.out.println("token is  :"+token);
                    System.out.println("response header names :"+response);
                    //System.out.println("response header names :"+response.encodeRedirectURL("http://195.251.252.222:2442/login"));
                    //response.encodeRedirectURL("http://195.251.252.222:2442/login");
                    if (cookie == null || token != null && !token.equals(cookie.getValue())) {
                        cookie = new Cookie("XSRF-TOKEN", token);
                        cookie.setPath("/");
                        //cookie.setPath("http://195.251.252.222:2442");
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
