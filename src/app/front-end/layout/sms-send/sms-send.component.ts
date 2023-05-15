import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Base } from 'src/app/helper/base';
import { md_api_key, tbl_api, tbl_api_key, tbl_md_send_sms, tbl_sms_template} from 'src/app/model/tbl-model';
import { BaseServiceService } from 'src/app/service/base-service.service';
import Swal from 'sweetalert2';
import { ColumnMode} from '@swimlane/ngx-datatable';
import {FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-sms-send',
  templateUrl: './sms-send.component.html',
  styleUrls: ['./sms-send.component.css']
})
export class SmsSendComponent implements OnInit {

  tbl_md_send_sms:tbl_md_send_sms =new tbl_md_send_sms()
  md_api_key={} as md_api_key;
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  isDrawerOpen = false;
  base:any;
  type=1;
  header_list:any;
  template_item_list:tbl_sms_template[]=[];
  data:any;
  template_data:any;
  formgroup: FormGroup;
  send_to:any
  header_value:any;
  submitted=false;
  template_filter_data:any;
  constructor(
    private toastr: ToastrService,
    private baseServiceService: BaseServiceService,
    private formBuilder: FormBuilder) {
      this.base = Base;
      this.formgroup = this.formBuilder.group({
        type: [1],
        send_to:['',[Validators.required]], 
        mobile_nos: ['',[Validators.required]],
        header_id: ['',[Validators.required]],
        template_id:['',[Validators.required]],
        message: ['',[Validators.required]],
       
    
      
      });
    }
    validation_reset(){  
      this.formgroup.get('send_to')?.valueChanges
        .subscribe((send_to:any) => {
          switch(send_to) {
            case '1':
              this.formgroup.get('send_to')?.setValidators([Validators.required]);
              this.formgroup.get('mobile_nos')?.setValidators([Validators.required]);
              this.formgroup.get('header_id')?.setValidators([Validators.required]);             
              this.formgroup.get('message')?.setValidators([Validators.required]);
                break;
              case '2':
                this.formgroup.get('send_to')?.setValidators([Validators.required]);
                this.formgroup.get('mobile_nos')?.clearValidators();
                this.formgroup.get('header_id')?.setValidators([Validators.required]);             
                this.formgroup.get('message')?.setValidators([Validators.required]);
                 break;
                case '3':
                  this.formgroup.get('send_to')?.setValidators([Validators.required]);
                  this.formgroup.get('mobile_nos')?.clearValidators();
                  this.formgroup.get('header_id')?.setValidators([Validators.required]);             
                  this.formgroup.get('message')?.setValidators([Validators.required]);
                  break;
          }
          this.formgroup.get('send_to')?.updateValueAndValidity();
          this.formgroup.get('mobile_nos')?.updateValueAndValidity();
          this.formgroup.get('header_id')?.updateValueAndValidity();             
          this.formgroup.get('message')?.updateValueAndValidity(); 
        });
      }

  ngOnInit(): void {
   this.validation_reset();
   this.get_data();
  }
  get form_valid() {    return this.formgroup.controls;  }
  get_data(){
    this.baseServiceService.get('messager?type=1').subscribe( (res: any) => {
      if(res.status=="success"){   
      this.header_list=res.data.header_list;
      this.template_data=res.data.template_list;
      // alert(JSON.stringify(res))
      } else
      this.toastr.error(res.message, 'Error!');
      },
      error => {
        // alert(JSON.stringify(error))
        throw error;
      } 
    );
  }
  
  onHeaderID_Change(event:any){
    this.header_value = event.target.value;
   this.template_filter_data =   this.template_data.filter(
      (template: any) => template.header_id == this.header_value
      );
  }
  onChange_template(event:any){
   
    const value = event.target['options']
    [event.target['options'].selectedIndex].text;
   this.formgroup.get('message')?.setValue(value);
  }
  onChange_sendid(event:any){
    this.send_to = event.target.value;
  }
  on_submit() {
    try {
      this.submitted = true;
      if (this.formgroup.valid == true) {
        var formdata = this.formgroup.value;
        switch (formdata.send_to) {
          case '1':
            this.tbl_md_send_sms.type = formdata.type;
            this.tbl_md_send_sms.send_to = formdata.send_to;
            this.tbl_md_send_sms.mobile_nos = formdata.mobile_nos;
            this.tbl_md_send_sms.header_id = formdata.header_id;
            this.tbl_md_send_sms.template_id = formdata.template_id;
            this.tbl_md_send_sms.message = formdata.message;
            break;
          case '2':
            this.tbl_md_send_sms = formdata
            break;
          case '3':
            this.tbl_md_send_sms = formdata
            break;
        }
        // this.tbl_md_send_sms=formdata

        // console.log(JSON.stringify(this.tbl_md_send_sms))
        this.baseServiceService.post('messager/send_sms', this.tbl_md_send_sms)
          .subscribe(
            (res: any) => {
              if (res.status == "success") {
                this.toastr.success(res.message, 'Success!');
                this.formgroup.reset();
              }
              else
                this.toastr.error(res.message, 'Error!');
            }, (error) => {
              // alert(JSON.stringify(error))
              throw error
            }
          );
      } else this.toastr.error('Fill the Right Information!', 'Error!');
    } catch (ex: any) {
      // alert(ex.message)
      throw ex
    }
  }

  toggleNavDrawer(isDrawerOpen: boolean) {
    this.isDrawerOpen = isDrawerOpen;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }
  
  }
  