import * as React from 'react';
import GoogleMap from 'google-map-react';

const defaultProps = {
  center: { lat: 39.710206, lng: -104.990482 },
  zoom: 11,
};

const Map = () => (
  <GoogleMap
    bootstrapURLKeys={{
      key: 'AIzaSyDk64oknr1zOjz-loIogxns15U1ZWV5luc',
    }}
    defaultCenter={defaultProps.center}
    defaultZoom={defaultProps.zoom}
  />
);

export default Map;
