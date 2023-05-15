import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { mst_portion_mould_ssc, mst_welding_technique, tbl_product } from 'src/app/model/product-tracker';
import { Base } from 'src/app/helper/base';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';
import { BaseServiceService } from 'src/app/service/base-service.service';;
@Component({
  selector: 'app-welding-technique-list',
  templateUrl: './welding-technique-list.component.html',
  styleUrls: ['./welding-technique-list.component.css']
})
export class WeldingTechniqueListComponent implements OnInit {
  navElement: HTMLElement | undefined;
  isDrawerOpen: boolean = false;
  @Output()
  UserDetail: any;
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  base: any;
  mst_welding_technique: mst_welding_technique[] = [];
  public contentHeader: object | undefined;
  public rows: any;
  public selected = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 50;
  public ColumnMode = ColumnMode;
  public tempData: any
  table: any;
  config = {
    value: true,
    name: '',
    disabled: false,
    height: 33,
    width: 85,
    margin: 3,
    fontSize: 10,
    speed: 300,
    color: {
      checked: '#56C128',
      unchecked: '#dcdcdc',
    },
    switchColor: {
      checked: '#3366FF',
      unchecked: 'crimson',
    },
    labels: {
      unchecked: 'inactive',
      checked: 'Active',
    },
    checkedLabel: '',
    uncheckedLabel: '',
    fontColor: {
      checked: '#fafafa',
      unchecked: '#000',
    },
  };
  form_group: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private baseServiceService: BaseServiceService,
    private router: Router) {
    this.base = Base;
    this.UserDetail = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.form_group = this.formBuilder.group({
      welding_technique_id: [null],
      welding_technique: [''],
      status: 1

    })
  }

  ngOnInit(): void {
    this.get_data();
  }
  get_data() {
    this.baseServiceService.get('welding_technique')
      .subscribe(
        (res: any) => {
          if (res.status == 'success') {
            this.mst_welding_technique = res.data.entity_data;
            this.tempData = res.data.entity_data;
          }
          else this.toastr.error('Something went wrong, please try again!', 'Error!');
        },
        error => {
          this.toastr.error('Something went wrong, please try again!', 'Error!');
        }
      );
  }
  post_form_data() {
    //debugger
    let tbl_welding_technique: mst_welding_technique = new mst_welding_technique();
    var tem = this.form_group.value;
    tbl_welding_technique.welding_technique =tem.welding_technique;
    tbl_welding_technique.welding_technique_id = tem.welding_technique_id == null? 0 :tem.welding_technique_id;

    this.baseServiceService.post('welding_technique', tbl_welding_technique)
      .subscribe(
        (res: any) => {
          if (res.status == 'success') {
            this.toastr.success('Welding technique added successfully!', 'Success!');
            this.mst_welding_technique = res.data.entity_data;
            this.mst_welding_technique.push(tbl_welding_technique);
            this.mst_welding_technique = [...this.mst_welding_technique];
          }
          else this.toastr.error('Something went wrong, please try again!', 'Error!');
        },
        error => {
          this.toastr.error('Something went wrong, please try again!', 'Error!');
        }
      );
  }

  form_valid(id: any) {
    if (this.form_group.valid == true) {
      this.mst_welding_technique
      this.form_group.controls.welding_technique.setValue(this.mst_welding_technique[id].welding_technique);
      this.form_group.controls.welding_technique_id.setValue(this.mst_welding_technique[id].welding_technique_id);
      this.form_group.controls['status'].setValue(1);
    } else this.toastr.error('Something went wrong, please try again!', 'Error!');
    return
  }


  delete_form_data(id: any) {
    var status: number = -1
    Swal.fire({
      text: 'Are you sure you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((res) => {
      if (res.isConfirmed == true) {
        this.baseServiceService.delete('welding_technique?entity_id=' + id.welding_technique_id + '&status=' + status)
          .subscribe(
            (res: any) => {
              if (res.status == 'success') {
                let index: number = this.mst_welding_technique.findIndex((a: { welding_technique_id: any; }) => a.welding_technique_id == id.welding_technique_id);
                if (index != -1) {
                  this.mst_welding_technique.splice(index, 1);
                  this.mst_welding_technique = [...this.mst_welding_technique];
                  this.toastr.success(res.message, 'Success!');
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

  filterUpdate(event: any) {
    const val = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d: { welding_technique: string; }) {
      return d.welding_technique.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.mst_welding_technique = temp;
  }

  public openPDF():void  { this.baseServiceService.download_PDF(document.getElementById('htmlData'),'Welding_Technique_list.pdf');}
  
  toggleNavDrawer(isDrawerOpen: boolean) {
    this.isDrawerOpen = isDrawerOpen;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }
}
