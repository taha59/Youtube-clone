import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly httpClient: HttpClient = inject(HttpClient)
  private userId: string = ''

  constructor() { }
   registerUser() {
      this.httpClient.get("http://localhost:8080/api/user/register", {responseType: 'text'}).subscribe(data =>{
        this.userId = data
        console.log(this.userId)
      })
    }

  subscribeToUser(userId: string): Observable<boolean>{
    return this.httpClient.post<boolean>("http://localhost:8080/api/user/subscribe/"+userId, null)
  }

  unsubscribeToUser(userId: string): Observable<boolean>{
    return this.httpClient.post<boolean>("http://localhost:8080/api/user/unsubscribe/"+userId, null)
  }

  getUserId(): string{
    return this.userId
  }
}
