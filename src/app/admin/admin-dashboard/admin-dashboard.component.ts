import { Component, EventEmitter, OnInit, Output,NgZone} from '@angular/core';
import { Base } from 'src/app/helper/base';
// testing
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { Capacitor, Plugins } from '@capacitor/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  isDrawerOpen = false;
  @Output()
  UserDetail:any;
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  base:any;
  state: any;
  constructor(private router: Router, private zone: NgZone) { 
    this.base=Base
    this.UserDetail=JSON.parse(localStorage.getItem('currentUser') || '{}')
  }

  ngOnInit(): void {

  }
   initializeApp() {
    debugger
    alert( 'qqq');
    App.addListener('appUrlOpen', (data: any) => {
      alert('App opened with URL: ' + data.url);
    });
            
    // Plugins.App.addListener('appUrlOpen', (urlOpen:any) => {

    //    alert( 'urlOpen');
    //   // is never called
    //   this.zone.run(() =>{
    //     alert( urlOpen);
    //     // this.navigate(urlOpen.url);
    //   });
    // })
    // try{

    //   alert(JSON.stringify("event.url"));
    //   if (Capacitor.isPluginAvailable('App')) {
    //     App.addListener('appUrlOpen', (urlOpen) => {
    //         alert(`URL: ${urlOpen.url}`);
    //         // handleDeepLink(urlOpen.url);
    //     });
    //  }
    //  else alert('plugin not available')
    // }catch (error:any){
    //   alert(error.message);
    // }
    // App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
    //     this.zone.run(() => {
    //         // Example url: https://beerswift.app/tabs/tab2
    //         // slug = /tabs/tab2
    //        alert(JSON.stringify(event.url));
    //         const slug = event.url.split(".app").pop();
    //         if (slug) {
    //             this.router.navigateByUrl(slug);
    //         }
    //         // If no match, do nothing - let regular routing
    //         // logic take over
    //     },(error:any)=>{
    //       alert(JSON.stringify(error))});
    // });
}
  toggleNavDrawer(isDrawerOpen: boolean) {
    this.isDrawerOpen = isDrawerOpen;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }
  
}
