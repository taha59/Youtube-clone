package com.programming.taha.Youtubeclone.service;

import com.programming.taha.Youtubeclone.model.User;
import com.programming.taha.Youtubeclone.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    //Helper methods for user service
    private User getUserById(String userId){
        return userRepository.findById(userId).
                orElseThrow(() ->
                        new IllegalArgumentException
                                ("Cannot find user with id: " + userId));
    }

    private User getCurrentUser(){

        String sub = ((Jwt) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal())
                .getSubject();

        return userRepository.findBySub(sub)
                .orElseThrow(()->
                        new IllegalArgumentException("Cannot find user with sub - " + sub));
    }

    public void addToLikedVideos(String videoId) {
        User currentUser = getCurrentUser();
        currentUser.addToLikedVideos(videoId);
        userRepository.save(currentUser);
    }

    public void addToDislikedVideos(String videoId) {
        User currentUser = getCurrentUser();
        currentUser.addToDislikedVideos(videoId);
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
                anyMatch(dislikedVideo -> dislikedVideo.equals(videoId));

    }

    public void removeFromLikedVideos(String videoId) {
        User currentUser = getCurrentUser();
        currentUser.removeFromLikedVideos(videoId);
        userRepository.save(currentUser);
    }

    public void removeFromDislikedVideos(String videoId) {
        User currentUser = getCurrentUser();
        currentUser.removeFromDislikedVideos(videoId);
        userRepository.save(currentUser);
    }

    public void addToVideoHistory(String videoId) {
        User currentUser = getCurrentUser();
        currentUser.addToVideoHistory(videoId);
        userRepository.save(currentUser);
    }

    public void subscribeUser(String userId) {
        
        User currentUser = getCurrentUser();

        //add the user being subscribed to addToSubscribers set
        currentUser.addToSubscribedToUsers(userId);
        //save the changes of current user and the user that is being subscribed to
        userRepository.save(currentUser);

        //get user by id
        User user = getUserById(userId);

        //add the current user to the target user's subscribers
        user.addToSubscribers(currentUser.getId());

        userRepository.save(user);
    }

    public void unsubscribeUser(String userId) {
        User currentUser = getCurrentUser();

        //if a current user unsubscribes to another user then current user list
        currentUser.removeFromSubscribedToUsers(userId);

        userRepository.save(currentUser);

        //get User by id
        User user = getUserById(userId);

        //since the current user is no longer subscribed to target user
        //, remove the current user from the targets user's subscriber list
        user.removeFromSubscribers(currentUser.getId());

        //save the changes of current user and the user that is being subscribed to
        userRepository.save(user);
    }

    public Set<String> getUserHistory(String userId) {
        User user = getUserById(userId);
        return user.getVideoHistory();
    }
}
