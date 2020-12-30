import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomersService } from 'src/app/service/customers.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';


@Component({
  selector: 'app-loadorders',
  templateUrl: './loadorders.component.html',
  styleUrls: ['./loadorders.component.css']
})
export class LoadordersComponent implements OnInit {


  @ViewChild('labelImport')
  labelImport: ElementRef;

  p: number = 1;
  config:any;
  clientes:any = { count: 0, data:[] };

  nombres:any = '';

  activo = true;
  rutas:any = [];
  formImport: FormGroup;
  fileToUpload: File = null;

  fileUpload: ElementRef;files = [];

  @BlockUI() blockUI: NgBlockUI;

  key: string = 'id';
  reverse: boolean = false;

  informacion:any;

  constructor(private customerService: CustomersService) {
    this.formImport = new FormGroup({
      importFile: new FormControl('', Validators.required)
    });
  }

  ngOnInit(){
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.clientes.count
    }


    this.customerService.getRutas().subscribe(res => {

        this.rutas = res;

    })
  }



  pageChanged(event){
    this.config.currentPage = event;
  }

  sort(key){

    this.key = key;
    this.reverse = ! this.reverse;
  }

  onOptionsSelected(item){

    this.customerService.updateRuta(item).subscribe(res => {
      console.log(res);
      swal.fire('Update','Orden actualizada','info');

    })

}

  import(): void {

    this.blockUI.start('Cargando...'); // Start blocking


    this.customerService.uploadOrder(this.files[0].data).subscribe(res => {

        console.log(res);

        this.blockUI.stop();

        this.informacion = res;
    });

  }




onClick(files: FileList) {


      this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');

      for (let index = 0; index < files.length; index++)

      {

       const file = files[index];

       this.files.push({ data: file, inProgress: false, progress: 0});

       this.activo = false;

      }




  }

}
