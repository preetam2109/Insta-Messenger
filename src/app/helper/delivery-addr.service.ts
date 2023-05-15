import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tbl_vm_delivery_order_update } from '../model/tbl-model';

@Injectable({
  providedIn: 'root'
})
export class DELIVERYADDRService {
  updatedata!: any;    
  public content = new BehaviorSubject<any>(this.updatedata);    
  public share = this.content.asObservable(); 

  constructor(private http:HttpClient) { }

  // getLatestValue(data:any) {    
  //   //debugger;    
  //   this.content.next(data);  
  //   // alert(JSON.stringify(data))  ;
  // }    

  address_insert(address:any){
    // http://sevagudiapi.shivaminfosoft.in/api/customer/address_insert
    return this.http.post <any>("http://sevagudiapi.shivaminfosoft.in/api/customer/address_insert",address)
  }
  address_form_data_get(){
    // http://sevagudiapi.shivaminfosoft.in/api/customer/address_form_data_get
    // http://billingmanager.shivaminfosoft.in/api/customer/address_form_data_get
    return this.http.get <any>("http://sevagudiapi.shivaminfosoft.in/api/customer/address_form_data_get")
  }
  delivery_address_get(){
    // http://sevagudiapi.shivaminfosoft.in/api/customer/address_form_data_get
    return this.http.get<any>("http://sevagudiapi.shivaminfosoft.in/api/customer/delivery_form_data_get")
  }
address_delete(address_id:any){
  // http://sevagudiapi.shivaminfosoft.in/api/customer/address_delete?address_id=1
    return this.http.get<any>(`http://sevagudiapi.shivaminfosoft.in/api/customer/address_delete?address_id=${address_id}`)
  }
  payments_function (address_id:any){
 

    return this.http.get <any>(`http://billingmanager.shivaminfosoft.in/api/customer/address_delete?address_id=${address_id}`)
  }
  order_post_(vm_orders:any) {
    
    return this.http.post<any>("http://billingmanager.shivaminfosoft.in/api/restaurant/order_insert", vm_orders);
  }
  order_get_pending() {
    
    return this.http.get<any>("http://billingmanager.shivaminfosoft.in/api/delivery/order_get_pending");
  }
  update_delivery_status(status: tbl_vm_delivery_order_update) {
    return this.http.put<any>(`http://billingmanager.shivaminfosoft.in/api/delivery/update_delivery_status`,status);

  }
  order_get_completed() {
    //
    return this.http.get<any>(" http://billingmanager.shivaminfosoft.in/api/delivery/order_get_completed");
  }
  tracking_data_get(order_id:any) {
    return this.http.get<any>(`http://billingmanager.shivaminfosoft.in/api/customer/tracking_data_get?order_id=${order_id}`);
  }
}
