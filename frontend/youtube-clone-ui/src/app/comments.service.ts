import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentDto } from './comment-dto';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private readonly httpClient: HttpClient = inject(HttpClient)
  constructor() { }

  postComment(commentDto: any, videoId: string): Observable<any>{
    console.log("video is is :", videoId)
    return this.httpClient.post<any>("http://localhost:8080/api/videos/" + videoId + "/comment", commentDto)
  }

  getAllComments(videoId: string): Observable<Array<CommentDto>>{
    return this.httpClient.get<CommentDto[]>("http://localhost:8080/api/videos/" + videoId + "/comment")
  }
}
