import { Component, OnInit, inject } from '@angular/core';
import { VideoService } from '../video.service';
import { VideoDto } from '../video-dto';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.css'
})
export class FeaturedComponent implements OnInit {
  
  private readonly videoService: VideoService = inject(VideoService)
  private readonly oidcSecurityService: OidcSecurityService = inject(OidcSecurityService)

  featuredVideos: Array<VideoDto> = [];


  constructor(){}
  
  
  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({isAuthenticated}) => {
        
        if(isAuthenticated){
          this.videoService.getAllVideos().subscribe(res => {
            this.featuredVideos = res
          })
        }
      }
     )
  }

}
