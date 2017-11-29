import auth0 from 'auth0-js';
import { client } from '../apollo';
import gql from 'graphql-tag';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'brewmap.auth0.com',
    clientID: '_5lVzvQvik0YN4WNRX8RtryfrlqilC2Q',
    redirectUri: 'https://www.brewmap.co/login',
    // redirectUri: 'http://localhost:9000/login',
    audience: 'https://www.brewmap.co',
    // audience: 'https://brewmap.auth0.com/userinfo',
    responseType: 'token',
    scope: 'openid email',
  });

  constructor() {
    this.auth0.parseHash((err, authResult) => {
      if (err) return console.error(err);
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        // displayAuthResults(authResult.accessToken);

        client.mutate({
          mutation: gql`
            mutation {
              authenticateUser(
                accessToken: "${authResult.accessToken}"
              ) {
                id
                token
              }
            }
          `,
        });
      }
      console.log(authResult);
    });

    this.login = this.login.bind(this);
    // this.logout = this.logout.bind(this);
    // this.handleAuthentication = this.handleAuthentication.bind(this);
    // this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  // handleAuthentication() {
  //   this.auth0.parseHash((err, authResult) => {
  //     if (authResult && authResult.accessToken && authResult.idToken) {
  //       this.setSession(authResult);
  //       // history.replace('/home');
  //     } else if (err) {
  //       // history.replace('/home');
  //       console.log(err);
  //     }
  //   });
  // }
  //
  // setSession(authResult) {
  //   // Set the time that the access token will expire at
  //   const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
  //   localStorage.setItem('access_token', authResult.accessToken);
  //   localStorage.setItem('id_token', authResult.idToken);
  //   localStorage.setItem('expires_at', expiresAt);
  //   // navigate to the home route
  //   history.replace('/home');
  // }
  //
  // logout() {
  //   // Clear access token and ID token from local storage
  //   localStorage.removeItem('access_token');
  //   localStorage.removeItem('id_token');
  //   localStorage.removeItem('expires_at');
  //   // navigate to the home route
  //   history.replace('/home');
  // }
  //
  // isAuthenticated() {
  //   // Check whether the current time is past the
  //   // access token's expiry time
  //   let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  //   return new Date().getTime() < expiresAt;
  // }


  login() {
    this.auth0.authorize();
  }
}
