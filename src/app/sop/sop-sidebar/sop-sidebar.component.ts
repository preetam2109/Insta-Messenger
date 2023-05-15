import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Base } from 'src/app/helper/base';

@Component({
  selector: 'app-sop-sidebar',
  templateUrl: './sop-sidebar.component.html',
  styleUrls: ['./sop-sidebar.component.css']
})
export class SopSidebarComponent implements OnInit {
  @Input()
  @HostBinding('class.drawer-open')
  isDrawerOpen!: boolean;
  base:any;
  @Output()
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private router: Router) { } 
  ngOnInit(): void {
    this.base = Base;
  }
  logout(){
    // this.restaurants1 = JSON.parse(localStorage.getItem("currentUser") || '{}');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('tbl_order');
    localStorage.removeItem('restoId');
    localStorage.removeItem('restaurant');
    localStorage.removeItem('tbl_order_items');
    localStorage.removeItem('newOrderNumber');
    localStorage.removeItem('ltn');
    this.router.navigateByUrl('login-with-otp');
  }
  onNavLinkClicked($event: MouseEvent) {
    this.isDrawerOpen = false;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }
}
