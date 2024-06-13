package com.programming.taha.Youtubeclone.controller;


import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @GetMapping("/register")
    public String register(@AuthenticationPrincipal Jwt jwt){
        System.out.println(jwt.getSubject());
        return "User registration Successful";
    }
}
