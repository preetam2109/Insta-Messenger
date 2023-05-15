import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseServiceService } from 'src/app/service/base-service.service';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {
  interval: any; 
 
  constructor(
    private router: Router,
    private baseServiceService: BaseServiceService
    ) { 
    // if (this.loginService.isLoggedIn()) { 
    //   this.router.navigate(['/Service']); 
    //   return; 
    // } 
    this.timerForSplashScreen(); 
  } 
 
  ngOnInit(): void { 
    // if (this.loginService.isLoggedIn()) { 
    //   this.router.navigate(['/Service']); 
    // } 
    // // this.timerForSplashScreen(); 
 
  } 
  timerForSplashScreen() { 
    this.interval = setInterval(() => { 
      if (this.baseServiceService.isLoggedIn())  
        switch(this.baseServiceService.getRoles()){ 
          case "Admin" : this.router.navigate(['/admin-dashboard']);break; 
          case "Scanner" : this.router.navigate(['/scanned-product']);break; 
        } 
        else       this.router.navigate(['/login']); 
    clearInterval(this.interval); 
    }, 5000); 
  } 
   
  ngOnDestroy() { 
    clearInterval(this.interval); 
  } 
}