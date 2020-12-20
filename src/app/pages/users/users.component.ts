import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/service/customers.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  p: number = 1;
  config:any;
  clientes:any = { count: 0, data:[] };

  nombres:any = '';

  key: string = 'id';
  reverse: boolean = false;
  ruta = "";

  rutas:any = [];


  constructor(private customerService: CustomersService) { }



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

    })



  }

  searchAll(){


    if(this.ruta != ''){

      this.customerService.getClientesRutas(this.ruta).subscribe(res => {

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

    swal.fire({
      title: 'Esta seguro en borrar?',
      text: "Esta acción es no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {

          console.log(item.id_cliente);

        this.customerService.deleteCustomer(item.id_cliente).subscribe(res => {

          console.log(res);

          swal.fire(
            'Borrado!',
            'Cliente borrado satisfactoriamente.',
            'success'
          );

          this.searchAll();

        });



      }
    })


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
         //swal.fire('Update','Ruta actualizada','info');
         this.searchAll();
     })
  }

  onOptionsSelected(item){

    this.customerService.updateRuta(item).subscribe(res => {
      console.log(res);
      swal.fire('Update','Orden actualizada','info');
      this.searchAll();
    })

}



}
