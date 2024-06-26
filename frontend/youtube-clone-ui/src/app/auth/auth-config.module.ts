import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://dev-i7w2dy2y7hkvaw2g.us.auth0.com',
            redirectUrl: window.location.origin + '/callback',
            clientId: 'E562iLCGGtNiLJl4XDWytAMRnVIwMHvk',
            scope: 'openid profile offline_access email',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            postLogoutRedirectUri: window.location.origin,
            secureRoutes: ['http://localhost:8080'],
            customParamsAuthRequest: {
                audience: 'http://localhost:8080',
            }
        }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
