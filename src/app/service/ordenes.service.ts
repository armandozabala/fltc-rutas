import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { saveAs } from "file-saver";
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


  deleteOrden(id_orden:any){

    const formData = new FormData();
    formData.append('id_orden', id_orden);

    return this.http.post(this.urlEndPoint+'/deleteorder', formData).pipe(
        catchError(e => {
            return throwError(e);
        })
    );

  }



  getOrdenesExcel(row:any){

    let body = {
             row
    }
    const headers = new HttpHeaders();

    this.http.post(this.urlEndPoint+'/downloadexcel',JSON.stringify(body),{headers, responseType: 'blob' as 'json'}).subscribe((response:any) =>{


      const blob = new Blob([response],  { type: 'application/vnd.ms-excel;charset=utf-8' }); // you can change the type
      const url= window.URL.createObjectURL(blob);
      var anchor = document.createElement("a");
      anchor.download = "Ordenes_"+new Date().getTime()+".xlsx";
      anchor.href = url;
      anchor.click();

    });

  }










}
