import { MapsAPILoader } from '@agm/core';
import { DatePipe } from '@angular/common';
import { NodeWithI18n, ParseFlags } from '@angular/compiler';
import { Component, ElementRef, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {DELIVERYADDRService} from 'src/app/helper/delivery-addr.service'
import { Base } from 'src/app/helper/base';
@Component({
  selector: 'app-trace-order',
  templateUrl: './trace-order.component.html',
  styleUrls: ['./trace-order.component.css']
})
export class TraceOrderComponent implements OnInit {
  navElement: HTMLElement | undefined;
  isDrawerOpen!: boolean;
  @Output()
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>(); 
  order_id:any;
  tracking_value:any;
  base:any;
  latitude:any;
  longitude:any;
  zoom!: number;
 address: any;
 private geocoder: any;
 public searchElementRef: ElementRef | undefined; 
//  activationDate = this.getNowUTC();
 isoStr:any;
  pickup_date:any;
 ofd_date:any;
delivery_date:any;
Seconds_Between_Dates:any;
ofd_Between_Dates:any;
delivery_Between_Dates:any;
  constructor(private _dELIVERYADDRService:DELIVERYADDRService, private route:ActivatedRoute,private toastr: ToastrService,
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

    

  ngOnInit(): void {
    this.queryParam_get();
    this.tracking_data_get();
    this.isDrawerOpen = false;  


    this.base=Base;
    // var dateTime: number = Number(Date.now());
//   // alert(dateTime);
//  var date = new Date(dateTime);
//   // this.isoStr = new Date(date);
//   // this.isoStr=date.toLocaleString();
//   this.isoStr = date.toISOString();
//     alert(  this.isoStr);
  }

get_location_Address(){

  this.mapsAPILoader.load().then(() => {
    this.setCurrentLocation();
    this.geocoder = new google.maps.Geocoder;
  });
}
//#region get location
private setCurrentLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      // alert('lon'+this.longitude + 'lat'+  this.latitude)
      this.zoom = 8;
      this.geocoder.geocode({ 'location': { lat:this.latitude, lng: this.longitude } }, (results:any, status:any) => {
        console.log(results);
        console.log(status);
        console.log("lomesh1");
         if (status === 'OK') {
           if (results[0]) {
             this.zoom = 12;
             this.address = results[0].formatted_address;
             console.log(this.address);
           } else {
             window.alert('No results found');
           }
         } else {
           window.alert('Geocoder failed due to: ' + status);
         }
     
       });
      // this.getAddress(this.latitude, this.longitude);

    });
  }
}
//#endregion
  queryParam_get(){
    this.route.queryParamMap.subscribe((params)=>{
      this.order_id = params.get('order_id');
    });
  }
  tracking_data_get() {

    try {
      this._dELIVERYADDRService.tracking_data_get(this.order_id).subscribe((res: any) => {
        if (res.status == 'success') {
          
          this.tracking_value = res.data.tracking_data[0]
          this.pickup_date=this.tracking_value.pickup_date
          this.ofd_date=this.tracking_value.ofd_date
          this.delivery_date=this.tracking_value.delivery_date
          this.get_time();
        }
      },(error) => { alert(JSON.stringify(error)) });
    }catch (ex: any) {
      this.toastr.error(ex.message, 'Error!');
    }
    
  }
    

 get_time() {
  const activationDate = new Date();

var utcDate= new Date(activationDate.getUTCFullYear(),
                                            activationDate.getUTCMonth(),
                                            activationDate.getUTCDate(),
                                            activationDate.getUTCHours(),
                                            activationDate.getUTCMinutes(),
                                            activationDate.getUTCSeconds()
                                            );

 var isoStr= utcDate.toISOString();
  var startDate =new Date(this.pickup_date);
  var ofdDate =new Date(this.ofd_date);
  var deliveryDate =new Date(this.delivery_date);
  var endDate =new Date(isoStr);
  var pickupTime =endDate.getTime() - startDate.getTime();
  
  var ofdTime = endDate.getTime() - ofdDate.getTime();
  var deliveryTime = endDate.getTime() - deliveryDate.getTime();
  this.Seconds_Between_Dates = Math.ceil(pickupTime)/60000;
  this.ofd_Between_Dates = Math.ceil(ofdTime)/60000;
  this.delivery_Between_Dates = Math.abs(deliveryTime)/60000;
  }


  ngAfterViewInit() {
    this.navElement = <HTMLElement>document.getElementById('navbar');
  }
  toggleNavDrawer(isDrawerOpen: boolean) {
    
    this.isDrawerOpen = isDrawerOpen;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }
}
