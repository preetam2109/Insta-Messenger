import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { mst_portion_mould_ssc, mst_rail_grade, mst_rail_section, mst_welding_technique, tbl_product } from 'src/app/model/product-tracker';

import { Base } from 'src/app/helper/base';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';
import { BaseServiceService } from 'src/app/service/base-service.service';;
@Component({
  selector: 'app-rail-section-list',
  templateUrl: './rail-section-list.component.html',
  styleUrls: ['./rail-section-list.component.css']
})
export class RailSectionListComponent implements OnInit {
  isDrawerOpen = false;
  @Output()
  UserDetail:any;
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  base:any;
  mst_rail_section: mst_rail_section[] = [];
  public contentHeader: object | undefined;
  public rows: any;
  public selected = [];
  public basicSelectedOption: number = 50;
  public ColumnMode = ColumnMode;
  private tempData: any
  form_group:FormGroup;
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
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService,
     private baseServiceService: BaseServiceService, private router: Router) { 
      this.base=Base;
    this.UserDetail=JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.form_group = this.formBuilder.group({
     
      rail_section_id: [null],
      rail_section: [''],
      status:['']
     
    })
     }

  ngOnInit(): void {
    this.get_data();
  }
  get_data() {
    this.baseServiceService.get('rail_section')
      .subscribe(
        (res: any) => {
          if (res.status == 'success') {
            this.mst_rail_section = res.data.entity_data;
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
    let tbi_rail_section: mst_rail_section = new mst_rail_section();
   var temp = this.form_group.value;
   tbi_rail_section.rail_section=temp.rail_section;
   tbi_rail_section.rail_section_id=temp.rail_section_id == null? 0 : temp.rail_section_id;
    this.baseServiceService.post('rail_section',tbi_rail_section)
      .subscribe(
        (res: any) => {
          if (res.status == 'success') {
            this.toastr.success('Rail Section added successfully!', 'Success!');
            this.mst_rail_section = res.data.entity_data;
            this.mst_rail_section.push(tbi_rail_section);
            this.mst_rail_section = [...this.mst_rail_section];
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
      this.mst_rail_section
      this.form_group.controls['rail_section'].setValue(this.mst_rail_section[id].rail_section);
      this.form_group.controls['rail_section_id'].setValue(this.mst_rail_section[id].rail_section_id);
      this.form_group.controls['status'].setValue(1);
    } else this.toastr.error('Something went wrong, please try again!', 'Error!');
    return
  }
    

  delete_form_data(id: any) {
    var status:number=-1
    Swal.fire({
      text: 'Are you sure you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((res) => {
      if (res.isConfirmed == true) {
        this.baseServiceService.delete('rail_section?entity_id='+id.rail_section_id+'&status='+status)
        .subscribe(
          (res: any) => {
            if (res.status == 'success') {
            let index: number = this.mst_rail_section.findIndex((a: { rail_section_id: any; }) => a.rail_section_id == id.rail_section_id);
              if (index != -1) {
            this.mst_rail_section.splice(index, 1);
            this.mst_rail_section = [...this.mst_rail_section];
                      this.toastr.success(res.message, 'Success!');
                    }
              this.mst_rail_section;
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
    const temp = this.tempData.filter(function (d: { rail_section: any; }) {
      return d.rail_section.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.mst_rail_section = temp;
  }
  public openPDF():void  { this.baseServiceService.download_PDF(document.getElementById('htmlData'),'Welding_Technique_list.pdf');}

  toggleNavDrawer(isDrawerOpen: boolean) {
 
    this.isDrawerOpen = isDrawerOpen;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }
}
