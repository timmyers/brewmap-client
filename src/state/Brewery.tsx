import { observable, computed, toJS } from 'mobx';
import FuzzySearch from 'fuzzy-search';
import { MapStore } from 'State/Map';
import { InteractionStore } from 'State/Interaction';

interface Brewery {
  id: string;
  name: string;
  lat: number;
  lng: number;
  visited: boolean;
}

export class BreweryState {
  @observable breweries: Brewery[] = [];

  @computed get sortedBreweries() {
    return this.breweries.sort((a: Brewery, b: Brewery) => a.name.localeCompare(b.name));
  }

  @computed get breweriesMatchingSearch() {
    if (!this.sortedBreweries.length ||
        !InteractionStore.brewerySearchString.length) {
      return [];
    }

    const searcher = new FuzzySearch(
      this.sortedBreweries,
      ['name'],
      {},
    );

    const result = searcher.search(InteractionStore.brewerySearchString);
    console.log(result);
    return result;
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

  @computed get visitedBreweries() {
    return this.breweries
      .filter(brewery => brewery.visited);
  }
}

export const BreweryStore = new BreweryState();
