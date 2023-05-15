import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/helper/login.service';
import { model_authentication } from 'src/app/model/model-authentication';
import { response } from 'src/app/model/response';
import { tbl_login, tbl_varifyied_response } from 'src/app/model/tbl-login';

@Component({
  selector: 'app-reset-check-password',
  templateUrl: './reset-check-password.component.html',
  styleUrls: ['./reset-check-password.component.css']
})
export class ResetCheckPasswordComponent implements OnInit {

  checkPasswordForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.checkPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required ]],
      confirm_password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
this.loginData=JSON.parse(sessionStorage.getItem("tbl_login") || '{}');

  }
  loginData: model_authentication = new model_authentication();
  checkPassword() {
    //debugger
    this.submitted = true;
    var resetFormData = this.checkPasswordForm.value;
    // this.loginData = resetFormData;
    this.loginData.password = resetFormData.password;
    this.loginData.confirm_password = resetFormData.confirm_password;
    this.loginService.reset_password(this.loginData).subscribe((res: tbl_varifyied_response) => {
      if (res.status == 'Success') {
        alert('Your Paasword Is successfully Changed')        //data:123456
        this.router.navigate(['/login']);

        // this.closePopup();
      } else {
        alert("Internal Server Error!")
      }
    });


  }

  get f() {
    return this.checkPasswordForm.controls;
  }

}
