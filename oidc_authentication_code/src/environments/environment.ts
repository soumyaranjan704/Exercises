// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  redirect_to_login: true,
  version: "1.0.0",

  oidc_settings: {
    "authority": "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_iePaYk3wU/",
    "client_id": "60heaf1oc6mr4l21khcl66gd52",
    "response_type": "code",
    "scope": "openid profile email aws.cognito.signin.user.admin",
    "filterProtocolClaims": true,
    "loadUserInfo": true,
    "automaticSilentRenew": true,
    "includeIdTokenInSilentRenew": true,
    "revokeAccessTokenOnSignout": true,
    "validateAccessTokenFromServer": true,
    "create_user": true,
    "api_token": "d3d2af20-ecbc-4754-9490-5a5c5a72e04b",
    "pool_id": "us-east-2_iePaYk3wU",
    "is_username_equals_email": false
  },
  show_authentication:true
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

//ng serve --ssl --ssl-key c:\\temp\\localhost.key  --ssl-cert c:\\temp\\localhost.crt --port 4202

