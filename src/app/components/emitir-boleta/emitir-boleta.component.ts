import { Component, OnInit } from '@angular/core';
//SERVICES
import { BeneficiarioService } from '../../services/beneficiario.service';
import { NotifyService } from "../../services/notify.service";
declare var $: any;
@Component({
  selector: 'emitir-boleta',
  templateUrl: 'emitir-boleta.component.html',
  providers: [ BeneficiarioService, NotifyService ]
})
export class EmitirBoletaComponent implements OnInit {
  beneficiario:any;
  id_boleta:any;
  ci_beneficiario:any;
  constructor(private beneficiarioService: BeneficiarioService){

  }
  ngOnInit(){    
  }
  search(val){    
    if(val.length>0){      
      this.ci_beneficiario = val;
      this.beneficiario = null;
      this.beneficiarioService.buscar_beneficiario({ci:val}).subscribe(response=>{
        this.beneficiario = response.data[0];
      })
    }
  }

  confirmar_generar_boleta(mes, id_boleta){    
    this.id_boleta = id_boleta;
    $('#myModal').modal('show');
    $("#text-mes").text("Esta seguro de emitir la boleta de pago del mes de "+mes);
  }

  emitir_boleta(){
    $('#myModal').modal('hide')
    this.beneficiarioService.generar_boleta(this.id_boleta).subscribe(response=>{
      this.search(this.ci_beneficiario);
      var newWindow = window.open(response.url);
    })
  }
}