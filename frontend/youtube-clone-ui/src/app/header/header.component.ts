import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit{

  isAuthenticated: boolean = false
  constructor(private oidcSecurityService: OidcSecurityService, private router: Router){}

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(
     ({isAuthenticated}) => {
      // console.log("this.")
      
      this.isAuthenticated = isAuthenticated
     }
    )
  }

  login(){
    console.log("loggin in..")
    this.oidcSecurityService.authorize()
  }

  logoff(){
    this.oidcSecurityService.logoffAndRevokeTokens()
    this.oidcSecurityService.logoffLocal()
    console.log("logging out..", this.isAuthenticated)
  }
}
