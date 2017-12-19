import { observable } from 'mobx';

class SearchState {
  @observable result: any;
}

export const searchStore = new SearchState();
