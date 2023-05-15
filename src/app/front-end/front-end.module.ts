import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './layout/home/home.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FilterComponent } from './layout/filter/filter.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SplashScreenComponent } from './layout/splash-screen/splash-screen.component';
import { FrontEndComponent } from './front-end.component';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { TraceOrderComponent } from './layout/trace-order/trace-order.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileComponent } from './layout/user-profile/user-profile.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxSlickJsModule } from 'ngx-slickjs'
import { NgSelectModule } from '@ng-select/ng-select';
import { AboutUsComponent } from './layout/about-us/about-us.component';
import { AgmCoreModule } from '@agm/core';
import { LoginWithOtpComponent } from '../authentication/login-with-otp/login-with-otp.component';
import { ContactComponent } from './layout/contact/contact.component'; 
import { CreateContactComponent } from './layout/create-contact/create-contact.component'; 
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { CsvModule } from '@ctrl/ngx-csv';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SmsHeaderComponent } from './layout/sms-header/sms-header.component';
import { SmsHeaderCreateComponent } from './layout/sms-header-create/sms-header-create.component';
import { SmsTemplateComponent } from './layout/sms-template/sms-template.component';
import { SmsTemplateCreateComponent } from './layout/sms-template-create/sms-template-create.component';
import { WhatsappSendComponent } from './layout/whatsapp-send/whatsapp-send.component';
import { EmployeesComponent } from './layout/employees/employees.component';
import { ApiSettingsComponent } from './layout/api-settings/api-settings.component';
import { SmsSendComponent } from './layout/sms-send/sms-send.component';
import { AdminModule } from "../admin/admin.module";
import { SmsSettingsComponent } from './layout/sms-settings/sms-settings.component';
import { EmployeeCreateUpdateComponent } from './layout/employee-create-update/employee-create-update.component';

const routes: Routes = [
  {
    path: '',
    component: FrontEndComponent,
    canActivate:[AuthenticationGuard],
    children: [
      // { path: '', redirectTo:'login', pathMatch: 'full',  },
      //{ path: '', redirectTo: 'login-with-otp', pathMatch: 'full', },
      { path: 'login-with-otp', component: LoginWithOtpComponent },
      { path: 'home', component: HomeComponent },
      { path: 'filter', component: FilterComponent },
      { path: 'trace-order', component: TraceOrderComponent },
      {
        path:'contact',
        component:ContactComponent
      },
      {
        path:'create-contact',
        component:CreateContactComponent
      },
      { path: 'whatsapp-send', component: WhatsappSendComponent },
      { path: 'sms-template-create', component: SmsTemplateCreateComponent },
      { path: 'sms-template', component: SmsTemplateComponent },
      { path: 'sms-Header-create', component: SmsHeaderCreateComponent },
      { path: 'sms-header', component: SmsHeaderComponent },
      { path: 'sms-send', component: SmsSendComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'api-settings', component: ApiSettingsComponent },
      { path: 'employee-create-update', component: EmployeeCreateUpdateComponent },


     
      
    ]
  },


]

@NgModule({
    declarations: [
        HomeComponent,
        FooterComponent,
        FilterComponent,
        SidebarComponent,
        SplashScreenComponent,
        UserProfileComponent,
        TraceOrderComponent,
        AboutUsComponent,
        ContactComponent,
        CreateContactComponent,
        SmsSendComponent,
        SmsHeaderComponent,
        SmsHeaderCreateComponent,
        SmsTemplateComponent,
        SmsTemplateCreateComponent,
        WhatsappSendComponent,
        ApiSettingsComponent,
        SmsSettingsComponent,
        EmployeesComponent,
        EmployeeCreateUpdateComponent
    ],
    exports: [
        SidebarComponent,
        FooterComponent,
        HomeComponent,
    ],
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule,
        NgbModule, BrowserAnimationsModule, SlickCarouselModule, NgxScannerQrcodeModule,
        NgSelectModule,
        RouterModule.forChild(routes),
        AgmCoreModule.forRoot({ apiKey: 'AIzaSyCXUEzJM6DtsnYJwoegStPWG9-Dqn2G0sI' }),
        // AgmCoreModule.forRoot({apiKey:'AIzaSyDP2yeqdQK2_pJrl6_Hmjb4usYxEVStA4s'}),
        NgxSlickJsModule.forRoot({
            links: {
                jquery: "https://code.jquery.com/jquery-3.4.0.min.js",
                slickJs: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js",
                slickCss: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css",
                slickThemeCss: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"
            }
        }),
        CsvModule, NgxDatatableModule,
        AdminModule
    ]
})
export class FrontEndModule { }
