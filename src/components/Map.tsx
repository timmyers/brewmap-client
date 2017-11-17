import * as React from 'react';
import GoogleMapReact from 'google-map-react';

const defaultProps = {
  center: { lat: 39.710206, lng: -104.990482 },
  zoom: 11,
};

const Map = () => (
  <GoogleMapReact
    defaultCenter={defaultProps.center}
    defaultZoom={defaultProps.zoom}
  />
);

export default Map;
