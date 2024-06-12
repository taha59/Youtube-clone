import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://dev-i7w2dy2y7hkvaw2g.us.auth0.com',
            redirectUrl: window.location.origin,
            clientId: 'E562iLCGGtNiLJl4XDWytAMRnVIwMHvk',
            scope: 'openid profile offline_access',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
        }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
