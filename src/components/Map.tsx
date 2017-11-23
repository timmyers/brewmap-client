import * as React from 'react';
import GoogleMap from 'google-map-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { BeerMapMarker } from 'Components/Icons';

const defaultProps = {
  center: { lat: 39.710206, lng: -104.990482 },
  zoom: 11,
};

const Marker = (props: any) => (
  <BeerMapMarker width={60} height={60}/>
);

const Map = (props: any) => (
  <GoogleMap
    bootstrapURLKeys={{
      key: 'AIzaSyDk64oknr1zOjz-loIogxns15U1ZWV5luc',
    }}
    defaultCenter={defaultProps.center}
    defaultZoom={defaultProps.zoom}
  >
    {!props.data.loading && props.data.allBreweries.map((brewery: any) => (
      <Marker
        lat={brewery.lat}
        lng={brewery.lng}
        src="https://image.flaticon.com/icons/svg/33/33622.svg"
      />
    ))}
  </GoogleMap>
);

const MapWithData = graphql(gql`
  query {
    allBreweries {
      lat, lng, id
    }
  }
`)(Map);

export default MapWithData;
