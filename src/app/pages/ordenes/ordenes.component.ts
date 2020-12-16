import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

import { CustomersService } from 'src/app/service/customers.service';
import { OrdenesService } from 'src/app/service/ordenes.service';
@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit {

  p: number = 1;
  config:any;
  clientes:any = { count: 0, data:[] };

  nombres:any = '';

  key: string = 'id';
  reverse: boolean = false;
  ruta = "";

  rutas:any = [];


  constructor(private customerService: CustomersService, private ordenesService: OrdenesService) { }



  onChange(num){
    console.log(num);
    this.config = {
      itemsPerPage: num,
      currentPage: 1,
      totalItems: this.clientes.count
    }
  }

  ngOnInit(): void {


    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.clientes.count
    }


    this.customerService.getRutas().subscribe(res => {

        this.rutas = res;

        console.log(this.rutas);

    })



  }

  searchAll(){


    if(this.ruta != ''){

      this.ordenesService.getOrdenesToday(this.ruta).subscribe(res => {

        console.log(res);

        this.clientes.data = res;

      });

    }else{

       swal.fire('Error','Seleccione una ruta','error');

    }


  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  sort(key){
    this.key = key;
    this.reverse = ! this.reverse;
  }

  search(){
      if(this.nombres == ""){
         this.ngOnInit();
      }else{
          this.clientes.data = this.clientes.data.filter(res =>{
                return res.nombres.toLocaleLowerCase().match(this.nombres.toLocaleLowerCase())
          })
      }
  }

  editUser(item:any){
    console.log(item);
  }

  deleteUser(item:any){
    console.log(item);
  }


  checkValue(item){
      console.log(item);
  }

  checkAllCheckBox(ev) {
		this.clientes.data.forEach(x => x.checked = ev.target.checked)
	}

	isAllCheckBoxChecked() {
		return this.clientes.data.every(p => p.checked);
  }

  saveOrden(item){


     this.customerService.updateOrder(item).subscribe(res => {
         console.log(res);
         swal.fire('Update','Orden actualizada','info');
         this.searchAll();
     })
  }

}
