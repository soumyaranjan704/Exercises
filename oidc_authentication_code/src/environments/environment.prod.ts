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
  }
};