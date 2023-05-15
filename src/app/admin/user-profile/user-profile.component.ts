import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { param } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { mst_states, tbl_login } from 'src/app/model/product-tracker';
import { Base } from 'src/app/helper/base';
import { BaseServiceService } from 'src/app/service/base-service.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  login_form: FormGroup;
  tbl_login: tbl_login = new tbl_login();
  mst_states: mst_states[] = [];
  mst_role: any;
  isDrawerOpen = false;
  @Output()
  base: any;
  filedata:any;
  password: any;
  UserDetail:any;
  submitted = false;
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, 
    private baseServiceService: BaseServiceService, private route: ActivatedRoute) {
    this.base = Base;
    this.UserDetail=JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.password = this.generatePassword();
    this.login_form = this.formBuilder.group({
      mobile: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.maxLength(10)]],
      email: [''],
      //  [Validators.required, Validators.pattern("^(((\\+91-?)|0)?[0-9]{10})$|^([a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4})$"), Validators.minLength(10)]],
      user_id:[0],
      employee_id: ['',[Validators.required]],
      name: ['',[Validators.required]],
      role_id: ['',[Validators.required]],
      photo: [''],
      address: [''],
      city: [''],
      state: [''],
      weldor_code:['',[Validators.required,]],
      file_ID_proof: this.filedata,
      password:[this.password,[Validators.required,]]
    })
  }
  generatePassword() {
    return Math.random().toString(36).slice(-8);
  }
  ngOnInit(): void {
    debugger
    let user_id = null
    this.route.queryParamMap.subscribe((params) => {
      user_id = params.get('user_id');
    });
    if (user_id == null)
      this.get_form_data();
    else this.get_user_profile_for_edit(user_id);
  }
  toggleNavDrawer(isDrawerOpen: boolean) {
    this.isDrawerOpen = isDrawerOpen;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }
  get formcontrols() {
    return this.login_form.controls;
  }
  get_user_profile_for_edit(user_id: any) {
    this.baseServiceService.get(`employee/form_data_get?entity_id=${user_id}`)
      .subscribe(
        (res: any) => {
          this.mst_role = res.data.roles;
          this.mst_states = res.data.states;
          this.tbl_login = res.data.entity_data[0];
          this.tbl_login.password=" ";
          this.login_form.patchValue(this.tbl_login);
          // this.login_form.controls.user_id.setValue(tbl_login.weldor_code);
        }, // success path
        error => {
          this.toastr.error('Something went wrong, please try again!', 'Error!');
        } // error path
      );
  }

  get_form_data() {
    this.baseServiceService.get('employee/form_data_get')
      .subscribe(
        (data: any) => {
          this.mst_states = data.data.states;
          this.mst_role = data.data.roles;
        },
        // (error) => { alert(JSON.stringify(error)) }
        error => {
          this.toastr.error('Something went wrong, please try again!', 'Error!');
        }
      );
  }
  onChange(files:any){
  this.filedata =files.target.files[0];
  // if (["image/jpeg", "image/png", "image/jpg"].indexOf(this.filedata.type) === -1) {
  //   this.toastr.error('please select JPG OR PNG image.', 'Error!');
  //   return;
  // }
  }
  on_submit() {
    // debugger;
    this.submitted = true
    if(this.login_form.valid == true){
     var formdata = new FormData();
     formdata.append("file",this.filedata);
     formdata.append("address",this.login_form.value.address);
     formdata.append("mobile",this.login_form.value.mobile);
     formdata.append("email",this.login_form.value.email);
     formdata.append("password",this.login_form.value.password);
     formdata.append("name",this.login_form.value.name);
     formdata.append("role_id",this.login_form.value.role_id);
     formdata.append("employee_id",this.login_form.value.employee_id);
     formdata.append("city",this.login_form.value.city);
     formdata.append("state",this.login_form.value.state);
     formdata.append("weldor_code",this.login_form.value.weldor_code);
     formdata.append("user_id",this.login_form.value.user_id);
      this.baseServiceService.post('employee', formdata)
      .subscribe(
        (data) => {
          if(this.tbl_login?.user_id)    
          {this.toastr.success('User added successfully!', 'Success!');this.login_form.reset();}
          
          else
          this.toastr.success('User details updated successfully!', 'Success!');

        },(error) => {throw error }
        // (error) => { this.toastr.error(JSON.stringify(error)) }
        // (error) => {
        //   this.toastr.error('Something went wrong, please try again!', 'Error!');
        // }
      );
   
    }else this.toastr.error('Fill the Right Information!','Error!');
  }

}

