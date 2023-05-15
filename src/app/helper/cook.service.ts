import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CookService {

  constructor(private http:HttpClient) { }
  restaurant_cook_order_get(){
    // //debugger
    return this.http.get(`http://billingmanager.shivaminfosoft.in/api/restaurant_cook/order_get`);
  }
  order_update_status(order_id:number,status:number){
    // //debugger;
    return this.http.put(`http://billingmanager.shivaminfosoft.in/api/restaurant_cook/order_update_status?order_id=${order_id}&status=${status}`,'');
  }
  order_get_by_user_id(from_date:string,to_date:string){
    return this.http.get(`http://billingmanager.shivaminfosoft.in/api/restaurant_cook/order_get_by_user_id?from_date=${from_date}&to_date=${to_date}`);
  }
  // http://billingmanager.shivaminfosoft.in/api/restaurant_cook/order_get_by_user_id?from_date=10%2F18%2F2022&to_date=10%2F18%2F2022
}
  
