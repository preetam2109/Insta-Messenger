import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { ActivatedRoute } from '@angular/router';
import { tbl_login, tbl_sms_header } from 'src/app/model/tbl-model';
import { Base } from 'src/app/helper/base';
import { BaseServiceService } from 'src/app/service/base-service.service';


@Component({
  selector: 'app-sms-header-create',
  templateUrl: './sms-header-create.component.html',
  styleUrls: ['./sms-header-create.component.css']
})
export class SmsHeaderCreateComponent implements OnInit {
  isDrawerOpen = false;
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  
  UserDetail:any;
  contact_form:FormGroup;
  // tbl_login: tbl_login = new tbl_login();
  tbl_sms_header: tbl_sms_header[] = [];
  base:any;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService,private baseServiceService: BaseServiceService, private route: ActivatedRoute) {
      this.base=Base;
      this.UserDetail=JSON.parse(localStorage.getItem('currentUser') || '{}')
      this.contact_form = this.formBuilder.group({
      // mobile:['',[Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),Validators.minLength(10),],],
      header: ['',[Validators.required]],
      // email: ['', [Validators.required,Validators.pattern(this.base.EmailValidator)]],
      // address: [''],
      // city: [''],
      // state: [''],
      
     
  
    
    })
  }
  toggleNavDrawer(isDrawerOpen: boolean) {
  
    this.isDrawerOpen = isDrawerOpen;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }
  get formcontrols() {
    return this.contact_form.controls;
  }
  
  on_submit() {
      
  debugger;
    if(this.contact_form.valid == true){
this.tbl_sms_header=this.contact_form.value
    //  this.tbl_sms_header = formdata
     console.log(JSON.stringify(this.tbl_sms_header) )
      this.baseServiceService.post('sms_header', this.tbl_sms_header )
      .subscribe(
        (res:any) => {
          if(res.status=="success"){    
          this.toastr.success('Contact added successfully!', 'Success!');this.contact_form.reset();}        
          else
          this.toastr.success('User details updated successfully!', 'Success!');
  
  
  
        },(error) => {throw error }
     
      );
   
    }else this.toastr.error('Fill the Right Information!','Error!');
    
  
  }
  
    
  
    ngOnInit(): void {
    }
  
  }
  