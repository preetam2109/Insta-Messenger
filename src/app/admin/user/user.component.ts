import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { tbl_login } from 'src/app/model/product-tracker';
import { Base } from 'src/app/helper/base';
import { ColumnMode } from '@swimlane/ngx-datatable';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BaseServiceService } from 'src/app/service/base-service.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  tbl_login: tbl_login[] = [];
  table: any;
  res: any;
  error: any;
  navElement: HTMLElement | undefined;
  isDrawerOpen = false;
  @Output()
  base: any;
  UserDetail:any;
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  public contentHeader: object | undefined;
  public rows: any;
  public selected = [];
  public basicSelectedOption: number = 50;
  public ColumnMode = ColumnMode;
  private tempData: any
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private baseServiceService: BaseServiceService, private router: Router) {
    this.base = Base;
    this.UserDetail=JSON.parse(localStorage.getItem('currentUser') || '{}')
  }
  ngOnInit() {
    this.get_employee();
  }

  toggleNavDrawer(isDrawerOpen: boolean) {

    this.isDrawerOpen = isDrawerOpen;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }
  get_employee() {
    this.baseServiceService.get('employee')
      .subscribe(
        (res: any) => {

          this.tbl_login = res.data.entity_data;
          this.tempData = res.data.entity_data;
        }, // success path
        error => {
          this.toastr.error('Something went wrong, please try again!', 'Error!');
        } // error path
      );
  }
  filterUpdate(event: any) {
    const val = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d: { name: string; }) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.tbl_login = temp;
  }

  public openPDF():void  { this.baseServiceService.download_PDF(document.getElementById('htmlData'),'user list.pdf');}
  
  public edit_user(user_id:any)
  {
    this.router.navigate(
      ['/admin/user-profile'],
      { queryParams: { user_id: user_id } }
    );
  }
  
  delete_user(user_id: any) {
    var status: number = -1
    Swal.fire({
      text: 'Are you sure you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((res) => {
      if (res.isConfirmed == true) {
        this.baseServiceService.delete('employee?entity_id=' + user_id+ '&status=' + status)
          .subscribe(
            (res: any) => {
              if (res.status == 'success') {
                let index: number = this.tbl_login.findIndex(a=> a.user_id == user_id);

                if (index != -1) {
                  this.tbl_login.splice(index, 1);
                  this.tbl_login = [...this.tbl_login];
                  // this.tbl_login = res.data.entity_data;
                  this.toastr.success('User deleted successfully!', 'Success!');

                }
              }
              else this.toastr.error('Something went wrong, please try again!', 'Error!');
            }, error => {
              this.toastr.error('Something went wrong, please try again!', 'Error!');
            }
            // (error) => { alert(JSON.stringify(error)) }
          );
      }
    })
  }


  // delete_user(user_id:any) {
  //   // alert(user_id)
  //   // return
  //   // employee?entity_id=0&status=0
  //   this.baseServiceService.delete('employee?user_id='+user_id)
  //     .subscribe(
  //       (res:any) => {
  //         // if (res.status == 'success') {
  //         //   let index: number = this.tbl_login.findIndex((a: { rail_section_id: any; }) => a.rail_section_id == id.rail_section_id);
  //         //     if (index != -1) {
  //         //   this.tbl_login.splice(index, 1);
  //         //   this.tbl_login = [...this.tbl_login];
  //         //             this.toastr.success(res.message, 'Success!');
  //         //           }
  //         //   }
  //         //   else this.toastr.error('Something went wrong, please try again!', 'Error!');

  //         this.toastr.success('User deleted successfully!', 'Success!');
  //         this.tbl_login = res.data.entity_data;
  //       },
  //       error => {
  //         this.toastr.error('Something went wrong, please try again!', 'Error!');
  //       }
  //     );
  // }



}


