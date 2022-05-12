import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
//import { Router } from "@angular/router";

import { Constants } from "src/app/constants";
import { environment } from "src/environments/environment";
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    //[x: string]: any;

    private user: User = null;
    private manager: UserManager=null;
    constructor(
        private router: Router
    ) {


        if (this.manager != null) {

            this.manager.getUser().then(u => {
                this.user = u;
            });

            this.manager.events.addAccessTokenExpiring(x => {
                console.log('Acess token expiring event');
                // this.renewToken().then((_u: any) => {
                //     console.log('Acess token expiring event renew success');
                // });
            });
        }

    }

    refreshCallBack(): void {
        console.log("start refresh callback");
        this.manager.signinSilentCallback()
            .then(data => { console.log("success callback") })
            .catch(err => {
                console.log("err callback");
            });
        console.log("end refresh callback");
    };

    ngDoCheck() {
        if (sessionStorage.getItem(Constants.OIDC.OIDC_SETTINGS) != null) {
            if (this.manager == null)
                this.manager = new UserManager(getClientSettings());
        }
        // let environmentUrlsLength = environment.appBaseUrls.length;

        // if(this.allRoutes.length ==  environmentUrlsLength){
        //   this.populateMenu(this.allRoutes, MenuItem);
        // }
    };


    processLogin() {
        let isAppLoaded = sessionStorage.getItem(Constants.OIDC.IS_APP_LOADED);
        let stage = sessionStorage.getItem(Constants.OIDC.STAGE);
        //Start Authentication only once
        if (!(isAppLoaded != null && isAppLoaded == 'true')) {
            //Set the session for OIDC
            // if(environmentRef!=null && environmentRef[Constants.OIDC.OIDC_SETTINGS]!=null && sessionStorage.getItem(Constants.OIDC.OIDC_SETTINGS)==null){
            //   let json_oidc_settings = JSON.parse(environmentRef[Constants.OIDC.OIDC_SETTINGS]);
            //   sessionStorage.setItem(Constants.OIDC.OIDC_SETTINGS, json_oidc_settings);
            // }

            if (this.manager == null)
                this.manager = new UserManager(getClientSettings());

            this.startAuthentication();
            sessionStorage.setItem(Constants.OIDC.IS_APP_LOADED, 'true');
        }
        else if (stage != null && stage == Constants.AUTHENTICATION_STAGES.SIGNED_OUT) {
            // this.startAuthentication();
            // this.cookieService.deleteAll('/');
        }
    }


    completeAuthentication(): Promise<any> {
        if (this.manager == null)
            this.manager = new UserManager(getClientSettings());

        return this.manager.signinRedirectCallback().then(user => {
            this.user = user;
            sessionStorage.setItem(Constants.OIDC.STAGE, Constants.AUTHENTICATION_STAGES.COMPLETE_AUTHENTICATION); // 'AUTH-COMPLETE');
            console.log("5" + Constants.OIDC.STAGE);
            sessionStorage.setItem('expires_at', this.user.expires_at.toString());
            //After the Authentication, please call the app routing's populate routes
            if (sessionStorage.getItem(Constants.GENERAL.ROUTED_ADDED) == null || (sessionStorage.getItem(Constants.GENERAL.ROUTED_ADDED) != null && sessionStorage.getItem(Constants.GENERAL.ROUTED_ADDED) != 'true')) {
              //  this.initiateRoutes();
                sessionStorage.setItem(Constants.GENERAL.ROUTED_ADDED, 'true');
            }
            let lastUrl = sessionStorage.getItem('lastUrl');
            let urlToRedirect = lastUrl != null ? lastUrl : '/home';
            this.router.navigate([urlToRedirect]);
        });

        //environment.oidc_settings
    }

    initiateRoutes() {
        throw new Error("Method not implemented.");
    }

    startAuthentication() //: Promise<any> 
    {
        if (this.manager == null)
            this.manager = new UserManager(getClientSettings());
        let startAuthentication = this.manager.signinRedirect();
        startAuthentication.then(data => {
            sessionStorage.setItem(Constants.OIDC.STAGE, Constants.AUTHENTICATION_STAGES.STARTED_AUTHENTICATION);
            console.log("5", Constants.OIDC.STAGE);
        });
    }


    isLoggedIn(): boolean {
        return this.user != null && !this.user.expired;
      }

    getToken(tokenType: string = 'access_token') {
        let token = '';


        let userManagerSettings = sessionStorage.getItem(Constants.OIDC.OIDC_SETTINGS) != null ? JSON.parse(sessionStorage.getItem(Constants.OIDC.OIDC_SETTINGS) as string) : null;
        let user_specific_info = (userManagerSettings != null) ? (userManagerSettings.authority + ':' + userManagerSettings.client_id) : '';
        let oidc_token = sessionStorage.getItem('oidc.user:' + user_specific_info);
        if (oidc_token != null) {
            let oidc_token_object = JSON.parse(oidc_token);
            token = oidc_token_object[tokenType];
        }
        return token;
    }


}

// export function getClientSettings(): UserManagerSettings {

//     let oidc_settings: UserManagerSettings = {};
//     let oidc_settings_temp = environment.oidc_settings;



//     return oidc_settings;
// }


export function getClientSettings(): UserManagerSettings {

    let oidc_settings: UserManagerSettings = {};
    let oidc_settings_temp = environment.oidc_settings;
    //let parsed_object_oidc = oidc_settings_temp!=null? JSON.parse(oidc_settings_temp);
    //let json_temp_oidc
    oidc_settings_temp['redirect_uri'] = window.location.protocol + '//' + window.location.host + '/' + 'auth-callback';
    oidc_settings_temp['post_logout_redirect_uri'] = window.location.protocol + '//' + window.location.host;
    oidc_settings_temp['silent_redirect_uri'] = window.location.protocol + '//' + window.location.host + '/silent-refresh.html';
    oidc_settings_temp['automaticSilentRenew'] = true;
    oidc_settings_temp['silentRequestTimeout'] = 10000;

    oidc_settings = oidc_settings_temp as UserManagerSettings;



    return oidc_settings;
}
