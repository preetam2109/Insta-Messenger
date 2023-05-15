import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/helper/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { response } from 'src/app/model/response';
import { tbl_login } from 'src/app/model/tbl-login';
import { model_authentication } from 'src/app/model/model-authentication';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/filter';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {

    // this.activatedRoute.queryParams.subscribe(params => {
    //   console.log(params);
    // });
    console.log(this.activatedRoute.snapshot.queryParamMap.get('p'));
    const queryParamValue = Number(this.activatedRoute.snapshot.queryParamMap.get('p'));
    console.log(queryParamValue);


  }
  loginData: model_authentication = new model_authentication();
  resetPassword() {
    // //debugger
    this.submitted = true;
    var resetFormData = this.resetPasswordForm.value;
    this.loginData.email = resetFormData.email;
    this.loginData.otP_for = '3';
    const queryParamValue = Number(this.activatedRoute.snapshot.queryParamMap.get('p'));
    this.loginService.get_otp(this.loginData).subscribe((res: response) => {
      if (res.status == 'Success') {
      sessionStorage.setItem("tbl_login",JSON.stringify(this.loginData))
        alert('your OTP is:' + res.data)        //data:123456
        this.router.navigate(['/otp'], { queryParams: { p: queryParamValue } });
      } else {
        alert("Please Check userId and password")
      }
    });


  }

  get f() {
    return this.resetPasswordForm.controls;
  }

}
