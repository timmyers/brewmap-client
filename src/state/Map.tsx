import { observable } from 'mobx';

class MapState {
  @observable viewboxTop: number;
  @observable viewboxBottom: number;
  @observable viewboxLeft: number;
  @observable viewboxRight: number;
}

export const MapStore = new MapState();
