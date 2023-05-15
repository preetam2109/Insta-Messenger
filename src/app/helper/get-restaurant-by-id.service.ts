import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from '../model/response';
import { tbl_login } from '../model/tbl-login';
import { Base } from 'src/app/helper/base';
@Injectable({
  providedIn: 'root'
})
export class GetRestaurantByIdService {
  base: any
  adminAppUrl: any
  constructor(private http: HttpClient) {this.base = Base; this.adminAppUrl = Base.adminAppUrl; }

  getRestraurantbyid(id:any,vm_filter_item:any) {
    // //debugger;
    return this.http.post(this.base.baseUrl +'restaurant/restaurant_get_by_id?restaurant_id=${id}',vm_filter_item);
  }
  
  getRestraurantbyid1(item_name:any) {
    return this.http.get(this.base.baseUrl +'restaurant_kot/get_food_items?item_name=${item_name}');

  }
  kotget(tbl_name:any){
    
    return this.http.get(this.base.baseUrl +'restaurant_kot/dine_in_table_get_new?table_name=${tbl_name}');

   }
   getresturent(){
     
     return this.http.get(this.base.baseUrl +'Authenticate/Login_KOT_Waiter');

   }
   Table_List(tbl_name:any){
    return this.http.get(this.base.baseUrl +'restaurant_kot/dine_in_table_get?table_name=${tbl_name}');
   }
   menu_Listt(item_name:any){
    return this.http.get(this.base.baseUrl +'restaurant_kot/get_food_items?item_name=${item_name}');
   }
   dine_in_table_get_new(){
    return this.http.get(this.base.baseUrl +'restaurant_kot/dine_in_table_get_new');

   }
   kot_order_delete(order_id:any){
   return this.http.delete<response>(this.base.baseUrl +'restaurant_kot/kot_order_delete?order_id=${order_id}');
   }
   kot_order_get(){
    return this.http.get<response>(this.base.baseUrl +'restaurant_kot/kot_order_get_by_user_id');
   

  }
  profile_get(){
   return this.http.get<response>(this.base.baseUrl +'authenticate/user_get_by_user_id');
  }
  change_password(logindta :any){
    //debugger;
   return this.http.post<any>(this.base.baseUrl +'Authenticate/change_password',logindta);
  }


   change_profile(profile_data :any){
    return this.http.post<any>(this.base.baseUrl +'api/Authenticate/upload_profile_photo',profile_data);
  
   }
   get_otp(otp:any){
    //debugger;
     return this.http.post <any>(this.base.baseUrl +'api/Authenticate/get_otp',otp)
   }
   verify_otp(otpdata: any) {
     //debugger
     return this.http.post<response>(this.base.baseUrl +'Authenticate/verify_otp', otpdata);
   }
   kot_order_get_by_order_id_edit(order_id:any){
   return this.http.get<response>(this.base.baseUrl +'restaurant_kot/kot_order_get_by_order_id_edit?order_id=${order_id}') 

   }
}
