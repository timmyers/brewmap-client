import React from 'react';
import PropTypes from 'prop-types';
import auth0 from 'auth0-js';
import { Route } from 'react-router-dom';
import { History } from 'history';
import gql from 'graphql-tag';
import { client } from '../apollo';
import { authStore } from 'State/auth';

class Auth {
  auth0 = new auth0.WebAuth({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    redirectUri: process.env.AUTH0_REDIRECT_URI,
    audience: process.env.AUTH0_AUDIENCE,
    responseType: 'token id_token',
    scope: 'openid profile',
  });
  userProfile : auth0.Auth0UserProfile;

  handleAuthentication(history: History) {
    console.log('handleAuthentication');
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        authStore.loggedIn = true;
        history.replace('/');
        console.log('refreshing query');
        client.query({
          query: gql`
            query {
              allBreweries {
                id, visited
              }
            }
          `,
          fetchPolicy: 'network-only',
        });
        this.getProfile();
      } else if (err) {
        history.replace('/');
        console.log(err);
      }
    });
  }

  setSession(authResult: any) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    // setTimeout(() => {
    //   console.log('RENEWING');
    //   this.renewToken();
    // },         5000);
  }

  logout() {
    authStore.loggedIn = false;
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    location.reload();
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  renewToken() {
    this.auth0.renewAuth(
      {
        audience: process.env.AUTH0_AUDIENCE,
        redirectUri: 'http://localhost:9000/silent',
        usePostMessage: true,
      },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          this.setSession(result);
        }
      },
    );
  }

  login() {
    this.auth0.authorize();
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile() {
    const accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
        console.log(profile);
      }
      // cb(err, profile);
    });
  }
}

const auth = new Auth();

export const login = () => auth.login();
export const logout = () => auth.logout();
export const isAuthenticated = () => auth.isAuthenticated();
export const getAccessToken = () => auth.getAccessToken();

const Login : React.SFC = ({}, context: { router: { history: History }}) => {
  console.log(context);
  auth.handleAuthentication(context.router.history);
  return (null);
};

Login.contextTypes = {
  router: PropTypes.object,
};

export default () => (
  <Route path="/login" component={Login} />
);
