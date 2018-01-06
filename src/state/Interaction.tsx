import { observable } from 'mobx';

class InteractionState {
  @observable hoveredBreweryId: string;
}

export const InteractionStore = new InteractionState();
