import { observable } from 'mobx';

class InteractionState {
  @observable hoveredBreweryId: string;
  @observable brewerySearchString: string = '';
}

export const InteractionStore = new InteractionState();
