import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
//SERVICES
import { BeneficiarioService } from '../../services/beneficiario.service';
import { NotifyService } from "../../services/notify.service";
@Component({
  selector: 'habilitar-beneficiarios',
  templateUrl: 'habilitar-beneficiarios.component.html',
  providers: [ BeneficiarioService, NotifyService ]
})
export class HabilitarBeneficiariosComponent implements OnInit {
  actulizacionFrm: FormGroup;
  form = new FormData();
  constructor(private fb: FormBuilder, private beneficiarioService: BeneficiarioService, private notifyService: NotifyService) {
    this.buildActualizacionFrm();
  }

  ngOnInit() {}

  buildActualizacionFrm() {
    this.actulizacionFrm = this.fb.group({
      estado: ['', Validators.compose([Validators.required])],
      mes: ['', Validators.compose([Validators.required])],
      tipo: ['', Validators.compose([Validators.required])],
      file: [null, Validators.compose([Validators.required])]
    });
  }

  onFileChange(ev) {
    let img: any = ev.target;
    if (img.files.length > 0) {      
      this.form.append('file', img.files[0]);
      this.actulizacionFrm.controls['file'].setValue(img.files[0]);
    }
  }

  upload_formulario(){
    this.form.append('estado', this.actulizacionFrm.get('estado').value);
    this.form.append('mes', this.actulizacionFrm.get('mes').value);    
    this.form.append('tipo', this.actulizacionFrm.get('tipo').value);    
    this.beneficiarioService.update_beneficiarios_excel(this.form).subscribe(response =>{
      this.actulizacionFrm.reset();
      console.log(response);
      // this.notifyService.notify(response.status, response.icon, response.message);
    })
    this.actulizacionFrm.reset();
  }
}
