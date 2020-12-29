import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/service/customers.service';
import swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  p: number = 1;
  config:any;
  clientes:any = { count: 0, data:[] };

  nombres:any = '';

  key: string = 'id';
  reverse: boolean = false;
  ruta = "";

  rutas:any = [];
  total=0;

  @BlockUI() blockUI: NgBlockUI;

  checkedList:any;

  constructor(private customerService: CustomersService, private toaster: Toaster) { }



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

    this.blockUI.start('Cargando clientes...'); // Start blocking

    if(this.ruta != ''){

      this.customerService.getClientesRutas(this.ruta).subscribe((res:any) => {


        this.clientes.data = res;
        this.total = res.length;

        if(this.clientes.data.length == 0){
          swal.fire('Información','No hay clientes','warning');
        }


        this.blockUI.stop(); // Start blocking
      });

    }else{

       swal.fire('Error','Seleccione una ruta','error');

       this.blockUI.stop(); // Start blocking
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

          /*swal.fire(
            'Borrado!',
            'Cliente borrado satisfactoriamente.',
            'success'
          );*/

          this.searchAll();

        });



      }
    })


  }


  checkValue(){
    this.checkedList = [];
    for (var i = 0; i < this.clientes.data.length; i++) {
      if(this.clientes.data[i].checked)
       this.checkedList.push(this.clientes.data[i]);
    }
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


         this.toaster.open({text: 'Ruta actualizada', caption: 'Info', position:  'top-right' , duration: 2000, type: 'success'});

         setTimeout(() => {
          this.searchAll();
         },500);

     })
  }

  onOptionsSelected(item){

    this.customerService.updateRuta(item).subscribe(res => {
      console.log(res);
      //swal.fire('Update','Orden actualizada','info');
      this.toaster.open({text: 'Actualizando cliente', caption: 'Info', position:  'top-right' , duration: 1500, type: 'primary'});

        this.searchAll();

    })

}




showAllSelected(){

  this.blockUI.start('Reordenando clientes...'); // Start blocking


  if(this.isAllCheckBoxChecked()){

        if(this.clientes.data.length == 0){
          swal.fire('Error','Debe seleccionar por lo menos una orden','error');
          this.blockUI.stop();
        }else{
          console.log(this.clientes.data);

          this.customerService.updateCustomers(this.clientes.data).subscribe(res => {

              console.log(res);

              this.blockUI.stop();

              this.toaster.open({text: 'Orden actualizada', caption: 'Info', position:  'top-right' , duration: 2000, type: 'success'});

              setTimeout(() => {
                  this.searchAll();
              },500);


          });

        }


  }else{
      if(this.checkedList == undefined || this.checkedList.length == 0 ){
        swal.fire('Error','Debe seleccionar por lo menos una orden','error');
        this.blockUI.stop();
      }else{
        console.log(this.checkedList);

            this.customerService.updateCustomers(this.checkedList).subscribe(res => {

              console.log(res);

              this.blockUI.stop();

              this.toaster.open({text: 'Orden actualizada', caption: 'Info', position:  'top-right' , duration: 2000, type: 'success'});

              setTimeout(() => {
                  this.searchAll();
              },500);

          });

      }

  }

}


}
