import * as React from 'react';
import styled from 'styled-components';
import GoogleMap from 'google-map-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { BeerMapMarker } from 'Components/Icons';

const defaultProps = {
  center: { lat: 39.710206, lng: -104.990482 },
  zoom: 11,
};

const Marker: any = styled(BeerMapMarker)`
  width: 40px;
  height: 40px;
  position: absolute;
  left: -20px;
  top: -40px;
`;

const Map = (props: any) => (
  <GoogleMap
    bootstrapURLKeys={{
      key: 'AIzaSyDk64oknr1zOjz-loIogxns15U1ZWV5luc',
    }}
    defaultCenter={defaultProps.center}
    defaultZoom={defaultProps.zoom}
  >
    {!props.data.loading && props.data.allBreweries.map((brewery: any, i: number) => (
      <Marker key={i}
        lat={brewery.lat}
        lng={brewery.lng}
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
