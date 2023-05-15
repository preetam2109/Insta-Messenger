import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Base } from 'src/app/helper/base';
import { response } from '../model/response';
import { TblError } from '../model/tbl-error';
import { BaseServiceService } from '../service/base-service.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler{
  errorData: TblError = new TblError();
  base:any;
  constructor(private injector: Injector, private http: HttpClient, private baseServiceService:BaseServiceService, 
    private router: Router) { this.base = Base.baseUrl}
  handleError(error: any) { 
    try { 
        if(navigator.onLine == false){ 
          alert("Please check network connection or Reconnecting to Wi-Fi") 
        }  
        this.errorData.source_app = "Web"; 
 if(error.status != undefined){
        switch(error.status) { 
          case 401: 
           this.baseServiceService.loggedOut(); 
           return; 
           case 404: 
          this.router.navigate(['/error-404']); 
           return; 
        } 
        this.errorData.statusCode = error?.status+''; 
        this.errorData.message = error?.message; 
        this.errorData.innerException = error?.statusText; 
        this.errorData.stackTrace = ("name : "+error?.name + "; type : "+error?.type).toString(); 
        this.errorData.source = error?.url; 
      }else{      
        this.errorData.message = error.message;  
        this.errorData.stackTrace =  error.stack;       
      }
      this.http.post<response>(this.base+'error/error_insert_apps',this.errorData).subscribe((res:response) => { 
      }); 
    } catch (error: any) { 
    } 
  }
  
}
