import { client } from '../apollo';
import { BreweryStore } from 'State/Brewery';
import gql from 'graphql-tag';

const query = gql`
  query {
    allBreweries {
      id,
      name,
      lat,
      lng,
      closed,
      visited
    }
  }
`;

const observableQuery =
  client.watchQuery({
    query,
  });

console.log(observableQuery);
observableQuery.subscribe({
  next: ({ data }: { data: any }) => {
    BreweryStore.breweries = data.allBreweries;
  },
});
