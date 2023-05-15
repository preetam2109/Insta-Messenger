import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Base } from 'src/app/helper/base';
import { md_api_key, tbl_md_send_sms, tbl_md_send_whatsapp, tbl_sms_template } from 'src/app/model/tbl-model';
import { BaseServiceService } from 'src/app/service/base-service.service';

@Component({
  selector: 'app-whatsapp-send',
  templateUrl: './whatsapp-send.component.html',
  styleUrls: ['./whatsapp-send.component.css']
})
export class WhatsappSendComponent implements OnInit {
  tbl_md_send_whatsapp: tbl_md_send_whatsapp = new tbl_md_send_whatsapp();
  md_api_key = {} as md_api_key;
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  isDrawerOpen = false;
  base: any;
  type = 2;
  file_id:any;
  files:any;
  formgroup: FormGroup;
  send_to: any
  header_value: any;
  submitted = false;
  template_filter_data: any;
  error_msg!:string;
  files_data:any;
  message_type_id:any;
  constructor(
    private toastr: ToastrService,
    private baseServiceService: BaseServiceService,
    private formBuilder: FormBuilder) {
    this.base = Base;
    this.formgroup = this.formBuilder.group({
      type: [2],
      send_to: ['', [Validators.required]],
      mobile_nos: [''],
      message_type: ['', [Validators.required]],
      message: [''],
      files: [''],
    });
  }
  validation_reset() {
    this.formgroup.get('send_to')?.valueChanges
      .subscribe((send_to: any) => {
        switch (send_to) {
          case '1':
            this.formgroup.get('mobile_nos')?.setValidators([Validators.required]);
            break;
          case '2':
            this.formgroup.get('mobile_nos')?.clearValidators();
            break;
          case '3':
            this.formgroup.get('mobile_nos')?.setValidators([Validators.required]);
            break;
        }
        this.formgroup.get('mobile_nos')?.updateValueAndValidity();
      });
      this.formgroup.get('message_type')?.valueChanges
      .subscribe((message_type: any) => {
        switch (message_type) {
          case '1':
            this.formgroup.get('files')?.clearValidators();
            this.formgroup.get('message')?.setValidators([Validators.required]);
          break;
          case '2':
            this.formgroup.get('files')?.setValidators([Validators.required]);
            this.formgroup.get('message')?.clearValidators();
          break;
          case '3':
            this.formgroup.get('files')?.setValidators([Validators.required]);
            this.formgroup.get('message')?.clearValidators();
          break;
        }      
        this.formgroup.get('message')?.updateValueAndValidity();
        this.formgroup.get('files')?.updateValueAndValidity();
    })
  }

  ngOnInit(): void {  }
  get form_valid() { return this.formgroup.controls; } 
  onChange_message_type(event: any) {
    this.message_type_id = event.target.value;
  }

  onChange_sendid(event: any) {
    this.send_to = event.target.value;
  }
  url:any;
  format:any;

  onSelectFile(event:any) {
    // var files_data = event.target.files[0];
    // alert(JSON.stringify(files_data));
   this.files_data = event.target.files && event.target.files[0];
    if (this.files_data) {
      if (["image/png", "image/jpeg","application/pdf","video"].indexOf(this.files_data.type) === -1) {
        this.error_msg = 'You can upload only JPG, PNG , PDF file,or video.'}
        if (event.target.files.length > 0) { this.error_msg = ' ' }
    this.files = event.target.files[0].name;
      // var reader = new FileReader();
      // reader.readAsDataURL(files_data);
      // if(files_data.type.indexOf('image')> -1){
      //   this.format = 'image';
      // } else if(files_data.type.indexOf('video')> -1){
      //   this.format = 'video';
      // }
      // reader.onload = (event) => {
      //   this.url = (<FileReader>event.target).result;
      //   alert(this.url);
      // }
    }
  }


  on_submit() {
    try {
      debugger
      this.submitted = true;
      if (this.formgroup.valid == true) {
        var formdataa = this.formgroup.value;
        
        console.log(JSON.stringify(formdataa))
      
        var formdata = new FormData();
       
        switch (this.formgroup.value.send_to) {
          case '1':
            formdata.append("files", this.files_data);
            formdata.append("type", this.formgroup.value.type);
            formdata.append("send_to", this.formgroup.value.send_to);
            formdata.append("mobile_nos", this.formgroup.value.mobile_nos);
            formdata.append("message_type", this.formgroup.value.message_type);
            formdata.append("message", this.formgroup.value.message);
            break;
          case '2':
            formdata.append("files", this.files_data);
            formdata.append("type", this.formgroup.value.type);
            formdata.append("send_to", this.formgroup.value.send_to);
            // formdata.append("mobile_nos", this.formgroup.value.mobile_nos);
            formdata.append("message_type", this.formgroup.value.message_type);
            formdata.append("message", this.formgroup.value.message);
            break;
          case '3':
            formdata.append("files", this.files_data);
            formdata.append("type", this.formgroup.value.type);
            formdata.append("send_to", this.formgroup.value.send_to);
            // formdata.append("mobile_nos", this.formgroup.value.mobile_nos);
            formdata.append("message_type", this.formgroup.value.message_type);
            formdata.append("message", this.formgroup.value.message);
            break;
        }

        console.log(JSON.stringify(formdata))
        this.baseServiceService.post('messager/send_whatsapp',formdata)
          .subscribe(
            (res: any) => {
              if (res.status == "success") {
                this.toastr.success(res.message, 'Success!');
                this.formgroup.reset();
              }
              else
                this.toastr.error(res.message, 'Error!');
            }, (error) => {
              alert(JSON.stringify(error))
              // throw error
            }
          );
      } else this.toastr.error('Fill the Right Information!', 'Error!');
    } catch (ex: any) {
      alert(ex.message)
      // throw ex
    }
  }

  toggleNavDrawer(isDrawerOpen: boolean) {
    this.isDrawerOpen = isDrawerOpen;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }

}
 