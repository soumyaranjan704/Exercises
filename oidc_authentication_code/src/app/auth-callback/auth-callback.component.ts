import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
//import { AuthService } from '../service/auth.service';
import { Constants } from '../constants';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {
  //private authService: AuthService = null;
 

  constructor(private authService: AuthService,  private router: Router) { 
//authService: AuthService
    //this.authService = authService;
  }

  ngOnInit() {
   // this.appComponent.completeAuthentication();
   console.log('inside auth callback')

    let lastUrl = sessionStorage.getItem('lastUrl');
    let urlToRedirect = lastUrl != null ? lastUrl : '/home';

    if (sessionStorage.getItem(Constants.OIDC.STAGE) != null && sessionStorage.getItem(Constants.OIDC.STAGE) == Constants.AUTHENTICATION_STAGES.COMPLETE_AUTHENTICATION) {
      this.router.navigate([urlToRedirect]);
    }
    else if (sessionStorage.getItem(Constants.OIDC.STAGE) != null && sessionStorage.getItem(Constants.OIDC.STAGE) == Constants.AUTHENTICATION_STAGES.SIGNED_OUT) {
      this.router.navigate(['sign-out']);
    }
    else if (sessionStorage.getItem(Constants.OIDC.STAGE) != null && sessionStorage.getItem(Constants.OIDC.STAGE) == Constants.AUTHENTICATION_STAGES.STARTED_AUTHENTICATION) {
      let completeAuthResult = this.authService.completeAuthentication();
      completeAuthResult.then((_x: any) => {

      });
    }

  }


 

}
