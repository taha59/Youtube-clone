import { Component, OnInit, inject } from '@angular/core';
import { VideoService } from '../video.service';
import { VideoDto } from '../video-dto';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.css'
})
export class FeaturedComponent implements OnInit {
  
  private readonly videoService: VideoService = inject(VideoService)
  featuredVideos: Array<VideoDto> = [];

  constructor(){}
  
  ngOnInit(): void {
    this.videoService.getAllVideos().subscribe(res => {
      this.featuredVideos = res
    })
  }

}
