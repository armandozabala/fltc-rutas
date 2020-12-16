import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  private urlEndPoint = 'http://localhost:80/apirest';

  private httpHeaders = new HttpHeaders({ 'Content-Type' : 'application/json'});

  constructor(private authService: AuthService, private http: HttpClient) { }


  getOrdenesToday(id_ruta){

      const formData = new FormData();
      formData.append('id_ruta',  id_ruta);

      return this.http.post(this.urlEndPoint+'/ordenestoday', formData).pipe(
          catchError(e => {
              return throwError(e);
          })
      );

  }


  getOrdenesSinRutas(){


    return this.http.post(this.urlEndPoint+'/customersnoroutes',{}).pipe(
        catchError(e => {
            return throwError(e);
        })
    );

  }
}
