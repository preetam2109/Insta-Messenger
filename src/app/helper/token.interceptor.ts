import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoginService } from 'src/app/helper/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private totalRequests = 0; 

  constructor(private loginService:LoginService, private spinner: NgxSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.loginService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    if (this.totalRequests == 0) { this.spinner.show(); this.totalRequests = 1; } 
    return next.handle(request).pipe(finalize(() => { 
      if (this.totalRequests == 1) { 
        this.spinner.hide(); this.totalRequests = 0; 
      } 
    }) 
    );

  }
}
