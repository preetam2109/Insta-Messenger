import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from '../helper/login.service';
import { tbl_varifyied_response } from '../model/tbl-login';
// import { AuthenticationService } from '../service/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { BaseServiceService } from '../service/base-service.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private baseServiceService: BaseServiceService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //debugger
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || '{}');

    if (!this.baseServiceService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    } else {
      if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
        alert("Unauthorized Access")
        this.router.navigate(['/login']);
        return false;
      }
      return this.baseServiceService.isLoggedIn();
    }
  }

    canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      //debugger
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || '{}');

    if (!this.baseServiceService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    } else {
      if (childRoute.data.roles && childRoute.data.roles.indexOf(currentUser.role) === -1) {
        alert("Unauthorized Access")
        this.router.navigate(['/login']);
        return false;
      }
      return this.baseServiceService.isLoggedIn();
    }
  }
}
