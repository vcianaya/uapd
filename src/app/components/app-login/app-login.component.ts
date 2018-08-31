import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { LogginService } from '../../authenticate/loggin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../authenticate/auth.service';

//services

@Component({
  selector: 'app-login',
  templateUrl: 'app-login.component.html',
  styleUrls: ['app-login.component.css'],
  providers: [AuthService, LogginService]
})
export class AppLoginComponent implements OnInit {
  loginFrm: FormGroup;
  err: any;
  constructor(
    private logginService: LogginService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.buildLoginFrm();
  }
  ngOnInit() {
    
  }
  buildLoginFrm() {
    this.loginFrm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }
  login() {
    this.logginService.login(this.loginFrm.value).subscribe(
      response => {
        this.logginService.setToken(response);
        this.authService.changeAuthStatus(true);
        this.router.navigate(['/list-beneficiarios']);
      },
      (errorResponse: HttpErrorResponse) => {
        this.err = errorResponse.error;
      }
    )
  }
}

