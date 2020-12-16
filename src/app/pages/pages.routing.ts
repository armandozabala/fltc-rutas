import { CustomersnorouteComponent } from './customersnoroute/customersnoroute.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { AuthGuard } from './../guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficasComponent } from './graficas/graficas.component';
import { PagesComponent } from './pages.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate:[AuthGuard],
    children:[
      { path: '', component: DashboardComponent },
      { path: 'graficas', component: GraficasComponent},
      { path: 'users', component: UsersComponent},
      { path: 'ordenes', component: OrdenesComponent},
      { path: 'customersnoroutes', component: CustomersnorouteComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
