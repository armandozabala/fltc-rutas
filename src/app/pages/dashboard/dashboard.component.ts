import { CustomersService } from './../../service/customers.service';
import { Component, OnInit } from '@angular/core';
import { OrdenesService } from 'src/app/service/ordenes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalCustomer = 0 ;
  totalNoRoute = 0;
  totalNoOrden = 0;
  ordenes = 0;
  ruta = 0;

  constructor(private customerService: CustomersService, private ordenesService: OrdenesService) { }

  ngOnInit(): void {

     this.customerService.getTotalCustomer().subscribe( (res:any) => {


          this.totalCustomer = res.total;

      });

      this.customerService.getOrdenesNoRuta().subscribe( (res:any) => {


        this.totalNoRoute = res.length;

      });


      this.customerService.getOrdenesNoOrden(this.ruta).subscribe((res:any) => {


            this.totalNoOrden = res.length;


      });


      this.ordenesService.getOrdenesToday(this.ruta).subscribe((res:any) => {


          this.ordenes = res.length;

      });


  }

}
