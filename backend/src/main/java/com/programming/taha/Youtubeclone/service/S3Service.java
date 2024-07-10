package com.programming.taha.Youtubeclone.service;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3Service implements FileService{

    public static final String BUCKETNAME = "youtubefilesbucket";

    private final S3Client s3Client;

    @Override
    public String uploadFile (MultipartFile file) {

        var filenameExtension = StringUtils.getFilenameExtension(file.getOriginalFilename());

        var key = UUID.randomUUID() + "." + filenameExtension;

        try {
            PutObjectRequest objectRequest = PutObjectRequest.builder()
                    .bucket(BUCKETNAME)
                    .key(key)
                    .acl(ObjectCannedACL.PUBLIC_READ)
                    .build();

            s3Client.putObject(objectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

        } catch (IOException ioException){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error uploading File!");
        }


        var video_url = s3Client.utilities().getUrl(GetUrlRequest.builder().bucket(BUCKETNAME).key(key).build());

        System.out.println(video_url);
        return video_url.toString();
    }
}
