import { Component } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { App } from '@capacitor/app';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'new_Restaurant_Management';
  // base=Base
  navCtrl: any;
  constructor(private location: Location) {
    App.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack) {
        App.exitApp();
      } else {
        this.location.back();
        // this.location.historyGo();
        // this.navCtrl.pop();
        // this.navCtrl.back();
      }
    });
  }
}
