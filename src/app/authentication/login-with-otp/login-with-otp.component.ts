import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/helper/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { response } from 'src/app/model/response';
import { tbl_login, tbl_varifyied_response } from 'src/app/model/tbl-login';
import { model_authentication } from 'src/app/model/model-authentication';
import { Role } from 'src/app/model/role';
import { Base } from 'src/app/helper/base';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-login-with-otp',
  templateUrl: './login-with-otp.component.html',
  styleUrls: ['./login-with-otp.component.css']
})
export class LoginWithOtpComponent implements OnInit {

  logginWithOTPForm: FormGroup;
  submitted = false;
  loginData: model_authentication = new model_authentication();
  base:any;
  regExpPatterEMAILmobile="^(((\\+91-?)|0)?[0-9]{10})$|^([a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4})$";
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.base = Base;
    this.logginWithOTPForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.regExpPatterEMAILmobile), Validators.minLength(10)]],
      otp: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
    const queryParamValue = Number(this.activatedRoute.snapshot.queryParamMap.get('p'));
  }


  time: number = 0;
  resendOTP!: boolean
  getOTP: boolean = true
  display: any
  interval: any = 8

  response!: any
  ForFormExpand: boolean = false;
  getOTPForLogin(n:number) {
    // //debugger
    this.submitted = true;
    if (this.logginWithOTPForm.value.email) {
      this.submitted = false;
      this.time=n;
      this.interval = setInterval(() => {
        if (this.time != 0) {
          this.getOTP=false;
          this.time--;
          this.resendOTP=true;

        } else {
          this.resendOTP=false;
          // this.interval=2
          clearInterval(this.interval)
          return
          // this.time--;
        }
        this.display = this.transform(this.time)
      }, 1000);
     
      this.loginData.email = this.logginWithOTPForm.value.email;
      this.loginData.otP_for = '2';
      this.loginService.get_otp_for_With_otp_login(this.loginData).subscribe((res: response) => {
        this.response
        if (res.status == 'Success') {
          this.ForFormExpand = true;
        }
      });
    }


  }

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + ':' + (value - minutes * 60);
  }

  loginWithOtp() {
    debugger
    this.submitted = true;
    this.loginData = this.logginWithOTPForm.value;
    // this.loginData.email = resetFormData.email;
    this.loginData.otP_for = '2';
    // const queryParamValue = Number(this.activatedRoute.snapshot.queryParamMap.get('p'));
    this.loginService.login_with_otp(this.loginData).subscribe((res: tbl_varifyied_response) => {
      if (res.status == 'Success') {
        localStorage.setItem("ltn", JSON.stringify(res.token))
        localStorage.setItem("currentUser", JSON.stringify(res))
        switch (res.role) {
         
          case Role.Admin: {
            this.router.navigate(['/home']);
            break;
          }
          // case Role.Generator: {
          //   this.router.navigate(['generate-qr']);

          //   break;
          // }
          case Role.Scanner: {
            this.router.navigate(['scan-qr']);
            break;
          }
        }
      } else {
        alert("Internal Server Error! Try Again");
      }
    });


  }

  get f() {
    return this.logginWithOTPForm.controls;
  }

}
