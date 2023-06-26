import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../service/auth.service';



@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const authUser = JSON.parse(this.authenticationService.currentUserValue())
        
        const hasRoles = authUser.authorities.filter((value: { authority: string; })=> route.data.role.includes(value.authority))
        if (this.authenticationService.isLoggedIn() && authUser.username) {
  
            // logged in so return true
            if(hasRoles.length? true : false){
                return true;
            }else if(authUser.authorities[0].authority == route.data.role[1]){
                return true;
            }else{
                this.router.navigate(['']);
                return false;
            }
           
        }else{
          
            this.router.navigate(['']);
            return false;
        }

        // not logged in so redirect to login page with the return url
       
    }
}