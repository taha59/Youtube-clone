import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../video.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrl: './video-detail.component.css'
})
export class VideoDetailComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly videoService = inject(VideoService)
  private readonly userService = inject(UserService)
  
  videoId: string;
  videoUrl: string;
  videoTitle: string
  videoDescription: string
  videoTags: Array<string> = []
  likeCount: number = 0
  dislikeCount: number = 0
  viewCount: number = 0

  isSubscribed: boolean = true
  isUnsubscribed: boolean = false
  
  videoAvailable: boolean = false
  
  constructor(){
    this.videoId = this.activatedRoute.snapshot.params['videoId']

    this.videoService.getVideo(this.videoId).subscribe(data =>
      {
        console.log(data.videoUrl)
        this.videoUrl = data.videoUrl
        this.videoTitle = data.title
        this.videoDescription = data.description
        this.videoTags = data.tags
        this.videoAvailable = true
        this.likeCount = data.likeCount
        this.dislikeCount = data.dislikeCount
        this.viewCount = data.viewCount
      }
    )
  }

  ngOnInit(): void{}

  likeVideo(){
    this.videoService.likeVideo(this.videoId).subscribe((data)=>{
      this.likeCount = data.likeCount
      this.dislikeCount = data.dislikeCount
    })
  }

  dislikeVideo(){
    this.videoService.dislikeVideo(this.videoId).subscribe((data)=>{
      this.likeCount = data.likeCount
      this.dislikeCount = data.dislikeCount
    })
  }

  subscribeToUser(){
    
    let userId = this.userService.getUserId()
    console.log("subscribing user id is: ", userId)

    this.userService.subscribeToUser(userId).subscribe(data => {
      this.isSubscribed = false
      this.isUnsubscribed = true
    })
  }

  unsubscribeToUser(){
    let userId = this.userService.getUserId()
    console.log("unsubscribing user id is: ", userId)

    this.userService.unsubscribeToUser(userId).subscribe(data => {
      this.isSubscribed = true
      this.isUnsubscribed = false
    })
  }

}
