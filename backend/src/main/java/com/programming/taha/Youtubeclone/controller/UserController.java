package com.programming.taha.Youtubeclone.controller;


import com.programming.taha.Youtubeclone.service.UserRegistrationService;
import com.programming.taha.Youtubeclone.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRegistrationService userRegistrationService;
    private final UserService userService;

    //endpoint for registering a user
    @GetMapping("/register")
    @ResponseStatus(HttpStatus.OK)
    public String register(@AuthenticationPrincipal Jwt jwt){

        userRegistrationService.registerUser(jwt);

        return "User Registered!";
    }

    //endpoint for subscribing to a user
    @PostMapping("/subscribe/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public boolean subscribeUser(@PathVariable String userId){
        userService.subscribeUser(userId);
        return true;
    }

    //endpoint for unsubscribing to a user
    @PostMapping("/unsubscribe/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public boolean unsubscribeUser(@PathVariable String userId){
        userService.unsubscribeUser(userId);
        return true;
    }

    //get the video history of a user
    @GetMapping("/{userId}/history")
    @ResponseStatus(HttpStatus.OK)
    public Set<String> getUserHistory(@PathVariable String userId){
        return userService.getUserHistory(userId);
    }


}
