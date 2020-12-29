import { CustomersService } from './../../service/customers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalCustomer = 0 ;
  totalNoRoute = 0;

  constructor(private customerService: CustomersService) { }

  ngOnInit(): void {

     this.customerService.getTotalCustomer().subscribe( (res:any) => {


          this.totalCustomer = res.total;

      });

      this.customerService.getOrdenesNoRuta().subscribe( (res:any) => {


        this.totalNoRoute = res.length;

      });

  }

}
