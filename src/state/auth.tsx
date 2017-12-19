import { observable } from 'mobx';

class AuthState {
  constructor() {
    this.loggedIn = false;
  }

  @observable loggedIn: boolean;
  @observable sub: string;
}

export const authStore = new AuthState();
