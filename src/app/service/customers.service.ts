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


  getOrdenesSinRutas(){

    return this.http.post(this.urlEndPoint+'/customersnoroutes','').pipe(
        catchError(e => {
            return throwError(e);
        })
    );

  }
}
