import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'src/app/helper/custom-validators';
import { response } from 'src/app/model/response';
import { tbl_login } from 'src/app/model/tbl-login';
import { LoginService } from 'src/app/helper/login.service';
import Swal from 'sweetalert2';
import { Base } from 'src/app/helper/base';
import { mst_states } from 'src/app/model/product-tracker';
import { tbl_company } from 'src/app/model/tbl-model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  response!: response;
  fg_company: FormGroup = new FormGroup({});
  fg_user: FormGroup = new FormGroup({});
  submitted = false;
  pattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  base: any;
  step: any = 1;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.base = Base;
    this.fg_company = formBuilder.group({
      // company_id:[''],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          Validators.minLength(10),
        ],
      ],
      email: [
        '',
        [
          Validators.required, 
          Validators.email,
          Validators.pattern(this.pattern),
          Validators.maxLength(100),
        ],
      ],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      // status:[''],
      // photo:[''],
      // create_by:[''],
      // update_by:['']
    });

    this.fg_user = formBuilder.group(
      {
        name: [''],
        mobile: [
          '',
          [
            Validators.required,
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
            Validators.minLength(10),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern(this.pattern),
            Validators.maxLength(100),
          ],
        ],
        address: [''],
        city: [''],
        state: [''],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
            ),
          ],
        ],
        otp: ['0'],
        // user_id: ['0'],
        // company_id: ['0'],
        // salt: [''],
        // role_id: ['0'],
        // status: ['0'],
        // default_language_id: [''],
        // photo:[''],
        // create_by: ['0'],
        // update_by: ['0'],
        source_app: ['web'],
      }
      // , {
      //   validator: CustomValidators('password', 'confirmPassword')
      // }
    );
  }
  ngOnInit(): void {}

  get onChanged() {
    return this.fg_company.controls;
  }
  onNextClick() {
    this.step = 2;
    var fg_company: tbl_company = this.fg_company.value;
    sessionStorage.setItem('fg_company', JSON.stringify(fg_company));
  }

  onGetOTPClick() {
    try {
      var fg_user: tbl_login = this.fg_user.value;
      sessionStorage.setItem('fg_user', JSON.stringify(fg_user));
      this.loginService.onGetOTPClick(fg_user).subscribe((res: response) => {
        alert(JSON.stringify(res));
        if (res.status == 'success') {
          // alert("Your One time Password is: " + this.response.data)
          this.router.navigate(['/otp'], { queryParams: { p: 1 } });
        } else {
          alert(res.message);
          // console.warn(res.message)
        }
      });
    } catch (error: any) {
      alert(error.message);
    }
  }
  isMobileNumber(event: any) {
    const ch = event.which ? event.which : event.keyCode;
    if (ch > 31 && (ch < 48 || ch > 57)) {
      return false;
    }
    return true;
  }
  navigate() {
    this.router.navigateByUrl('/login');
  }
  routerpage() {
    this.router.navigate(['', { outlets: { lgn: 'login' } }]);
  }
  check_login() {
    if (localStorage.getItem('ltn')) {
      this.router.navigateByUrl('Services');
    } else {
      Swal.fire({
        text: 'Not logged in? Go to login page.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK',
      }).then((ltn: { isConfirmed: boolean }) => {
        if (ltn.isConfirmed == true) {
        }
      });
      this.router.navigateByUrl('Services');
    }
  }
}
