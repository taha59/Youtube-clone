package com.programming.taha.Youtubeclone.service;

import com.programming.taha.Youtubeclone.model.Video;
import com.programming.taha.Youtubeclone.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final S3Service s3Service;
    private final VideoRepository videoRepository;
    public void uploadVideo(MultipartFile multipartFile) {
        //upload file to AWS
        String videoURL = s3Service.uploadFile(multipartFile);
        var video = new Video();
        video.setVideoUrl(videoURL);

        //save video data to database
        videoRepository.save(video);
    }
}
