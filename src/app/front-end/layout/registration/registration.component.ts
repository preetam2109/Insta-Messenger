import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'src/app/helper/custom-validators';
import { response } from 'src/app/model/response';
import { tbl_login } from 'src/app/model/tbl-login';
import { LoginService } from 'src/app/helper/login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  response!:response
  userRegisterForm: FormGroup=new FormGroup({})
  submitted=false;
  pattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  

  constructor(private loginService: LoginService, private router: Router, private activatedRoute:ActivatedRoute,
    private formBuilder: FormBuilder) {
    
      this.userRegisterForm = formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(10)]],
        email: ['', [Validators.email, Validators.pattern(this.pattern), Validators.maxLength(100)]],
        mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
        confirmPassword: ['', [Validators.required]],
       
    // id : [0],
    // user_id : [0],
    // restaurant_id : [0],
    // salt : [''],
    // role_id : [0],
    // status : [0],
    // create_date : ['11-jan-2022'],
    // default_language_id :[1],
    // logged_in_time :['11-jan-2022'],
    // logged_out_time :['11-jan-2022']
        // validator: CustomValidators('password', 'confirmpassword')
      }, { 
        validator: CustomValidators('password', 'confirmPassword')
      })


  }
  ngOnInit(): void { 
    
  }

  get f(){
    return this.userRegisterForm.controls;
  }


  cancel() {

    this.router.navigateByUrl('/restaurant');

  }

  userRegistration() {
    // //debugger;
    const queryParamValue:number = Number(this.activatedRoute.snapshot.queryParamMap.get('p'))
    this.submitted=true;
    var customerData: tbl_login;
    console.log(JSON.stringify(this.userRegisterForm.value))
    if (this.userRegisterForm.valid) {
      var dCp = delete this.userRegisterForm.value['confirmPassword'];
      customerData = this.userRegisterForm.value;
      // alert(JSON.stringify(customerData))
      customerData.default_language_id = 1;
      sessionStorage.setItem("tbl_login",JSON.stringify(customerData))
      this.loginService.userRegistration(customerData).subscribe((res: response) => {
     this.response = res;
      if(res.status == 'Success'){
        // alert("Entr Ok For Confirm")
        alert("Your One time Password is: "+this.response.data)
    // this.router.navigate(['',  { outlets: { lgn: 'otp' } }]);
    this.router.navigate(['/otp'], { queryParams: { p: queryParamValue } });

  }else{
        alert("Something went wrong internal server Error! Try again..")
      }
      })
    } else {
      alert("Please fill The right information")
    }

  }

  isMobileNumber(event:any) {
    const ch = (event.which) ? event.which : event.keyCode;
    if (ch > 31 && (ch < 48 || ch > 57)) {
        return false;
    }
    return true;
}

navigate(){
  this.router.navigateByUrl('/login')
}
routerpage(){
  this.router.navigate(['', { outlets: { lgn: 'login' } }])
}



}
// function ConfirmedValidator(arg0: string, arg1: string): any {
//   throw new Error('Function not implemented.');
// }

