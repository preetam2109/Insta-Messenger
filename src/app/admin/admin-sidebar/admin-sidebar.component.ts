import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Base } from 'src/app/helper/base';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  @Input()
  @HostBinding('class.drawer-open')
  isDrawerOpen!: boolean;
  base:any;
  @Output()
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  UserDetail:any;
  constructor(private router: Router) { } 
  ngOnInit(): void {
    this.base = Base;
    this.UserDetail=JSON.parse(localStorage.getItem('currentUser') || '{}')
    //  this.UserDetail.role ='Scanner'
    //  this.UserDetail.role ='Generator'
  }
  logout(){
    // this.restaurants1 = JSON.parse(localStorage.getItem("currentUser") || '{}');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('ltn');
    this.router.navigateByUrl('/login');
  }
  onNavLinkClicked($event: MouseEvent) {
    this.isDrawerOpen = false;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }
}
