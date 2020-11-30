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

import com.admir.demiraj.datacatalogspringboot.exceptionHandlers.UserActionLogging;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.oauth2.resource.AuthoritiesExtractor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties;
import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoTokenServices;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.NestedConfigurationProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.filter.OAuth2ClientAuthenticationProcessingFilter;
import org.springframework.security.oauth2.client.filter.OAuth2ClientContextFilter;
import org.springframework.security.oauth2.client.resource.BaseOAuth2ProtectedResourceDetails;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CompositeFilter;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.security.Principal;
import java.util.*;


import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
@RestController
@EnableWebSecurity
@EnableOAuth2Client
public class MIPSecurity extends WebSecurityConfigurerAdapter{

    //@Autowired
    //RoleBasedAuthendicator roleBasedAuthendicator;

    @Autowired
    RoleBasedAuthendicator roleBasedAuthendicator;

    @RequestMapping("/user")
    public Principal user(Principal principal) {
        return principal;
    }

    @RequestMapping("/userRoles")
    public Collection userRoles(Authentication auth) throws NoSuchFieldException {
        Collection collection = auth.getAuthorities();
        System.out.println("auth authorities:: "+auth.getAuthorities());
        System.out.println("auth details: "+auth.getDetails());
        System.out.println("auth credentials: "+auth.getCredentials());
        System.out.println("auth principal: "+auth.getPrincipal());
        return collection;
    }


    @Autowired
    @Qualifier("oauth2ClientContext")
    OAuth2ClientContext oauth2ClientContext;


    @Bean
    public FilterRegistrationBean oauth2ClientFilterRegistration(
            OAuth2ClientContextFilter filter) {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(filter);
        registration.setOrder(-100);
        return registration;
    }

    public boolean checkauth(Authentication authentication){
        return false;
    }


    public boolean checkUserHasAccessPathology(Authentication authentication, String pathology_name) {
        // here you can check if the user has the correct role
        // or implement more complex and custom authorization logic if necessary
        System.out.println("Pathology authendication"+authentication.getAuthorities());

        if(pathology_name.equals("dementia2")){
            return true;
        }else {
            return false;
        }

    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //http.addFilterBefore(new CORSFilter(), ChannelProcessingFilter.class);

        http
                //.antMatcher("/**")
                .authorizeRequests()
                //.antMatchers("/", "/login/keycloak", "/login**","/token","/user","/logout","/home", "/login",
                .antMatchers( "/login", "/login**","/token","/home","/perform_logout",
                        "/pathology/allPathologies",
                        "/pathology/allPathologies/*",
                        "/pathology/allPathologies/*/name",
                        "/pathology/allPathologies/*/latest_cde_version",
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
                        "//mapping/getsample")

                .permitAll()

                .antMatchers("/pathology/deletePathology/{pathology_name}",
                        "/pathology/newPathology/{pathology_name}",
                        "/hospitals/newHospital/{hospital_name}/{pathology_name}",
                        "/hospitals/deleteHospital/{hospital_name}/{pathology_name}",
                        "/versions/deleteCDEVersion/{version_id}/{pathology_name}",
                        "/versions/newVersionCde/{version_name}/{pathology_name}",
                        "/mapping/postCDE/{pathology_name}",
                        "/versions/newVersion/{hospital_name}/{pathology_name}",
                        "/mapping/postVariable/{hospital_name}/{pathology_name}",
                        "versions/deleteVariableVersion/{pathology_name}/{hospital_name}/{hospital_id}/{version_id}")
                .access("hasAnyAuthority('ROLE_DC_CONTROL_'+#pathology_name,'ROLE_DC_ADMIN','ROLE_DC_HOSPITAL_'+#hospital_name)")
                /*
                .antMatchers(
                        "/hospitals/newHospital/{hospital_name}/{pathology_name}",
                        "/hospitals/deleteHospital/{hospital_name}/{pathology_name}",
                        "/versions/newVersion/{hospital_name}/{pathology_name}",
                        "/mapping/postVariable/{hospital_name}/{pathology_name}")
                .access("hasAnyAuthority('ROLE_DC_HOSPITAL_'+#hospital_name,'ROLE_DC_ADMIN')")
                */
                .and().exceptionHandling().authenticationEntryPoint(new CustomLoginUrlAuthenticationEntryPoint("http://localhost:8086/login"))
                .and().logout().addLogoutHandler(authLogoutHandler()).logoutSuccessUrl("/")
                .logoutUrl("/perform_logout")
                .and().logout().permitAll()
                .and().csrf().ignoringAntMatchers("/perform_logout").csrfTokenRepository(csrfTokenRepository())


                .and().addFilterAfter(csrfHeaderFilter(), CsrfFilter.class)
                .addFilterBefore(ssoFilter(), BasicAuthenticationFilter.class);
                /*
                //NOTE ADD THIS SINCE IT IS BEING REMOVED ONLY FOR TESTING
                .anyRequest().hasRole("dc_admin")
                .and().csrf().csrfTokenRepository(csrfTokenRepository())
                .and().exceptionHandling().authenticationEntryPoint(new CustomLoginUrlAuthenticationEntryPoint("http://localhost:8086/login"))
                .and().addFilterBefore(ssoFilter(), BasicAuthenticationFilter.class)
                .addFilterAfter(csrfHeaderFilter(), CsrfFilter.class)
                .logout()
                .logoutUrl("/perform_logout")
                .logoutSuccessUrl("http://172.16.10.138:8080/datacatalogue")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID");
                */


    }
    private Filter ssoFilter() {
        CompositeFilter filter = new CompositeFilter();
        List<Filter> filters = new ArrayList<>();
        System.out.println("client resources"+keycloak().client);
        filters.add(ssoFilter(keycloak(), "/login"));
        filter.setFilters(filters);
        return filter;
    }
    //
    private Filter ssoFilter(ClientResources client, String path) {
        OAuth2ClientAuthenticationProcessingFilter filter = new OAuth2ClientAuthenticationProcessingFilter(path);
        OAuth2RestTemplate template = new OAuth2RestTemplate(client.getClient(), oauth2ClientContext);
        filter.setRestTemplate(template);
        UserInfoTokenServices tokenServices = new UserInfoTokenServices(
                client.getResource().getUserInfoUri(), client.getClient().getClientId());
        System.out.println("token type is: "+client.getResource().getTokenType());
        tokenServices.setRestTemplate(template);
        filter.setTokenServices(tokenServices);
        filter.setAuthenticationSuccessHandler(new SimpleUrlAuthenticationSuccessHandler("/"));//<--- NEW
        return filter;
    }

