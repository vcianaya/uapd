import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { GLOBAL } from "./global";
@Injectable()
export class BeneficiarioService {
  url: string;
  constructor(private httpClient: HttpClient) {
    this.url = GLOBAL.url;
  }

  get_zona(distrito): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    // .set('Authorization', "Bearer "+this.getToken());
    return this.httpClient.get(this.url + 'get_zona/' + distrito, { headers: headers });
  }

  get_beneficiario(id_beneficiario): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    // .set('Authorization', "Bearer "+this.getToken());
    return this.httpClient.get(this.url + 'get_beneficiario/' + id_beneficiario, { headers: headers });
  }

  save_beneficiario(beneficiario): Observable<any> {
        let params = JSON.stringify(beneficiario);
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
            // .set('Authorization', "Bearer "+this.getToken());
        return this.httpClient.post(this.url+'save_beneficiario', params, { headers: headers });
  }

  update_veneficiario(beneficiario): Observable<any> {
    let params = JSON.stringify(beneficiario);
    let headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
        // .set('Authorization', "Bearer "+this.getToken());
    return this.httpClient.post(this.url+'update_beneficiario', params, { headers: headers });
  }

  buscar_beneficiario(ci_beneficiario): Observable<any> {
    let params = JSON.stringify(ci_beneficiario);
    let headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
        // .set('Authorization', "Bearer "+this.getToken());
    return this.httpClient.post(this.url+'buscar_beneficiario', params, { headers: headers });
  }

  generar_boleta(id_mes): Observable<any> {
    let params = JSON.stringify({id_mes: id_mes});
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')      
    // .set('Authorization', "Bearer "+this.getToken());
    return this.httpClient.post(this.url + 'generar_boleta', params, { headers: headers });
  }

  //ACTUALIZACION MASIVA
  update_beneficiarios_excel(formulario:any): Observable<any> {
    // let params = JSON.stringify(formulario);
    // let headers = new HttpHeaders()
      // .set('Content-Type', 'application/json');
    // .set('Authorization', "Bearer "+this.getToken());
    // console.log(params);
    
    return this.httpClient.post(this.url + 'actualizacion_masiva', formulario);
  }
}
