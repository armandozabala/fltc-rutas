import { CustomernoorderComponent } from './customernoorder/customernoorder.component';
import { CustomersComponent } from './customers/customers.component';
import { LoadcustomersComponent } from './loadcustomers/loadcustomers.component';
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
      { path: 'customers', component: CustomersComponent},
      { path: 'ordenes', component: OrdenesComponent},
      { path: 'loadfile', component: LoadcustomersComponent},
      { path: 'customersnoroutes', component: CustomersnorouteComponent},
      { path: 'customersnoorders', component: CustomernoorderComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
