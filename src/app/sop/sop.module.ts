import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUpdateComponent } from './create-update/create-update.component';
import { DeleteComponent } from './delete/delete.component';
import { ViewComponent } from './ViewComponent/view.component';
import { GetComponent } from './get/get.component';
import { RouterModule, Routes } from '@angular/router';
import { SopFooterComponent } from './sop-footer/sop-footer.component';
import { SopSidebarComponent } from './sop-sidebar/sop-sidebar.component';

const routes: Routes = [
  {
    path: '',
    // component: AdminComponent,
    // canActivate: [AuthenticationGuard],
    // data: { roles: [Role.Admin] },
    children: [
      { path: '', redirectTo: 'create-update', pathMatch: 'full' },
      { path: 'create-update', component: CreateUpdateComponent },
      { path: 'delete', component: DeleteComponent },
      { path: 'get', component: GetComponent },
      { path: 'view', component: ViewComponent },
    ]
  }
]
@NgModule({
  declarations: [
    CreateUpdateComponent,
    DeleteComponent,
    ViewComponent,
    GetComponent,
    SopFooterComponent,
    SopSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class SopModule { }
