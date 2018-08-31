import { Component, OnInit } from '@angular/core';
import { BoletaService } from '../../services/boleta.service';
import * as moment from 'moment';
@Component({
  selector: 'buscar-boleta',
  templateUrl: 'buscar-boleta.component.html',
  styleUrls: ['buscar-boleta.component.css'],
  providers:[BoletaService] 
})

export class BuscarBoletaComponent implements OnInit {
  boleta:any;
  constructor(private boletaService: BoletaService) { 
    moment.locale('es');
  }

  ngOnInit() { }
  search(val) {
    if (val.length > 0) {
      this.boletaService.get_boleta(val).subscribe(response => {
        this.boleta = response.boleta;
        if (this.boleta) {
          this.boleta.mes = moment(this.boleta.mes, 'M').format('MMMM');;
        }
      }, error => {
        this.boleta = null;
      })
    }
  }
}