    @Bean
    @ConfigurationProperties("keycloak")
    public ClientResources keycloak() {
        return new ClientResources();
    }

    class ClientResources {

        @NestedConfigurationProperty
        private BaseOAuth2ProtectedResourceDetails client = new AuthorizationCodeResourceDetails();

        @NestedConfigurationProperty
        private ResourceServerProperties resource = new ResourceServerProperties();

        public BaseOAuth2ProtectedResourceDetails getClient() {
            return client;
        }

        public ResourceServerProperties getResource() {
            return resource;
        }
    }

    /*
    public void logout() {
        ClientResources client = new ClientResources();
        UserActionLogging.LogAction("refresh token ", this.oauth2ClientContext.getAccessToken().getRefreshToken().getValue());
        RestTemplate restTemplate = new RestTemplate();
        MultiValueMap<String, String> formParams = new LinkedMultiValueMap<>();
        formParams.add("client_id", client.getClient().getClientId());
        formParams.add("client_secret", client.getClient().getClientSecret());
        formParams.add("refresh_token", this.oauth2ClientContext.getAccessToken().getRefreshToken().getValue());
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE);
        UserActionLogging.LogAction("logoutUri is ", "http://195.251.252.222:2443");
        RequestEntity<MultiValueMap<String, String>> requestEntity =
                new RequestEntity<>(formParams, httpHeaders, HttpMethod.POST,
                        URI.create("http://195.251.252.222:2443"));
        ResponseEntity<String> responseEntity = restTemplate.exchange(requestEntity, String.class);
    }
*/

    @Value("${keycloak.client.logout_uri}")
    private String logoutURI;

    private LogoutHandler authLogoutHandler() {
        return (request, response, authentication) -> {
            System.out.println("request  uri: "+request.getRequestURI()+" request url"+request.getRequestURL());
            logout();
        };
    }



    public void logout() {
        // Prepare request parameters
        UserActionLogging.LogAction("refresh token ", this.oauth2ClientContext.getAccessToken().getRefreshToken().getValue());
        RestTemplate restTemplate = new RestTemplate();
        MultiValueMap<String, String> formParams = new LinkedMultiValueMap<>();
        formParams.add("client_id", keycloak().client.getClientId());
        formParams.add("client_secret", keycloak().client.getClientSecret());
        formParams.add("refresh_token", this.oauth2ClientContext.getAccessToken().getRefreshToken().getValue());
        // Prepare request headers
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE);
        // Do the request
        //UserActionLogging.LogAction("logoutUri is ", logoutUri);

        RequestEntity<MultiValueMap<String, String>> requestEntity =
                new RequestEntity<>(formParams, httpHeaders, HttpMethod.POST,
                        URI.create(logoutURI));
        // POSTリクエスト送信（ログアウト実行）

        ResponseEntity<String> responseEntity = restTemplate.exchange(requestEntity, String.class);
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


    private CsrfTokenRepository csrfTokenRepository() {
        HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
        repository.setHeaderName("X-XSRF-TOKEN");
        return repository;
    }



    private Filter csrfHeaderFilter() {
        return new OncePerRequestFilter() {
            @Override
            protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                            FilterChain filterChain) throws ServletException, IOException {
                CsrfToken csrf = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
                if (csrf != null) {

                    Cookie cookie = WebUtils.getCookie(request, "XSRF-TOKEN");
                    String token = csrf.getToken();

                    if (cookie == null || token != null && !token.equals(cookie.getValue())) {

                        cookie = new Cookie("XSRF-TOKEN", token);
                        cookie.setPath("/");
                        response.addCookie(cookie);
                        //added due to integration issues
                        cookie.setHttpOnly(false);
                    }
                }
                filterChain.doFilter(request, response);
            }
        };
    }


    @Bean
    public AuthoritiesExtractor keycloakAuthoritiesExtractor() {
        return new KeycloakAuthoritiesExtractor();
    }
    public class KeycloakAuthoritiesExtractor
            implements AuthoritiesExtractor {

        @Override
        public List<GrantedAuthority> extractAuthorities
                (Map<String, Object> map) {
            return AuthorityUtils
                    .commaSeparatedStringToAuthorityList(asAuthorities(map));
        }

        private String asAuthorities(Map<String, Object> map) {
            List<String> authorities = new ArrayList<>();
            List<LinkedHashMap<String, String>> authz;
            authz = (List<LinkedHashMap<String, String>>) map.get("authorities");
            for (LinkedHashMap<String, String> entry : authz) {
                authorities.add(entry.get("authority"));
            }
            return String.join(",", authorities);
        }
    }

    @Bean(name="hbpResource")
    @ConfigurationProperties("hbp.resource")
    public ResourceServerProperties hbpResource() {
        return new ResourceServerProperties();
    }


}