import { HttpClient } from '@angular/common/http';
import { Injectable, inject, numberAttribute } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from './user-dto';
import { VideoDto } from './video-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly httpClient: HttpClient = inject(HttpClient)
  private user: UserDto
  constructor() { }

  registerUser() {
    this.httpClient.get<UserDto>("http://localhost:8080/api/user/register")
    .subscribe(user =>{
      this.user = user
    })
  }

  getUpdatedUser(): Observable<UserDto> {
    return this.httpClient.get<UserDto>("http://localhost:8080/api/user/register")
  }

  getTargetUser(userId: string): Observable<UserDto> {
    return this.httpClient.get<UserDto>("http://localhost:8080/api/user/" + userId)
  }

  subscribeToUser(userId: string): Observable<boolean>{
    return this.httpClient.post<boolean>("http://localhost:8080/api/user/subscribe/"+userId, null)
  }

  unsubscribeToUser(userId: string): Observable<boolean>{
    return this.httpClient.post<boolean>("http://localhost:8080/api/user/unsubscribe/"+userId, null)
  }

  getUserHistory(): Observable<Array<VideoDto>>{
    return this.httpClient.get<Array<VideoDto>>("http://localhost:8080/api/user/history")
  }

  getLikedVideos(): Observable<Array<VideoDto>>{
    return this.httpClient.get<Array<VideoDto>>("http://localhost:8080/api/user/liked-videos")
  }

  getSubscribedVideos(): Observable<Array<VideoDto>>{
    return this.httpClient.get<Array<VideoDto>>("http://localhost:8080/api/user/subscriptions")
  }

  getUser(): UserDto{
    return this.user
  }
}
