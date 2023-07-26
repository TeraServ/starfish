import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';



@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        const currentUser = JSON.parse(this.authenticationService.currentUserValue())
       
        if (currentUser) {
           
            request = request.clone({
                setHeaders:
                        {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ` + `${currentUser.token}`,
                        }
                
            });
        
        }

        return next.handle(request);
    }
}