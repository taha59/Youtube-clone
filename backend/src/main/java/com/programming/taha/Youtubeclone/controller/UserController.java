package com.programming.taha.Youtubeclone.controller;


import com.programming.taha.Youtubeclone.service.UserRegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRegistrationService userRegistrationService;

    //endpoint for registering a user
    @GetMapping("/register")
    public String register(@AuthenticationPrincipal Jwt jwt){

        userRegistrationService.registerUser(jwt.getTokenValue());
        return "User registration Successful";
    }
}
