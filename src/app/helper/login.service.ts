import { HttpClient } from '@angular/common/http';
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { model_authentication } from '../model/model-authentication';
import { response } from '../model/response';
import { tbl_login, tbl_varifyied_response } from '../model/tbl-login';
import { Base } from 'src/app/helper/base';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

baseUrl:any;

  public currentUser : BehaviorSubject<tbl_varifyied_response>;
  constructor(private http: HttpClient, private router:Router) {
    this.currentUser = new BehaviorSubject
    <tbl_varifyied_response>(JSON.parse(localStorage.getItem('currentUser') || '{}'))
    this.baseUrl= Base.baseUrl;
   }
   public get currentUserValue():tbl_varifyied_response{
   return new BehaviorSubject<tbl_varifyied_response>(JSON.parse(localStorage.getItem('currentUser') || '{}')).value;
   }
  getToken(): string | null {
    return JSON.parse(localStorage.getItem('ltn')!);
  }
  isLoggedIn() {
    return this.getToken() != null;
  }
  loggedOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('ltn');
    this.router.navigate(['login']);
  }

  login(loginData: any) {
    debugger;
    return this.http.post(this.baseUrl+"authenticate/login",loginData)
  }
  onGetOTPClick(data: tbl_login) {
    // http://instamessangerapi.shivaminfosoft.in/api/authenticate/validate_otp_new_reg
    //http://instamessangerapi.shivaminfosoft.in/api/authenticate/get_otp_new_reg
    // return this.http.post<response>(this.baseUrl+"Authenticate/new_reg_get_otp",data)
     return this.http.post<response>(this.baseUrl+"authenticate/get_otp_new_reg",data)

  }
  otpValidate(customerDetails: any) {
    return this.http.post<any>(this.baseUrl+"authenticate/validate_otp_new_reg",customerDetails);
    
  }
  get_otp(loginData: model_authentication) {
    return this.http.post<response>(this.baseUrl+`Authenticate/get_otp`, loginData);
  }
  verify_otp(loginData: model_authentication) {
    return this.http.post<response>(this.baseUrl+`Authenticate/verify_otp`, loginData);
  }
  reset_password(loginData: model_authentication) {
    return this.http.post<tbl_varifyied_response>(this.baseUrl+`Authenticate/reset_password`, loginData);
  }
  get_otp_for_With_otp_login(getOtpData: model_authentication) {
    return this.http.post<response>(this.baseUrl+`Authenticate/get_otp`, getOtpData);
  }
  login_with_otp(loginData: model_authentication) {
    return this.http.post<tbl_varifyied_response>(this.baseUrl+`Authenticate/verify_otp`, loginData);
  }

}
