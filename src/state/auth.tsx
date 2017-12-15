import { observable } from 'mobx';

class AuthState {
  constructor() {
    this.loggedIn = false;
  }
  
  @observable loggedIn: boolean;
}

export const authStore = new AuthState();
