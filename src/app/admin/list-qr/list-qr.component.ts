import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { tbl_login, tbl_product } from 'src/app/model/product-tracker';
import { BaseServiceService } from 'src/app/service/base-service.service';;
import { Base } from 'src/app/helper/base';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-list-qr',
  templateUrl: './list-qr.component.html',
  styleUrls: ['./list-qr.component.css']
})
export class ListQrComponent implements OnInit {
  tbl_product: tbl_product[] = [];
  res: any;
  error: any;
  isDrawerOpen=false;
  @Output()
  base: any;
  UserDetail:any;
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  public contentHeader: object | undefined;
  public rows: any;
  public selected = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 50;
  public ColumnMode = ColumnMode;
  public exportCSVData: any;
  public exportpdfData: any;
  private tempData: any
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
  constructor(private formBuilder: FormBuilder,private toastr: ToastrService, private baseServiceService: BaseServiceService, private router: Router) {
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
    this.baseServiceService.get('Product')
      .subscribe(
        (res: any) => {

          this.tbl_product = res.data.entity_data;
          this.tempData = res.data.entity_data;
        }, // success path
        error => {
          this.toastr.error('Something went wrong, please try again!', 'Error!');
        } // error path
      );
  }

  print_qr(product_id: any) {
    this.router.navigate(
      ['/print-qr'],
      { queryParams: { product_id: this.baseServiceService.encryptUsingAES256(product_id) } }
    );
  }

  filterUpdate(event: any) {
    const val = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d: { rail_section: string; }) {
      return d.rail_section.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.tbl_product = temp;
  }
  public openPDF():void  { this.baseServiceService.download_PDF(document.getElementById('htmlData'),'list qr.pdf');}
}


