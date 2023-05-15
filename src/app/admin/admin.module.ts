import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserComponent } from './user/user.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { Role } from '../model/role';
import { AdminComponent } from './admin.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgToggleModule } from 'ng-toggle-button';
import { ListQrComponent } from './list-qr/list-qr.component';
import { CsvModule } from '@ctrl/ngx-csv';
import { RailSectionListComponent } from './rail-section-list/rail-section-list.component';
import { RailGradeListComponent } from './rail-grade-list/rail-grade-list.component';
import { WeldingTechniqueListComponent } from './welding-technique-list/welding-technique-list.component';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: [Role.Admin] },
    children: [
      { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' },
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'user', component: UserComponent },
      { path: 'list-qr', component: ListQrComponent },
      { path: 'rail-section-list', component: RailSectionListComponent },
      { path: 'rail-grade_list', component: RailGradeListComponent },
      { path: 'welding-technique-list', component: WeldingTechniqueListComponent }
    ]
  }
]

@NgModule({
    declarations: [
        UserProfileComponent,
        UserComponent,
        AdminDashboardComponent,
        AdminComponent,
        AdminFooterComponent,
        AdminSidebarComponent,
        ListQrComponent,
        RailSectionListComponent,
        RailGradeListComponent,
        WeldingTechniqueListComponent,
    ],
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule, NgxDatatableModule,
        CsvModule,
        NgToggleModule,
        RouterModule.forChild(routes),
    ],
    exports: [
      AdminSidebarComponent,
    ],
    // exports:[AdminSidebarComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    
})
export class AdminModule { }
