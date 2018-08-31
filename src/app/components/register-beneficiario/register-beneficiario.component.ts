import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { BeneficiarioService } from '../../services/beneficiario.service';
import { NotifyService } from "../../services/notify.service";
//services

@Component({
  selector: 'app-register-beneficiario',
  templateUrl: './register-beneficiario.component.html',
  styleUrls: ['./register-beneficiario.component.css'],
  providers:[ BeneficiarioService, NotifyService ]
})
export class RegisterBeneficiarioComponent implements OnInit {
  beneficiarioFrm: FormGroup;
  showPersona: boolean;
  zona: any;
  zonaSer: any;

  constructor(private fb: FormBuilder, private beneficiarioService: BeneficiarioService, private notifyService: NotifyService) {
    this.buildBeneficiarioFrm();
  }

  ngOnInit() {
  }

  onChangeDistrito(distrito){
    this.beneficiarioService.get_zona(distrito).subscribe(response=>{
        this.zona = response;
    })
  }

  onChangeDistritoSer(distrito){
    this.beneficiarioService.get_zona(distrito).subscribe(response=>{
        this.zonaSer = response;
    })
  }

  buildBeneficiarioFrm() {
    this.beneficiarioFrm = this.fb.group({
      nombre: ['', Validators.compose([Validators.required])],
      apellido: ['', Validators.compose([Validators.required])],
      ci: ['', Validators.compose([Validators.required])],
      genero: ['', Validators.compose([Validators.required])],
      fec_nac: ['', Validators.compose([Validators.required])],
      lugar_nacimiento: '',
      domicilio: '',
      distrito: ['', Validators.compose([Validators.required])],
      zona: '',
      estado_civil: ['', Validators.compose([Validators.required])],
      grado_instruccion: ['', Validators.compose([Validators.required])],
      ocupacion: '',
      telefono: '',
      email: '',
      tipo_discapacidad: ['', Validators.compose([Validators.required])],
      carnet_discapacidad: ['', Validators.compose([Validators.required])],
      deficiencia: '',
      porcentaje_discapacidad: '',
      vence: '',
      ayuda_tecnica: ['', Validators.compose([Validators.required])],
      tipo_ayuda_tecnica: '',
      otro_ayuda_tecnica: '',
      tratamiento_rehabilitacion: '',
      tratamiento_descripcion: '',
      vivienda: ['', Validators.compose([Validators.required])],
      vivienda_otro: '',
      caso_ser: '',
      nombre_ser: '',
      apellido_ser: '',
      ci_ser: '',
      genero_ser: '',
      fec_nac_ser: '',
      domicilio_ser: '',
      distrito_ser: '',
      zona_ser: '',
      estado_civil_ser: '',
      grado_instruccion_ser: '',
      ocupacion_ser: '',
      telefono_ser: '',
      email_ser: '',
      observaciones_ser: '',
      lugar: '',
      latitud: '',
      longitud: ''
    });
  }

  caso_ser_change(event) {
    if (this.beneficiarioFrm.value.caso_ser === 'Ninguno') {
      this.showPersona = false;
      this.beneficiarioFrm.controls['caso_ser'].reset()
      this.beneficiarioFrm.controls['caso_ser'].clearValidators()
      this.beneficiarioFrm.controls['nombre_ser'].reset()
      this.beneficiarioFrm.controls['nombre_ser'].clearValidators()
      this.beneficiarioFrm.controls['nombre_ser'].updateValueAndValidity()
      this.beneficiarioFrm.controls['apellido_ser'].reset()
      this.beneficiarioFrm.controls['apellido_ser'].clearValidators()
      this.beneficiarioFrm.controls['apellido_ser'].updateValueAndValidity()
      this.beneficiarioFrm.controls['ci_ser'].reset()
      this.beneficiarioFrm.controls['ci_ser'].clearValidators()
      this.beneficiarioFrm.controls['ci_ser'].updateValueAndValidity()
      this.beneficiarioFrm.controls['genero_ser'].reset()
      this.beneficiarioFrm.controls['genero_ser'].clearValidators()
      this.beneficiarioFrm.controls['genero_ser'].updateValueAndValidity()
    } else {
      this.showPersona = true;
      this.beneficiarioFrm.controls['nombre_ser'].setValidators([Validators.required])
      this.beneficiarioFrm.controls['nombre_ser'].updateValueAndValidity()
      this.beneficiarioFrm.controls['apellido_ser'].setValidators([Validators.required])
      this.beneficiarioFrm.controls['apellido_ser'].updateValueAndValidity()
      this.beneficiarioFrm.controls['ci_ser'].setValidators([Validators.required])
      this.beneficiarioFrm.controls['ci_ser'].updateValueAndValidity()
      this.beneficiarioFrm.controls['genero_ser'].setValidators([Validators.required])
      this.beneficiarioFrm.controls['genero_ser'].updateValueAndValidity()
    }
  }

  marker(event) {
    this.beneficiarioFrm.value.latitud = event.coords.lat;
    this.beneficiarioFrm.value.longitud = event.coords.lng;
  }

  saveBeneficiario() {
    this.beneficiarioService.save_beneficiario(this.beneficiarioFrm.value).subscribe(response=>{
      this.notifyService.notify(response.status, 'fa fa-save', response.message);
      this.beneficiarioFrm.reset();
    })
  }
}
