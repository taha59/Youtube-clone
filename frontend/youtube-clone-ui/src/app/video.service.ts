import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadVideoResponse } from './upload-video/UploadVideoResponse';
import { VideoDto } from './video-dto';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private readonly userService = inject(UserService)
  private readonly httpClient = inject(HttpClient)
  constructor() { }

  uploadVideoByFileDrop(fileEntry: File): Observable<UploadVideoResponse> {
    const userId = this.userService.getUser().id
    const formData = new FormData();
    formData.append('file', fileEntry, fileEntry.name);
    formData.append('userId', userId)

    console.log('Uploading video...');

    // Using HTTP for local development
    return this.httpClient.post<UploadVideoResponse>("http://localhost:8080/api/videos", formData);
  }

  uploadVideoByYoutubeUrl(youtubeUrl: string): Observable<UploadVideoResponse> {
    const userId = this.userService.getUser().id
    const formData = new FormData();

    formData.append('youtubeUrl', youtubeUrl)
    formData.append('userId', userId)


    console.log('Uploading video via url...');

    // Using HTTP for local development
    return this.httpClient.post<UploadVideoResponse>("http://localhost:8080/api/videos/upload-by-url", formData);
  }

  uploadThumbnail(fileEntry: File, videoId: string): Observable<string> {
    const formData = new FormData();
    formData.append('file', fileEntry, fileEntry.name);
    formData.append('videoId', videoId)

    console.log('Uploading thumbnail...');

    // Using HTTP post for uploading thumbnail
    return this.httpClient.post("http://localhost:8080/api/videos/thumbnail", formData, {responseType: 'text'});
  }

  getVideo(videoId: string): Observable<VideoDto>{
    return this.httpClient.get<VideoDto>("http://localhost:8080/api/videos/" + videoId);
  }

  editVideoMetadata(videoDto: VideoDto): Observable<any>{
    return this.httpClient.put<VideoDto>("http://localhost:8080/api/videos", videoDto);
  }

  getAllVideos(): Observable<Array<VideoDto>>{
    return this.httpClient.get<Array<VideoDto>>("http://localhost:8080/api/videos")
  }

  deleteAllVideos() {
    return this.httpClient.delete("http://localhost:8080/api/videos", {responseType: 'text'})
  }

  likeVideo(videoId: string): Observable<VideoDto> {
    return this.httpClient.post<VideoDto>("http://localhost:8080/api/videos/"+videoId+"/like", null)
  }

  dislikeVideo(videoId: string): Observable<VideoDto> {
    return this.httpClient.post<VideoDto>("http://localhost:8080/api/videos/"+videoId+"/dislike", null)
  }
}
