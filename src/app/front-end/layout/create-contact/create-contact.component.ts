import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { ActivatedRoute } from '@angular/router';
import { tbl_login } from 'src/app/model/tbl-model';
import { Base } from 'src/app/helper/base';
import { BaseServiceService } from 'src/app/service/base-service.service';



@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {
isDrawerOpen = false;
drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
@Output()

UserDetail:any;
contact_form:FormGroup;
tbl_login: tbl_login = new tbl_login();
base:any;
constructor(private formBuilder: FormBuilder, private toastr: ToastrService,private baseServiceService: BaseServiceService, private route: ActivatedRoute) {
    this.base=Base;
    this.UserDetail=JSON.parse(localStorage.getItem('currentUser') || '{}')
    this.contact_form = this.formBuilder.group({
    mobile:['',[Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),Validators.minLength(10),],],
    name: ['',[Validators.required]],
    email: ['', [Validators.required,Validators.pattern(this.base.EmailValidator)]],
    address: [''],
    city: [''],
    state: [''],
    
   

  
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
  var formdata=this.contact_form.value
   this.tbl_login = formdata
   console.log(JSON.stringify(this.tbl_login) )
    this.baseServiceService.post('contact', this.tbl_login )
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
