package com.programming.taha.Youtubeclone.repository;

import com.programming.taha.Youtubeclone.model.Video;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VideoRepository extends MongoRepository<Video, String> {

}
