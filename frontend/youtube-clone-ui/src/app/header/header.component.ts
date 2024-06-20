import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit{

  private readonly oidcSecurityService: OidcSecurityService = inject(OidcSecurityService)
  isAuthenticated: boolean = false

  constructor(){}

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(
     ({isAuthenticated}) => {
  
      this.isAuthenticated = isAuthenticated
     }
    )
  }

  login(){
    this.oidcSecurityService.authorize()

    console.log(this.isAuthenticated)
  }

  logoff(){
    this.oidcSecurityService.logoffAndRevokeTokens()
    this.oidcSecurityService.logoffLocal()
  }
}
