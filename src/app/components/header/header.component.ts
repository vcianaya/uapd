import { Component, OnInit } from '@angular/core';
//SERVICES
import { Router } from '@angular/router';
import { LogginService } from '../../authenticate/loggin.service';
import { AuthService } from '../../authenticate/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [LogginService, AuthService]
})
export class HeaderComponent implements OnInit {
  public loggedIn: boolean;
  user: any;
  constructor(
    private router: Router,
    private logginService: LogginService,
    private authService: AuthService
  ) {
    
  }
  ngOnInit() {
    this.authService.authStatus.subscribe(value=> this.loggedIn = value);
    this.user = this.logginService.getUser();
  }

  logout(event) {
    event.preventDefault();
    this.logginService.logout().subscribe(response=>{
    this.authService.changeAuthStatus(false);
    localStorage.clear();
    this.router.navigate(['login']);
   })
  }
}