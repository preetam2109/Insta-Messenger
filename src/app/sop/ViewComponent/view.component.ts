import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Base } from 'src/app/helper/base';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  isDrawerOpen = false;
  @Output()
  UserDetail:any;
  base:any;
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {  this.base=Base}

  ngOnInit(): void {
  }
  toggleNavDrawer(isDrawerOpen: boolean) {
    this.isDrawerOpen = isDrawerOpen;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }

}
