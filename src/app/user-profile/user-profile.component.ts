import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GetRestaurantByIdService } from 'src/app/helper/get-restaurant-by-id.service';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { change_password_data, get_otp_profile } from 'src/app/model/kot-model.model';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'src/app/model/response';
import { LoginService } from 'src/app/helper/login.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { DELIVERYADDRService } from 'src/app/helper/delivery-addr.service';
import { Base } from '../helper/base';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  isDrawerOpen=false;
  @Output()
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  isButtonVisible = false;
  isButtonVisible$ = "SELECT DELIVERY ADDRESS";
  isDisabled = true;
  full_address: any;

  changePasswordForm: FormGroup;
  form_change_mobile: FormGroup;
  form_change_email: FormGroup;
  // vriable=true;
  submitted = false;
  display_verify_otp = 'none';
  is_edit_mobile = false;
  result: any;
  base: any;
  value: any;
  fileName = '';
  disableTextbox = false;
  otp_data!: number;
  regular_expression = ("^(((\\+91-?)|0)?[0-9]{10})$|^([a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4})$");
  regular_expression1 = ("^([0-9]{10})$");
  verify_otp_data: get_otp_profile = new get_otp_profile();
  loginData: change_password_data = new change_password_data();
  UserDetail:any;
  Add_Delivery_Address: FormGroup;
  states: any;
  address_type: any;
  constructor(private toastr: ToastrService,
    private _GetRestaurantByIdService: GetRestaurantByIdService,private _DELIVERYADDRService: DELIVERYADDRService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private  modalService: NgbModal) 
    {
    this.UserDetail=JSON.parse(localStorage.getItem('currentUser') || '{}')

    this.changePasswordForm = this.formBuilder.group({
      mobile_Number: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],

      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      Confirm_password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      // Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')
      otp1: ['', [Validators.required]],
      otp2: ['', [Validators.required]],
      otp3: ['', [Validators.required]],
      otp4: ['', [Validators.required]],
      otp5: ['', [Validators.required]],
      otp6: ['', [Validators.required]]
    })
    this.form_change_mobile= this.formBuilder.group({
      mobile_Number: ['', [Validators.required]]
    })
    this.form_change_email= this.formBuilder.group({
      email: ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    })

    this.Add_Delivery_Address = this.formBuilder.group({
      id: [null],
      mobile: ['', [Validators.required]],
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      street: ['', [Validators.required]],
      landmark: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: [''],
      address_type: ['', [Validators.required]],
      is_default_address: [true]
    });
  }

  ngOnInit(): void {
    this.base = Base;
    this.profile_get()   

  }

  get_states(){
    this._DELIVERYADDRService.address_form_data_get().subscribe((res: any) => {
      if (res.status === 'success') {
        this.states = res.data.states;}
      });
  }

  //   profile_data = new FormGroup({
  //     Mobile_Number:new FormControl("",[Validators.required]),
  //     Email:new FormControl("",[Validators.required])

  //  }); 
  open_mobile_modal(type:number,modalDefault_modal:any){
    this.modalService.open(modalDefault_modal,{
      centered: true
      });
if(type == 1) this.is_edit_mobile = true;

else this.is_edit_mobile = false
  }
  profile_get() {
    var temp = this.changePasswordForm.value;
    this._GetRestaurantByIdService.profile_get().subscribe((res: any) => {
      if (res.status === 'success') {
        this.result = res.data[0];
        // this.changePasswordForm.controls['mobile_Number'].setValue(this.result.mobile)
        // this.changePasswordForm.controls['email'].setValue(this.result.email)
      }
    });
  }
  get form_valid() {    return this.Add_Delivery_Address.controls;  }
  get f() {
    return this.changePasswordForm.controls;
  }

  change_password() {
    // //debugger;
    this.submitted = true;
    var changeFormData = this.changePasswordForm.value;
    this.loginData.email = this.result.mobile;
    // this.loginData.email = this.result.email;
    this.loginData.user_id = this.result.user_id;
    this.loginData.old_password = changeFormData.old_password;
    this.loginData.password = changeFormData.new_password;
    this.loginData.confirm_password = changeFormData.Confirm_password;

    this._GetRestaurantByIdService.change_password(this.loginData).subscribe((res: any) => {

      // console.warn(res)
      if (res.status === 'Success') {
        this.toastr.success(res.message, 'Success!');

        localStorage.removeItem('currentUser');
        localStorage.removeItem('tbl_order');
        localStorage.removeItem('tbl_order_items');
        localStorage.removeItem('newOrderNumber');
        localStorage.removeItem('ltn');
        this.router.navigateByUrl('login');

      }
      else {
        this.toastr.error(res.message, 'Error!');

      }
    });
  }

  fileChangeEvent(e: any) {
    var filedata = e.target.files[0];
    if (["image/jpeg", "image/png", "image/jpg"].indexOf(filedata.type) === -1) {
      this.toastr.error('please select JPG OR PNG image.', 'Error!');
      return;
    }
    if (filedata) {
      var file = new FormData();
      file.append("thumbnail", filedata);
      try {
        this._GetRestaurantByIdService.change_profile(file).subscribe((res: response) => {
          if (res.status === 'Success') {
            this.result.photo = res.data;
          }
        },
          (error) => { alert(JSON.stringify(error)) }
        );
      }
      catch (ex) {
        alert(ex)
      }
    }
  }
 
  onReset(): void {
    this.submitted = false;
    this.changePasswordForm.reset();

  }

  get_otp(modalDefault:any) {
    this.submitted = true;    
    

    //var changeFormData = this.form_change_email.value;

    if(!this.is_edit_mobile){
      if (this.form_change_email.invalid) {
        for (const control of Object.keys(this.form_change_email.controls)) {
          this.form_change_email.controls[control].markAsTouched();
        }
         return;
      }
      this.loginData.email=this.form_change_email.value.email;
      this.loginData.otP_for = '5';
    }else{
      if (this.form_change_mobile.invalid) {
        for (const control of Object.keys(this.form_change_mobile.controls)) {
          this.form_change_mobile.controls[control].markAsTouched();
        }
         return;
      }
      this.loginData.email=this.form_change_mobile.value.mobile_Number;
      this.loginData.otP_for = '4';
    }
    
// if(this.loginData.email==""){this.showModalBox =false ;return;}
    this._GetRestaurantByIdService.get_otp(this.loginData).subscribe((res: any) => {
      if (res.status === 'Success') {
        // this.showModalBox = true;
        sessionStorage.setItem("tbl_login", JSON.stringify(this.loginData))
        // //debugger
        // alert('your OTP is:' + res.data)        //data:123456
        this.modalService.open(modalDefault, { 
          centered: true 
        }); 
       
        // this.router.navigate(['/otp'], 
        // { queryParams: { p: queryParamValue } });
      } else {
        alert("Please Check userId and password")
      }
    },(error) => { alert(JSON.stringify(error)) }
    );

  // }
  }
  // isOTP2(event: any) {
  //   // //debugger
  //   console.warn(event.target.value)
  //   const ch = (event.which) ? event.which : event.keyCode;
  //   if (ch > 31 && (ch < 48 || ch > 57)) {
  //     return false;
  //   }
  //   return true;
  // }

  isOTP(previous_input:any, event: any,nextInput:any, input_position:any) {
  
 
  const ch = (event.which) ? event.which : event.keyCode;
  if (ch > 31 && (ch < 48 || ch > 57)) {
    return false;
  }
   if(event.target.value != ''){
    nextInput.focus();

   }
   else{
    previous_input.focus();

   }

    // console.warn(event.target.value)

   
    // // var nextInput = inputs.get(inputs.index(document.activeElement) + 1);

    // var nextInput = document.getElementById(event.target.id);
    // if (nextInput) {
    //   let input = event.target.id;
      
    //   let newID = input + nextInput;
    //   // document.getElementById(newID).focus();
    //   newID.focus();
    // }


    return true;
  }

  otpValidate(modalDefault:any) {
    var otp: any;
    otp = this.changePasswordForm.value;
    otp = '' + otp.otp1 + otp.otp2 + otp.otp3 + otp.otp4 + otp.otp5 + otp.otp6
    var data = JSON.parse(sessionStorage.getItem("tbl_login") || '{}');
    this.otp_data = otp;
    console.warn(this.otp_data);
    this.verify_otp_data = data;
    this.verify_otp_data.otp = otp;
    this.verify_otp_data.user_id = this.result.user_id;

    // this.verify_otp_data.email=this.result.mobile;
    // this.verify_otp_data.email=this.result.email;
    // this.verify_otp_data.otP_for = '4';
    // verify_otp
    this._GetRestaurantByIdService.verify_otp(this.verify_otp_data).subscribe((res: any) => {
      console.log("res:" + JSON.stringify(res.data));
      if (res.status === 'Success') {
      this.profile_get()
      this.modalService.dismissAll(modalDefault)
      
    // this.modalService.dismissAll(modalDefault {
    //   centered: true
    // });
        console.log("res:" + JSON.stringify(res.data));


        this.toastr.success(res.message, "success!");
      } else {
        this.toastr.error(res.message, "error!");
      }
    });


  }


  open_modal_create_edit_address(value: any) {
    // try {
    //   this._DELIVERYADDRService.address_form_data_get().subscribe((res: any) => {
    //     if (res.status === 'success') {
    //       this.states = res.data.states;
    //       if (value != null) {
    //         this.Add_Delivery_Address.controls['mobile'].setValue(value.mobile);
    //         this.Add_Delivery_Address.controls['name'].setValue(value.name);
    //         this.Add_Delivery_Address.controls['id'].setValue(value.id);
    //         this.Add_Delivery_Address.controls['address'].setValue(value.address);
    //         this.Add_Delivery_Address.controls['street'].setValue(value.street);
    //         this.Add_Delivery_Address.controls['landmark'].setValue(value.landmark);
    //         this.Add_Delivery_Address.controls['city'].setValue(value.city);
    //         this.Add_Delivery_Address.controls['state'].setValue(value.state);
    //         this.Add_Delivery_Address.controls['address_type'].setValue(value.address_type);
    //         this.Add_Delivery_Address.controls['is_default_address'].setValue(value.is_default_address);
    //       }
    //       else {
    //          value = this.login_currentUser = JSON.parse(localStorage.getItem("currentUser") || '{}');
    //         this.Add_Delivery_Address.controls['mobile'].setValue(value.mobile);
    //         this.Add_Delivery_Address.controls['name'].setValue(value.name);
    //        }
    //     }
      
    //     this.Add_Delivery_Address.controls['mobile'].updateValueAndValidity();
    //     this.Add_Delivery_Address.controls['name'].updateValueAndValidity();
    //     this.Add_Delivery_Address.controls['state'].updateValueAndValidity();
    //   });
     
    // } catch (ex: any) {
    //   alert(ex.message);
    // }
  }

  select_address_type(value$: any) {
    // 
    this.address_type = value$;
    this.Add_Delivery_Address.controls['address_type'].setValue(value$);
  }

  onSubmit_address() {
    // //debugger;
    // try {
    //   this.submitted = true;
    //   if (this.Add_Delivery_Address.valid) {
    //     // alert(JSON.stringify(this.Add_Delivery_Address.value));
    //     this.addressData = this.Add_Delivery_Address.value;
    //     var addressDataw = this.Add_Delivery_Address.value;
    //     this.addressData.is_default_address = addressDataw.is_default_address == true ? 1 : 0;

    //     this._DELIVERYADDRService.address_insert(this.addressData).subscribe((res: any) => {
    //       console.warn('status' + res.status)
    //       if (res.status === 'success') {
    //         this.delivery_address_get();
    //         // this.address_list = res.data.address_list;
    //         this.Add_Delivery_Address.reset();
    //         if (this.addressData.id == null) {
    //           this.toastr.success('Customer address successfully Saved.', 'Success!');
              

    //         } else {

    //           this.toastr.success('Customer address successfully updated.', 'Success!');
    //         }

    //       } else {
    //         // alert(JSON.stringify(res));
    //         this.toastr.error(res.message, 'Error!');
    //       }
    //     }, (error) => { alert(JSON.stringify(error)) }
    //     );

    //     //  this._FormGroup.reset();
    //   } else {
    //     // alert(JSON.stringify(this.Add_Delivery_Address.value));
    //     this.toastr.error('Insert Valid Details', 'Error!');
    //   }
    // } catch (ex: any) {
    //   alert(ex.message);
    // }
  }
  toggleNavDrawer(isDrawerOpen: boolean) {
    // //debugger;
    this.isDrawerOpen = isDrawerOpen;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }
}

