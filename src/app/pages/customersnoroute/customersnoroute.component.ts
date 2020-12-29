import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/service/customers.service';
import { OrdenesService } from 'src/app/service/ordenes.service';
import swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-customersnoroute',
  templateUrl: './customersnoroute.component.html',
  styleUrls: ['./customersnoroute.component.css']
})
export class CustomersnorouteComponent implements OnInit {

  p: number = 1;
  config:any;
  clientes:any = { count: 0, data:[] };

  nombres:any = '';

  key: string = 'id';
  reverse: boolean = false;
  ruta = "";

  rutas:any = [];

  @BlockUI() blockUI: NgBlockUI;

  constructor(private customerService: CustomersService, private ordenesService: OrdenesService, private toaster: Toaster) { }



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

        //console.log(this.rutas);

    })

    this.searchAll();


  }

  searchAll(){

    this.blockUI.start('Cargando clientes...'); // Start blocking


      this.customerService.getOrdenesNoRuta().subscribe(res => {


        this.clientes.data = res;


        this.blockUI.stop(); // Start blocking

      });




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


  onOptionsSelected(item){

      this.customerService.updateRuta(item).subscribe(res => {
        console.log(res);
        //swal.fire('Update','Orden actualizada','info');
        this.toaster.open({text: 'Actualizando cliente', caption: 'Info', position:  'top-right' , duration: 1500, type: 'primary'});
        this.searchAll();

      })

  }


  saveOrden(item){

    this.customerService.updateOrder(item).subscribe(res => {
        console.log(res);
        //swal.fire('Update','Orden actualizada','info');
        this.toaster.open({text: 'Orden Actualizada', caption: 'Info', position:  'top-right' , duration: 1500, type: 'primary'});
        this.ngOnInit();
    })
 }
}

