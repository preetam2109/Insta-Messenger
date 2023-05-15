import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { mst_rail_grade, tbl_product } from 'src/app/model/product-tracker';
import { BaseServiceService } from 'src/app/service/base-service.service';;
import { Base } from 'src/app/helper/base';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-rail-grade-list',
  templateUrl: './rail-grade-list.component.html',
  styleUrls: ['./rail-grade-list.component.css']
})
export class RailGradeListComponent implements OnInit {
  isDrawerOpen!: boolean;
  @Output()
  UserDetail:any;
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  base:any;
  mst_rail_grade: mst_rail_grade[] = [];
  form_group:FormGroup;
  public contentHeader: object | undefined;
  public rows: any;
  public selected = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 50;
  public ColumnMode = ColumnMode;
  private tempData: any
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
  mst_rail_gradefilter: any;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private baseServiceService: BaseServiceService, private router: Router) { 
    this.UserDetail=JSON.parse(localStorage.getItem('currentUser') || '{}');

    this.form_group = this.formBuilder.group({
      rail_grade_id: [null],
      rail_grade: [''],
      status:['']
     
    })
  }

  ngOnInit(): void {
    this.isDrawerOpen = false;
    this.base=Base;
    this.get_form_data();
  }
  get_form_data() {
    this.baseServiceService.get('rail_grade')
      .subscribe(
        (res: any) => {
          if (res.status == 'success') {
            this.mst_rail_grade = res.data.entity_data;
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
    let tbl_rail_grade: mst_rail_grade =new mst_rail_grade();
    var temp = this.form_group.value;
    var form_group_data=this.form_group.value;
     tbl_rail_grade.rail_grade=form_group_data.rail_grade;
     tbl_rail_grade.rail_grade_id=temp.rail_grade_id == null? 0:temp.rail_grade_id;
    this.baseServiceService.post('rail_grade',tbl_rail_grade)
      .subscribe(
        (res: any) => {
          if (res.status == 'success') {
            this.toastr.success('Rail Grade added successfully!', 'Success!');
            
            this.mst_rail_grade = res.data.entity_data;
            this.mst_rail_grade.push(tbl_rail_grade);
            this.mst_rail_grade = [...this.mst_rail_grade];
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
      this.mst_rail_grade
      this.form_group.controls['rail_grade'].setValue(this.mst_rail_grade[id].rail_grade);
      this.form_group.controls['rail_grade_id'].setValue(this.mst_rail_grade[id].rail_grade_id);
      this.form_group.controls['status'].setValue(1);
    } else this.toastr.error('Something went wrong, please try again!', 'Error!');
    return
  }
    

  delete_form_data(id: any) {
    var status:number=-1
    Swal.fire({
      text: 'Are you sure you want to delete ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((res) => {
      if (res.isConfirmed == true) {
        this.baseServiceService.delete('rail_grade?entity_id='+id.rail_grade_id+'&status='+status)
        .subscribe(
          (res: any) => {
            if (res.status == 'success') {
            let index: number = this.mst_rail_grade.findIndex((a: {rail_grade_id : any; }) => a.rail_grade_id == id.rail_grade_id);
              if (index != -1) {
            this.mst_rail_grade.splice(index, 1);
            this.mst_rail_grade = [...this.mst_rail_grade];
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
    const temp = this.tempData.filter(function (d:{rail_grade: string; }) {
      return d.rail_grade.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.mst_rail_grade = temp;
  }

  public openPDF():void  { this.baseServiceService.download_PDF(document.getElementById('htmlData'),'rail grade.pdf');}

  toggleNavDrawer(isDrawerOpen: boolean) {
    this.isDrawerOpen = isDrawerOpen;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }
}


