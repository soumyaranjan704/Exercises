import { Component } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { InjectorInstance } from './app.module';
import { Constants } from './constants';
import { User, UserManager, UserManagerSettings } from 'oidc-client';
//import { AuthService } from 'src/app/services/auth.service';
//import { AppConstants } from './constants/Constants';
//import {AppInjector} from '../app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'Demo';
  //private authService:AuthService=null;

  private user: User = null;
  public manager: UserManager;

  constructor(private router: Router, private authService: AuthService = null) {
    let x = '';
    // const myService = InjectorInstance.get(AuthService);
    // this.authService = myService;
  }


  ngOnInit() {
    if (sessionStorage.getItem('STAGE') != null && sessionStorage.getItem('STAGE') == 'SIGNED_OUT') {

      console.log('this is sign out');
      // this.router.navigate(['sign-out']);
    }
    else {
      //If you disable 'show_authentication' it will not work in authenticated way.
      if (environment.show_authentication)
        this.authService.processLogin();
      else {
        this.router.navigate(['home-without-authentication'])
      }
    }
  }


}


