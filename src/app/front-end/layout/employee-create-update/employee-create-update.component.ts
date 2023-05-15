import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { mst_states} from 'src/app/model/product-tracker';
import { Base } from 'src/app/helper/base';
import { ColumnMode } from '@swimlane/ngx-datatable';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { tbl_login } from 'src/app/model/tbl-model';

@Component({
  selector: 'app-employee-create-update',
  templateUrl: './employee-create-update.component.html',
  styleUrls: ['./employee-create-update.component.css']
})
export class EmployeeCreateUpdateComponent implements OnInit {
  login_form: FormGroup;
  tbl_login: tbl_login = new tbl_login();
  mst_states: mst_states[] = [];
  mst_role: any;
  tbl_roles:any
  isDrawerOpen = false;
  @Output()
  base: any;
  filedata:any;
  password: any;
  UserDetail:any;
  submitted = false;
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  pattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, 
    private baseServiceService: BaseServiceService, private route: ActivatedRoute) {
    this.base = Base;

    this.UserDetail=JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.password = this.generatePassword();
    this.login_form = this.formBuilder.group({
      name: ['',[Validators.required]],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(this.base.MobileValidator)]],
      email: ['',Validators.pattern(this.pattern)],
      city: [''],
      state: [''],
      role_id: ['',[Validators.required]],
      status:[''],
      user_id:[''],
      photo: [''],
      address: [''],
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
    debugger
    this.baseServiceService.get(`employee/form_data_get?entity_id=${user_id}`)
    
      .subscribe(
        (res: any) => {
          this.mst_role = res.data.roles;
          this.mst_states = res.data.states;
          this.tbl_login = res.data.entity_data[0];
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
    debugger;
    this.submitted = true
    if(this.login_form.valid == true){
     var formdata = new FormData();
     formdata.append("name",this.login_form.value.name);
     formdata.append("email",this.login_form.value.email);
     formdata.append("mobile",this.login_form.value.mobile);
     formdata.append("role_id",this.login_form.value.role_id);
     formdata.append("city",this.login_form.value.city);
     formdata.append("state",this.login_form.value.state);
     formdata.append("user_id",this.login_form.value.user_id);
      this.baseServiceService.post('employee', formdata)
      .subscribe(
        (data:any) => {
          if(this.tbl_login?.user_id){
            this.toastr.success(data.message, 'Success!');
            this.login_form.reset();
          }
          
          else
          this.toastr.success(data.message, 'Success!');

        },(error) => {throw error }
        // (error) => { this.toastr.error(JSON.stringify(error)) }
        // (error) => {
        //   this.toastr.error('Something went wrong, please try again!', 'Error!');
        // }
      );
   
    }else this.toastr.error('Please enter valid details','Error!');
  }

}

