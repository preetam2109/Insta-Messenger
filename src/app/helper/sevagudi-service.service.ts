import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SevagudiServiceService {

  constructor(private http:HttpClient) { }
  get_sevagudi_data(page_size:any, current_page:any){
    // //debugger
    // http://sevagudiapi.shivaminfosoft.in/api/app/service_group_get?page_size=10&current_page=1
    return this.http.post<any>(`http://sevagudiapi.shivaminfosoft.in/api/app/service_group_get?page_size=${page_size}&current_page=${current_page}`,{})

    // http://sevagudiapi.shivaminfosoft.in/api/service/service_get
    // http://sevagudiapi.shivaminfosoft.in/api/app/service_group_get?page_size=10&current_page=1

    // return this.http.get<any>("http://billingmanager.shivaminfosoft.in/api/customer/orders_get");

  }
}
