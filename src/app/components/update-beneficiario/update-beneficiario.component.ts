import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
//SERVICES
import { BeneficiarioService } from '../../services/beneficiario.service';
import { NotifyService } from "../../services/notify.service";
@Component({
  selector: 'update-beneficiario',
  templateUrl: './update-beneficiario.component.html',
  styleUrls: ['./update-beneficiario.component.css'],
  providers: [BeneficiarioService, NotifyService]
})
export class UpdateBeneficiarioComponent implements OnInit {
  beneficiarioFrm: FormGroup;
  id_beneficiario:any;
  beneficiario:any ={};
  showPersona: boolean;
  zona: any;
  zonaSer: any;
  latitud: number;
  longitud:number;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private beneficiarioService : BeneficiarioService,private router: Router, private notifyService: NotifyService) {
    this.route.params.subscribe( params =>
      this.id_beneficiario = params.id
     );
     this.resetForm();
     this.buildBeneficiarioFrm();
  }

  ngOnInit() {}

  updateBeneficiario(){
    this.beneficiarioService.update_veneficiario(this.beneficiarioFrm.value).subscribe(response=>{
      this.notifyService.notify(response.status, 'fa fa-save', response.message);
    });
  }
  buildBeneficiarioFrm() {
    this.beneficiarioFrm = this.fb.group({
      id : '',
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

  marker(event) {
    this.beneficiarioFrm.controls['latitud'].setValue(event.coords.lat);
    this.beneficiarioFrm.controls['longitud'].setValue(event.coords.lng);
  }

  resetForm(){
    this.beneficiarioService.get_beneficiario(this.id_beneficiario).subscribe(response=>{
      this.beneficiario = response;
      this.onChangeDistrito(this.beneficiario.distrito);
      this.onChangeDistritoSer(this.beneficiario.distrito_ser);
      if (this.beneficiario.caso_ser) {
          this.showPersona = true;
      }
      this.beneficiarioFrm.patchValue({
        id: this.beneficiario.id,
        nombre:this.beneficiario.nombre,
        apellido:this.beneficiario.apellido,
        ci:this.beneficiario.ci,
        genero:this.beneficiario.sexo,
        fec_nac: this.beneficiario.fec_nac,
        lugar_nacimiento:this.beneficiario.lugar_nacimiento,
        domicilio:this.beneficiario.domicilio,
        distrito:this.beneficiario.distrito,
        zona:this.beneficiario.zona,
        estado_civil:this.beneficiario.estado_civil,
        grado_instruccion:this.beneficiario.grado_instruccion,
        ocupacion:this.beneficiario.ocupacion ,
        telefono:this.beneficiario.telefono,
        email:this.beneficiario.email,
        tipo_discapacidad:this.beneficiario.tipo_discapacidad,
        carnet_discapacidad:this.beneficiario.carnet_discapacidad,
        deficiencia:this.beneficiario.deficiencia,
        porcentaje_discapacidad:this.beneficiario.porcentaje_discapacidad,
        vence:this.beneficiario.vence,
        ayuda_tecnica:this.beneficiario.ayuda_tecnica,
        tipo_ayuda_tecnica:this.beneficiario.tipo_ayuda,
        otro_ayuda_tecnica:this.beneficiario.otro,
        tratamiento_rehabilitacion:this.beneficiario.tratamiento,
        tratamiento_descripcion:this.beneficiario.tratamiento_descripcion,
        vivienda:this.beneficiario.vivienda,
        vivienda_otro:this.beneficiario.vivienda_otro,
        caso_ser:this.beneficiario.caso_ser,
        nombre_ser:this.beneficiario.nombre_ser,
        apellido_ser:this.beneficiario.apellido_ser,
        ci_ser:this.beneficiario.ci_ser,
        genero_ser:this.beneficiario.sexo_ser,
        fec_nac_ser:this.beneficiario.fec_nac_ser,
        domicilio_ser:this.beneficiario.domicilio_ser,
        distrito_ser:this.beneficiario.distrito_ser,
        zona_ser:this.beneficiario.zona_ser,
        estado_civil_ser:this.beneficiario.estado_civil_ser,
        grado_instruccion_ser:this.beneficiario.grado_instruccion_ser,
        ocupacion_ser:this.beneficiario.ocupacion_ser,
        telefono_ser:this.beneficiario.telefono_ser,
        email_ser:this.beneficiario.email_ser,
        observaciones_ser:this.beneficiario.observaciones_ser,
        lugar:this.beneficiario.lugar,
        latitud:Number(this.beneficiario.latitud),
        longitud:Number(this.beneficiario.longitud)
      });
    })
  }

  cancelar(){
    this.router.navigate(['/list-beneficiarios']);
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
}
