import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private urlEndPoint = 'http://localhost:80/apirest';

  private httpHeaders = new HttpHeaders({ 'Content-Type' : 'application/json'});


  constructor(private authService: AuthService, private http: HttpClient) { }


  uploadCustomers(files:any){

      const formData = new FormData();
      formData.append('excelfile',  files);

      return this.http.post(this.urlEndPoint+'/subir', formData).pipe(
          catchError(e => {
              return throwError(e);
          })
      );


}


updateCustomers(row:any){

  let body = {
           row
  }


  return this.http.post(this.urlEndPoint+'/updatecustomers',JSON.stringify(body)).pipe(
    catchError(e => {
        return throwError(e);
    })
  );
}

  getClientesRutas(id_ruta:any){

      if(id_ruta != ''){
        const formData = new FormData();
        formData.append('id_ruta',  id_ruta);

        return this.http.post(this.urlEndPoint+'/clientesxrutas', formData).pipe(
            catchError(e => {
                return throwError(e);
            })
        );
      }

  }

  getRutas(){
    return this.http.get(this.urlEndPoint+'/rutas',{}).pipe(
        catchError(e => {
            return throwError(e);
        })
    );
}

  updateOrder(rows:any){

    const formData = new FormData();
    formData.append('id_cliente',  rows.id_cliente);
    formData.append('orden', rows.orden);

    return this.http.post(this.urlEndPoint+'/updateorden', formData);
  }


  updateRuta(rows:any){

    const formData = new FormData();
    formData.append('id_cliente',  rows.id_cliente);
    formData.append('id_ruta', rows.id_ruta);

    return this.http.post(this.urlEndPoint+'/updateruta', formData);

  }


  getTotalCustomer(){

    return this.http.get(this.urlEndPoint+'/totalcustomer');

  }


  getOrdenesNoOrden(id_ruta:any){


    if(id_ruta != '' || id_ruta == 0){
    const formData = new FormData();
    formData.append('id_ruta',  id_ruta);

    return this.http.post(this.urlEndPoint+'/customersnoorden',formData).pipe(
        catchError(e => {
            return throwError(e);
        })
    );
    }
  }


  getOrdenesNoRuta(){


    return this.http.post(this.urlEndPoint+'/customersnoroute','').pipe(
        catchError(e => {
            return throwError(e);
        })
    );

  }


  deleteCustomer(id_cliente:any){

    const formData = new FormData();
    formData.append('id_cliente', id_cliente);

    return this.http.post(this.urlEndPoint+'/deletecustomer', formData).pipe(
        catchError(e => {
            return throwError(e);
        })
    );

  }
}
