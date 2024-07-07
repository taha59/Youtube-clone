import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit{
  private readonly userService: UserService = inject(UserService)
  private readonly router: Router = inject(Router)
  private readonly oidcSecurityService: OidcSecurityService = inject(OidcSecurityService)

  constructor(){
  }

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({isAuthenticated}) => {
        if(isAuthenticated){
        this.userService.registerUser()
        }
      }
     )
  }
}
