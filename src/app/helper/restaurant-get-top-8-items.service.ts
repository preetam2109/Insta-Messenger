import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tbl_restaurant_get_filter_sort } from '../model/tbl-model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantGetTop8ItemsService {

  constructor(private http: HttpClient) { }

  getRestraurant_home_page_list() {
    return this.http.get<any>(`http://billingmanager.shivaminfosoft.in/api/restaurant/restaurant_get?page_size=8&current_page=1`);
  }
  getRestraurantbyid(id: any) {
    return this.http.get(`http://billingmanager.shivaminfosoft.in/api/restaurant/restaurant_get_by_id?restaurant_id=${id}`);
  }

  login(loginData: any) {
    return this.http.post("http://billingmanager.shivaminfosoft.in/api/Authenticate/login", loginData)
  }

  userRegistration(data:any){
    return this.http.post<any>("http://billingmanager.shivaminfosoft.in/api/Authenticate/check_user_exists", data)
  }
  otpValidate(otp:number, customerDetails:any){
    // //debugger;
    return this.http.post<any>(`http://billingmanager.shivaminfosoft.in/api/Authenticate/validate_otp?otp=${otp}`, customerDetails)
  }

  // map

  get_product(pageSize: number, pageNumber: number) {
    return this.http.get(`http://billingmanager.shivaminfosoft.in/api/restaurant/restaurant_get?page_size=${pageSize}&current_page=${pageNumber}`)
  }

  // getlocationserv(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     navigator.geolocation.getCurrentPosition(res => {
  //       resolve({ lng: res.coords.longitude, lat: res.coords.latitude })
  //     })
  //   })
  // }


  special_offer_get_by_id(buffetOfferId : any){
    return this.http.get<any>(`http://billingmanager.shivaminfosoft.in/api/restaurant/special_offer_get_by_id?offer_id=${buffetOfferId}`)
  }
 
  post_buffet_special_offer(data : any){
    // //debugger
    return this.http.post<any>(`http://billingmanager.shivaminfosoft.in/api/restaurant/special_offer_insert`, data)
  }
  restaurant_get_filter_sort(search_value:any,pageSize: number, pageNumber: tbl_restaurant_get_filter_sort){
    //debugger
    // http://billingmanager.shivaminfosoft.in/api/restaurant/restaurant_get_filter_sort?page_size=10&current_page=1&search_value=hfdsjk
    return this.http.post<any>(`http://billingmanager.shivaminfosoft.in/api/restaurant/restaurant_get_filter_sort?page_size=${pageSize}&current_page=${search_value}`,pageNumber)
  }
  // http://billingmanager.shivaminfosoft.in/api/restaurant/restaurant_get_filter_sort?page_size=10&current_page=1&search_value=Chicken%20Curry

}
