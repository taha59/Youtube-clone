import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadVideoResponse } from './upload-video/UploadVideoResponse';
import { VideoDto } from './video-dto';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpClient: HttpClient) { }

  uploadVideo(fileEntry: File): Observable<UploadVideoResponse> {
    const formData = new FormData();
    formData.append('file', fileEntry, fileEntry.name);

    console.log('Uploading video...');

    // Using HTTP for local development
    return this.httpClient.post<UploadVideoResponse>("http://localhost:8080/api/videos", formData);
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
}
