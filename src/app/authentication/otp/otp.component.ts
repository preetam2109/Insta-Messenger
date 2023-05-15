import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/helper/login.service';
import { model_authentication } from 'src/app/model/model-authentication';
import { response } from 'src/app/model/response';
import {
  tbl_company,
  tbl_login,
  tbl_validateotp,
} from 'src/app/model/tbl-login';
import { md_company_reg } from 'src/app/model/tbl-model';

export interface tbl_otp_response {
  status: string;
  token: string;
  expiration: Date;
  aame: string;
  phto: string;
}

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit {
  response!: response;
  otpForm: FormGroup;
  otp_data!: number;
  verify_otp_data: model_authentication = new model_authentication();

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
    this.otpForm = this.formBuilder.group({
      otp1: ['', [Validators.required]],
      otp2: ['', [Validators.required]],
      otp3: ['', [Validators.required]],
      otp4: ['', [Validators.required]],
      otp5: ['', [Validators.required]],
      otp6: ['', [Validators.required]],
    });
  }

  isOTP2(event: any) {
    const ch = event.which ? event.which : event.keyCode;
    if (ch > 31 && (ch < 48 || ch > 57)) {
      return false;
    }
    return true;
  }

  isOTP(event: any) {
    const ch = event.which ? event.which : event.keyCode;
    if (ch > 31 && (ch < 48 || ch > 57)) {
      return false;
    }
    var nextInput = document.getElementById(event.target.id);
    if (nextInput) {
      nextInput.focus();
    }
    return true;
  }

  ngOnInit(): void {}

  cancel() {
    this.router.navigateByUrl('/restaurant');
  }
  otpValidate() {
    debugger;
    var otp: any;
    otp = this.otpForm.value;
    otp = '' + otp.otp1 + otp.otp2 + otp.otp3 + otp.otp4 + otp.otp5 + otp.otp6;
    var data = JSON.parse(sessionStorage.getItem('tbl_login') || '{}');
    this.otp_data = otp;
    this.verify_otp_data = data;
    this.verify_otp_data.otp = otp;
    if (this.otp_data) {
      var loginData: tbl_login = data;
      const queryParamvalue =
        this.activatedRoute.snapshot.queryParamMap.get('p');
      this.router.navigateByUrl('/Service');

      switch (queryParamvalue) {
        case '1': {
          debugger;
          var fg_company: tbl_company = JSON.parse(
            sessionStorage.getItem('fg_company') || '{}'
          );
          var fg_user: tbl_login = JSON.parse(
            sessionStorage.getItem('fg_user') ||'{}'
          );
           fg_user.otp =  this.otp_data;
          // var reg_data = {'tbl_company': fg_company, 'tbl_login': fg_user};
          var md: md_company_reg = new md_company_reg();
          md.tbl_company = fg_company;
          md.tbl_login = fg_user;
          console.warn('MD ::::::',JSON.stringify(md));
          this.loginService.otpValidate(md).subscribe(
            (res: any) => {
              var response = res;
              alert(JSON.stringify(res));
              if (response) {
                localStorage.setItem('ltn', JSON.stringify(response.token));
                alert(
                  'Your Registration is successfully and you are logged in'
                );
                this.router.navigateByUrl('/home');
              } else {
                alert('Internal Server Error Please try again..');
              }
            },
            (err: any) => {
              alert(JSON.stringify(err));
            }
          );
          // ; break;
        }
        // case '2': {
        //   this.loginService.otpValidate(this.otp_data, loginData).subscribe((res: any) => {
        //     var response = res;
        //     if (response) {
        //       localStorage.setItem("ltn", JSON.stringify(response.token))
        //       alert("Your Registration is successfully and you are logged in")
        //       this.router.navigateByUrl("/home")
        //     } else {
        //       alert("Internal Server Error Please try again..")
        //     }
        //   }); break;
        // }
        // case '3': {
        //   this.loginService.verify_otp(this.verify_otp_data).subscribe((res: response) => {
        //     var response: response = res;
        //     if (response.status == 'Success') {
        //       this.router.navigateByUrl("/reset-check-password")
        //     } else {
        //       alert("Internal Server Error Please try again..")
        //     }
        //   }); break;
        // }
        // default: {
        //   statements;
        //   this.loginService.otpValidate(this.otp_data, loginData).subscribe((res: any) => {
        //     var response = res;
        //     if (response) {
        //       localStorage.setItem("ltn", JSON.stringify(response.token))
        //       localStorage.setItem("curentUser", JSON.stringify(res));
        //       alert("Your Registration is successfully and you are loggedIn")
        //       this.router.navigate(['kot'])
        //     } else {
        //       alert("Internal Server Error Please try again..")
        //     }
        //   });
        //   break;
        // }
      }
    } else {
      alert('Please input valid OTP');
    }
  }

  // closePopup() {
  //   this.router.navigate(['', { outlets: { lgn: 'user-registration' } }])
  // }
}
