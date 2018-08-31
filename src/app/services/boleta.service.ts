import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { GLOBAL } from "./global";

@Injectable()
export class BoletaService {

  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = GLOBAL.url;
  }

  get_boleta(id_boleta): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.httpClient.get(this.url + 'buscar_boleta/' + id_boleta, { headers: headers });
  }

  eliminar_boleta(boleta): Observable<any> {
    let params = JSON.stringify(boleta);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.httpClient.post(this.url + 'eliminar_boleta', params, { headers: headers });
  }

  get_boletas_eliminadas(): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.httpClient.get(this.url + 'get_boletas_eliminadas', { headers: headers });
  }
}