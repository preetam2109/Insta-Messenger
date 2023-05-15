import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/helper/login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { model_authentication } from 'src/app/model/model-authentication';
import { response } from 'src/app/model/response';
import { tbl_varifyied_response } from 'src/app/model/tbl-login';
import { BehaviorSubject, throwError } from 'rxjs';
import { Base } from 'src/app/helper/base';
import { ToastrService } from 'ngx-toastr';
import { tbl_login } from 'src/app/model/tbl-model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  base: any;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService,
    private http: HttpClient, private router: Router,private toastr: ToastrService,) {
    this.base = Base;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^(((\\+91-?)|0)?[0-9]{10})$|^([a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4})$"), Validators.minLength(10)]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    // throw new Error("error kilesh");

    var User: tbl_varifyied_response = JSON.parse(localStorage.getItem('currentUser') || '{}')
  }

  get formControl() {
    return this.loginForm.controls;
  }
  loginData: model_authentication = new model_authentication();
  // loginData:tbl_login=new tbl_login();
  loginSubmit() {
    try{
      debugger
      this.submitted = true;
      this.loginData = this.loginForm.value;
      if (this.loginForm.valid == true) {
        this.loginService.login(this.loginData).subscribe((res: any) => {
            if (res.status == "success") {
            localStorage.setItem("ltn", JSON.stringify(res.token));
            localStorage.setItem("currentUser", JSON.stringify(res));
            switch (res.role) {
              case 'Super Admin': {
                this.router.navigate(['/home']);
                break;
              }
              case 'Admin': {
                this.router.navigate(['/home']);
                break;
              }
            }
          } 
          else 
          this.toastr.error("Something went wrong. Please try again!",'Error');
        } ,
          (err: Error) => {
          this.toastr.error("Please Check userId and password!",'Error');
         }
       );
      } else this.toastr.error('Invalid data!', 'Error!');
    }
    catch(err:any){
      throw err;
    }
    
  }
  // closePopup() {
  //   this.router.navigate(['', { outlets: { lgn: null } }])
  // }
//   ,
//   (err: Error) => {
//    debugger
//    throw err;
//    alert(err.message)
//  }
}

