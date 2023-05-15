import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { ActivatedRoute } from '@angular/router';
import { tbl_login, tbl_sms_header, tbl_sms_template } from 'src/app/model/tbl-model';
import { Base } from 'src/app/helper/base';
import { BaseServiceService } from 'src/app/service/base-service.service';


@Component({
  selector: 'app-sms-template-create',
  templateUrl: './sms-template-create.component.html',
  styleUrls: ['./sms-template-create.component.css']
})
export class SmsTemplateCreateComponent implements OnInit {

  isDrawerOpen = false;
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  
  UserDetail:any;
  contact_form:FormGroup;
  // tbl_login: tbl_login = new tbl_login();
  tbl_sms_template: tbl_sms_template[] = [];
  base:any;
  header_list:any;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService,private baseServiceService: BaseServiceService, private route: ActivatedRoute) {
      this.base=Base;
      this.UserDetail=JSON.parse(localStorage.getItem('currentUser') || '{}')
      this.contact_form = this.formBuilder.group({
      // mobile:['',[Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),Validators.minLength(10),],],
      header_id: [''],
      // email: ['', [Validators.required,Validators.pattern(this.base.EmailValidator)]],
      template: [''],
      template_id: [''],
      id: [null],
      
     
  
    
    })
  }
  ngOnInit(): void {
    this.getData();
  }
  toggleNavDrawer(isDrawerOpen: boolean) {
  
    this.isDrawerOpen = isDrawerOpen;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }
  get formcontrols() {
    return this.contact_form.controls;
  }
  
  getData(){
    this.baseServiceService.get('sms_template/form_data_get').subscribe( (res: any) => {
        console.log(JSON.stringify(res))
        this.header_list = res.data.header_list;
        // this.tempData = res.data.entity_data;
  
      },
      error => {
        alert(JSON.stringify(error))
      } 
    );
  }

  on_submit() {
      
  debugger;
    if(this.contact_form.valid == true){
this.tbl_sms_template=this.contact_form.value
    //  this.tbl_sms_header = formdata
     console.log(JSON.stringify(this.tbl_sms_template) )
      this.baseServiceService.post('sms_template', this.tbl_sms_template )
      .subscribe(
        (res:any) => {
          if(res.status=="success"){    
          this.toastr.success(res.message, 'Success!');this.contact_form.reset();}        
          else
          this.toastr.success('Template details updated successfully!', 'Success!');
  
  
  
        },(error) => {
        alert(JSON.stringify(error))

          // throw error 
        }
     
      );
   
    }else this.toastr.error('Fill the Right Information!','Error!');
    
  
  }
  
    
  
   
  
  }
  
