import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'brewmap.auth0.com',
    clientID: '_5lVzvQvik0YN4WNRX8RtryfrlqilC2Q',
    redirectUri: 'https://www.brewmap.co/callback',
    audience: 'https://brewmap.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid',
  });

  login() {
    this.auth0.authorize();
  }
}
