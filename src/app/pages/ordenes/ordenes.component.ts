import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

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
  checkedList:any;

  @BlockUI() blockUI: NgBlockUI;



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

    })



  }

  searchAll(){

    this.blockUI.start('Cargando Ordenes...'); // Start blocking

    this.checkedList = [];

    if(this.ruta != ''){

      this.ordenesService.getOrdenesToday(this.ruta).subscribe(res => {


        this.clientes.data = res;

        if(this.clientes.data.length == 0){
          swal.fire('Información','No hay ordenes','warning');
        }

        this.blockUI.stop();

      });

    }else{

       swal.fire('Error','Seleccione una ruta','error');

       this.blockUI.stop();

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

  deleteOrder(item:any){
    swal.fire({
      title: 'Esta seguro en borrar  #'+item.id+' esta orden ?',
      text: "Esta acción es no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {

          console.log(item.id);

        this.ordenesService.deleteOrden(item.id).subscribe(res => {

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



  showAllSelected(){


    this.blockUI.start('Generando Ordenes...'); // Start blocking

        if(this.isAllCheckBoxChecked()){


              if(this.clientes.data.length == 0){
                swal.fire('Error','Debe seleccionar por lo menos una orden','error');
                this.blockUI.stop(); // Start blocking
              }else{
                console.log(this.clientes.data);

                this.ordenesService.getOrdenesExcel(this.clientes.data);

                this.blockUI.stop(); // Start blocking
              }


        }else{


            if(this.checkedList == undefined || this.checkedList.length == 0 ){
              swal.fire('Error','Debe seleccionar por lo menos una orden','error');
              this.blockUI.stop(); // Start blocking
            }else{
              console.log(this.checkedList);

              this.ordenesService.getOrdenesExcel(this.checkedList);

              this.blockUI.stop(); // Start blocking

            }

        }

  }


  deleteAllSelected(){


    this.blockUI.start('Borrando Ordenes...'); // Start blocking

    if(this.isAllCheckBoxChecked()){

          if(this.clientes.data.length == 0){
            swal.fire('Error','Debe seleccionar por lo menos una orden','error');
            this.blockUI.stop(); // Start blocking
          }else{
            console.log(this.clientes.data);

            this.ordenesService.deleteAllOrden(this.clientes.data).subscribe(res =>{

                console.log(res);

                this.searchAll();

                this.blockUI.stop(); // Start blocking

            });
          }


    }else{
        if(this.checkedList == undefined || this.checkedList.length == 0 ){
          swal.fire('Error','Debe seleccionar por lo menos una orden','error');
          this.blockUI.stop(); // Start blocking
        }else{
          console.log(this.checkedList);

          this.ordenesService.deleteAllOrden(this.checkedList).subscribe(res => {
              console.log(res);

              this.searchAll();

              this.blockUI.stop(); // Start blocking
          });

        }

    }

}

  saveOrden(item){


     this.customerService.updateOrder(item).subscribe(res => {
         console.log(res);
         //swal.fire('Update','Orden actualizada','info');
         this.searchAll();
     })
  }

}
