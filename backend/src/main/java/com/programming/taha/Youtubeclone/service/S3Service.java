package com.programming.taha.Youtubeclone.service;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3Service implements FileService{

    public static final String BUCKETNAME = "youtubefilesbucket";

    private final S3Client s3Client = S3Client.create();

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

    @Override
    public void deleteFiles() {
        // List all objects in the bucket
        ListObjectsRequest listObjects = ListObjectsRequest
                .builder()
                .bucket(BUCKETNAME)
                .build();

        ListObjectsResponse res = s3Client.listObjects(listObjects);

        ArrayList<ObjectIdentifier> toDeleteObjectIdentifiers = new ArrayList<>();

        for(S3Object object: res.contents()) {
            System.out.println(object.key());
            toDeleteObjectIdentifiers.add(ObjectIdentifier.builder()
                    .key(object.key())
                    .build());
        }

        Delete del = Delete.builder()
                .objects(toDeleteObjectIdentifiers)
                .build();

        try {
            DeleteObjectsRequest multiObjectDeleteRequest = DeleteObjectsRequest.builder()
                    .bucket(BUCKETNAME)
                    .delete(del)
                    .build();

            s3Client.deleteObjects(multiObjectDeleteRequest);
            System.out.println("Multiple objects are deleted!");

        } catch (S3Exception e) {
            System.err.println(e.awsErrorDetails().errorMessage());
        }
    }
}
