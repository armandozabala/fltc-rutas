import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficasComponent } from './graficas/graficas.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { UsersComponent } from './users/users.component';
import { CustomersComponent } from './customers/customers.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { BlockUIModule } from 'ng-block-ui';
import { CustomersnorouteComponent } from './customersnoroute/customersnoroute.component';
import { LoadcustomersComponent } from './loadcustomers/loadcustomers.component';
import { CustomernoorderComponent } from './customernoorder/customernoorder.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraficasComponent,
    PagesComponent,
    UsersComponent,
    CustomersComponent,
    OrdenesComponent,
    CustomersnorouteComponent,
    LoadcustomersComponent,
    CustomernoorderComponent
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    GraficasComponent,
    PagesComponent
  ],
  imports: [

    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NgxPaginationModule,
    OrderModule,
    Ng2SearchPipeModule
  ]
})
export class PagesModule { }
