import { Component, OnInit } from '@angular/core';
import { BoletaService } from '../../services/boleta.service';
import { MesesPipe } from '../../pipes/meses.pipe';
import * as moment from 'moment';
import { Subject } from 'rxjs';
declare var $: any;
@Component({
  selector: 'eliminar-boleta',
  templateUrl: 'eliminar-boleta.component.html',
  styleUrls: ['eliminar-boleta.component.css'],
  providers: [BoletaService],
})

export class EliminarBoletaComponent implements OnInit {
  boleta: any;
  motivo: string;
  boletas_eliminadas: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();
  constructor(private boletaService: BoletaService) {
    moment.locale('es');
    this.motivo = "";
    this.boletaService.get_boletas_eliminadas().subscribe(response=>{
      this.boletas_eliminadas = response;
      this.dtTrigger.next();
    })
  }

  ngOnInit() {
  }

  search(val) {
    this.motivo = "";
    if (val.length > 0) {
      this.boletaService.get_boleta(val).subscribe(response => {
        this.boleta = response.boleta;
        if (this.boleta) {
          this.boleta.mes = moment(this.boleta.mes, 'M').format('MMMM'); ;
        }
      },error =>{
        this.boleta = null;
      })
    }
  }

  confirmar_eliminar_boleta() {
    $('#myModal').modal('show');
    $("#text-mes").text("Esta seguro de emitir la boleta Nro. " + this.boleta.id_boleta + " del mes de "+ this.boleta.mes);
  }

  eliminar_boleta(){
    this.boleta.observacion = this.motivo;
    this.boletaService.eliminar_boleta(this.boleta).subscribe(response=>{
      this.boletaService.get_boletas_eliminadas().subscribe(response => {
        this.boleta = null;
        $('#boleta_anuladas_table').DataTable().destroy();
        this.boletas_eliminadas = response;
        this.dtTrigger.next();
        $('#myModal').modal('hide');
      })
    })
  }
}