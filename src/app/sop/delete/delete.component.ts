import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Base } from 'src/app/helper/base';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
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
