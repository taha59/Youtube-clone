package com.programming.taha.Youtubeclone.service;

import com.programming.taha.Youtubeclone.model.User;
import com.programming.taha.Youtubeclone.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getCurrentUser(){

        String sub = ((Jwt) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal())
                .getClaim("sub");

        System.out.println(sub);

        return userRepository.findFirstBySub(sub)
                .orElseThrow(()->
                        new IllegalArgumentException("Cannot find user with sub - " + sub));
    }

    public void addToLikedVideos(String videoId) {
        User currentUser = getCurrentUser();
        currentUser.addToLikedVideos(videoId);
        userRepository.save(currentUser);
    }


    public boolean ifLikedVideo(String videoId){
        return getCurrentUser().
                getLikedVideos().stream().
                anyMatch(likedVideo -> likedVideo.equals(videoId));

    }

    public boolean ifDislikedVideo(String videoId){
        return getCurrentUser().
                getDislikedVideos().stream().
                anyMatch(disLikedVideo -> disLikedVideo.equals(videoId));

    }

    public void removeFromLikedVideos(String videoId) {
        User currentUser = getCurrentUser();
        currentUser.removeFromLikedVideos(videoId);
        userRepository.save(currentUser);
    }
}
