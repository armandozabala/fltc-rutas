import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomersService } from 'src/app/service/customers.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import swal from 'sweetalert2';

@Component({
  selector: 'app-loadcustomers',
  templateUrl: './loadcustomers.component.html',
  styleUrls: ['./loadcustomers.component.css']
})
export class LoadcustomersComponent implements OnInit {


  @ViewChild('labelImport')
  labelImport: ElementRef;

  activo = true;

  formImport: FormGroup;
  fileToUpload: File = null;

  fileUpload: ElementRef;files = [];

  @BlockUI() blockUI: NgBlockUI;

  informacion:any;

  constructor(private customerService: CustomersService) {
    this.formImport = new FormGroup({
      importFile: new FormControl('', Validators.required)
    });
  }

  ngOnInit(){}




  import(): void {

    this.blockUI.start('Cargando...'); // Start blocking

    console.log(this.files[0]);

    this.customerService.uploadCustomers(this.files[0].data).subscribe(res => {
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
