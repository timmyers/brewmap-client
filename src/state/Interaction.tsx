import { observable } from 'mobx';

class InteractionState {
  @observable hoveredBreweryId: number;
}

export const InteractionStore = new InteractionState();
