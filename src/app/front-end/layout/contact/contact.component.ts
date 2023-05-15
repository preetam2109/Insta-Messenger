import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ColumnMode} from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Base } from 'src/app/helper/base';
import { tbl_login } from 'src/app/model/tbl-model';
import { BaseServiceService } from 'src/app/service/base-service.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
tbl_login: tbl_login[] = [];
private tempData: any
public ColumnMode = ColumnMode;
public basicSelectedOption: number = 50;
UserDetail:any;
drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
@Output()
isDrawerOpen = false;
base:any;
constructor(private toastr: ToastrService,private baseServiceService: BaseServiceService) {
 this.base=Base;
 this.UserDetail=JSON.parse(localStorage.getItem('currentUser') || '{}')

 }

ngOnInit(): void {
  this.get_contact();
 
}


get_contact(){
  debugger
  this.baseServiceService.get('contact').subscribe( (res: any) => {
      console.log(JSON.stringify(res))
      this.tbl_login = res.data.entity_data;
      this.tempData = res.data.entity_data;

    },
    error => {
      // alert(JSON.stringify(error))
    } 
  );
}


delete_contact(mobile: any) {
  
  debugger
  var status: number = -1
  Swal.fire({
    text: 'Are you sure you want to delete?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }).then((res) => {
    if (res.isConfirmed == true) {
      this.baseServiceService.delete('contact?mobile='+ mobile+ '&status=' + status)

        .subscribe(
          (res: any) => {
            if (res.status == 'success') {
              let index: number = this.tbl_login.findIndex(a=> a.mobile ==mobile);

              if (index != -1) {
                this.tbl_login.splice(index, 1);
                this.tbl_login = [...this.tbl_login];
                this.toastr.success('Contact deleted successfully!', 'Success!');


              }
            }else this.toastr.error('Something went wrong, please try again!', 'Error!');

          },error => {
            this.toastr.error('Something went wrong, please try again!', 'Error!');
          }
        );
    }
  })
}
filterUpdate(event: any) {
  const val = event.target.value.toLowerCase();
  const temp = this.tempData.filter(function (d: { name: string; }) {
    return d.name.toLowerCase().indexOf(val) !== -1 || !val;
  });
  this.tbl_login = temp;
}
public openPDF():void  { this.baseServiceService.download_PDF(document.getElementById('htmlData'),'user contactlist.pdf');}

toggleNavDrawer(isDrawerOpen: boolean) {

  this.isDrawerOpen = isDrawerOpen;
  this.drawerToggleEmitter.emit(this.isDrawerOpen);
}

}
