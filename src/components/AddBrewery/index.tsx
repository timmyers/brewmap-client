import * as React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Button, { ButtonProps } from 'material-ui/Button';
import VerticalLayout from 'Components/VerticalLayout';
import HorizontalLayout from 'Components/HorizontalLayout';
import { searchStore } from './state';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import { Map } from 'Components/Map';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const autocompleteService = new google.maps.places.AutocompleteService();
const placesService = new google.maps.places.PlacesService(document.createElement('div'));

const searchForPlaces = (searchString: any) => {
  autocompleteService.getPlacePredictions(
    { input: searchString },
    (predictions: any, autocompleteStatus: any) => {
      if (autocompleteStatus === google.maps.places.PlacesServiceStatus.OK) {
        placesService.getDetails(
          { placeId: predictions[0].place_id },
          (place: any, detailsStatus: any) => {
            if (detailsStatus === google.maps.places.PlacesServiceStatus.OK) {
              searchStore.result = place;
            }
          });
      }
    });
};

const onFieldChange = (newValue: string) => {
  searchForPlaces(newValue);
};

const SearchForm = () => (
  <TextField style={{ width: '300px' }}
    onChange={e => onFieldChange(e.target.value)}
  />
);

const SearchResult = ({ result, mutate }: {result: any, mutate: any}) => {
  const lat = result && result.geometry.location.lat();
  const lng = result && result.geometry.location.lng();
  const name = result && result.name;

  const handleSubmit = () => {
    mutate({
      variables: {
        name,
        lat,
        lng,
      },
    });
  };

  const allBreweries = result ?
  [{
    lat,
    lng,
    name,
    id: 0,
  }] : [];

  const data = {
    allBreweries,
    loading: false,
  };

  return (
    <HorizontalLayout full>
      <Paper style={{ width: '300px', height: '400px' }}>
        {result &&
          <VerticalLayout full>
            <div key={result.name}>
              <TextField defaultValue={result.name} />
            </div>
            <TextField value={lat} />
            <TextField value={lng} />
            <Button raised onClick={handleSubmit}>
              submit
            </Button>
          </VerticalLayout>
        }
      </Paper>
      <Map data={data} />
    </HorizontalLayout>
  );
};

const SearchResultWithData = observer((props: any) => (
  <SearchResult {...props} result={searchStore.result} />
));

const SearchResultQL = graphql(gql`
  mutation addBrewery($name: String!, $lat: Float!, $lng: Float!) {
    addBrewery(name: $name, lat: $lat, lng: $lng) {
      id, name, lat, lng
    }
  }
`)(SearchResultWithData);

export default () => (
  <VerticalLayout full>
    <SearchForm />
    <SearchResultQL />
  </VerticalLayout>
);
