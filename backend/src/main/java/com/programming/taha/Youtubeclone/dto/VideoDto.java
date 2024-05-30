package com.programming.taha.Youtubeclone.dto;

import com.programming.taha.Youtubeclone.model.VideoStatus;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VideoDto {
    String id;
    private String title;
    private String description;
    private String userId;
    private Integer likes;
    private Integer dislikes;
    private Set<String> tags;
    private String videoUrl;
    private VideoStatus videoStatus;
    private Integer viewCount;
    private String thumbnailUrl;
}
