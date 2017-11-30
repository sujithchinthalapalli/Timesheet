import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,private oauthService: OAuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')||this.oauthService.hasValidIdToken()) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/pages/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}