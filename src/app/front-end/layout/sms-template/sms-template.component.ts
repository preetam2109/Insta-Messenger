import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Base } from 'src/app/helper/base';
import { tbl_login, tbl_sms_header, tbl_sms_template } from 'src/app/model/tbl-model';
import { BaseServiceService } from 'src/app/service/base-service.service';
import Swal from 'sweetalert2';
import { ColumnMode} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-sms-template',
  templateUrl: './sms-template.component.html',
  styleUrls: ['./sms-template.component.css']
})
export class SmsTemplateComponent implements OnInit {
  
  tbl_sms_template: tbl_sms_template[] = [];
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
    this.getData();
   
  }
  
  
  getData(){
    this.baseServiceService.get('sms_template').subscribe( (res: any) => {
        console.log(JSON.stringify(res))
        this.tbl_sms_template = res.data.entity_data;
        this.tempData = res.data.entity_data;
  
      },
      error => {
        alert(JSON.stringify(error))
      } 
    );
  }
  
  
  onDelete(id: any) {
    
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
        this.baseServiceService.delete('sms_template?id='+ id+ '&status=' + status)
  
          .subscribe(
            (res: any) => {
              if (res.status == 'success') {
                let index: number = this.tbl_sms_template.findIndex(a=> a.id ==id);
  
                if (index != -1) {
                  this.tbl_sms_template.splice(index, 1);
                  this.tbl_sms_template = [...this.tbl_sms_template];
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
    this.tbl_sms_template = temp;
  }
  public openPDF():void  { this.baseServiceService.download_PDF(document.getElementById('htmlData'),'user contactlist.pdf');}
  
  toggleNavDrawer(isDrawerOpen: boolean) {
  
    this.isDrawerOpen = isDrawerOpen;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }
  
  }
  