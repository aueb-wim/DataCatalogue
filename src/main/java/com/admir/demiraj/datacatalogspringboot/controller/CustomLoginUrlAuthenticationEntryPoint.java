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

//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders={"x-auth-token", "x-requested-with", "x-xsrf-token","Authorization","Content-Type","X-Auth-Token"},
        methods = {RequestMethod.POST,RequestMethod.OPTIONS,RequestMethod.GET,RequestMethod.DELETE, RequestMethod.PUT})
class CustomLoginUrlAuthenticationEntryPoint extends LoginUrlAuthenticationEntryPoint {

    public CustomLoginUrlAuthenticationEntryPoint(String url) {
        super(url);
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setHeader("Access-Control-Request-Headers", "X-Requested-With, Content-Type, Accept");///
        response.setHeader("Access-Control-Allow-Headers", "Origin, x-requested-with, Content-Type, Accept,AUTH-TOKEN,x-auth-token, Authorization, X-Auth-Token");///
        response.addHeader("Access-Control-Allow-Origin", "*");////
        response.addHeader("Access-Control-Allow-Methods", "POST,PUT, GET, OPTIONS, DELETE");////
        response.addHeader("Access-Control-Max-Age", "3600");//////
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
    }

}
