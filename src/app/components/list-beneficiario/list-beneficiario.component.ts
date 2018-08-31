import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Router} from "@angular/router";
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}
@Component({
  selector: 'list-beneficiario',
  templateUrl: './list-beneficiario.component.html',
  styleUrls: ['./list-beneficiario.component.css']
})
export class ListBeneficiarioComponent implements OnInit {
  dtOptions: any = {};
  beneficiarios: any[];
  constructor(private http: HttpClient, private router: Router) {  }

  ngOnInit() {
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            'http://localhost/uapd2/public/api/victor',
            dataTablesParameters, {}
          ).subscribe(resp => {
            that.beneficiarios = resp.data;

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [
        { data: 'ci' },
        { data: 'nombre' },
        { data: 'fec_nac' },
        { data: 'carnet_discapacidad' },
        { data: 'tipo_discapacidad' },
        { data: 'vence' },
        { data: 'caso_ser' },
        { data: 'nombre_ser' },
      ],
      select: true
    };
  }

  actualizar_beneficiario(beneficiario){
     // this.router.navigate(['/update-beneficiario',{beneficiario: beneficiario}]);
  }
}
