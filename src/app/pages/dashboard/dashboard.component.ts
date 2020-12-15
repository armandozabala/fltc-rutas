import { CustomersService } from './../../service/customers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private customerService: CustomersService) { }

  ngOnInit(): void {

     /* this.customerService.getUsers().subscribe(res => {

          console.log(res);

      });*/

  }

}
