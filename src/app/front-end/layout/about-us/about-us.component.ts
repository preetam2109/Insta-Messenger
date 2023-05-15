import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Base } from 'src/app/helper/base';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  navElement: HTMLElement | undefined;
  isDrawerOpen!: boolean;
  @Output()
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  base:any;
  constructor() { }

  ngOnInit(): void {
    this.isDrawerOpen = false;
    this.base = Base;
  }

  ngAfterViewInit() {
    this.navElement = <HTMLElement>document.getElementById('navbar');
  }
  toggleNavDrawer(isDrawerOpen: boolean) {
    // //debugger;
    this.isDrawerOpen = isDrawerOpen;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }
}
