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
        if (brewery.lat > MapStore.viewbox.top) return false;
        if (brewery.lat < MapStore.viewbox.bottom) return false;
        if (brewery.lng > MapStore.viewbox.right) return false;
        if (brewery.lng < MapStore.viewbox.left) return false;
        return true;
      });
  }
}

export const BreweryStore = new BreweryState();
