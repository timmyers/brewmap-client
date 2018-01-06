import { observable, computed } from 'mobx';
import { MapStore } from 'State/Map';

interface Brewery {
  id: string;
  name: string;
  lat: number;
  lng: number;
  visited: boolean;
}

class BreweryState {
  @observable breweries: Brewery[] = [];

  @computed get sortedBreweries() {
    return this.breweries.sort((a: Brewery, b: Brewery) => a.name.localeCompare(b.name));
  }

  @computed get breweriesInView() {
    return this.sortedBreweries
      .filter((brewery: any) => {
        return brewery.lat < MapStore.viewbox.top &&
               brewery.lat > MapStore.viewbox.bottom &&
               brewery.lng < MapStore.viewbox.right &&
               brewery.lng > MapStore.viewbox.left;
      });
  }
}

export const BreweryStore = new BreweryState();
