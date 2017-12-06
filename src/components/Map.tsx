import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// import mapboxglcss from 'mapbox-gl-css';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { BeerMapMarker } from 'Components/Icons';
import HorizontalLayout from 'Components/HorizontalLayout';

mapboxgl.accessToken =
  'pk.eyJ1IjoidGltbXllcnMiLCJhIjoiY2phcm9uNHhsNGxyYzMzcGRpaWptMDV6ZCJ9.fI92wckRDkzqVEZipg6crQ';

const CustomMarker: any = styled(BeerMapMarker)`
  width: 40px;
  height: 40px;
  position: absolute;
  left: -20px;
  top: -40px;
`;

interface MapMarkerProps {
  lat: number;
  lng: number;
}

class MapMarker extends React.Component<MapMarkerProps, {}> {
  markerContainer: HTMLElement;
  marker: mapboxgl.Marker;

  static contextTypes = {
    map: PropTypes.object,
  };

  componentWillUnmount() {
    this.marker.remove();
  }

  setMarkerContainer(el: HTMLElement) {
    this.markerContainer = el;
    this.marker = new mapboxgl.Marker(this.markerContainer)
      .setLngLat([this.props.lng, this.props.lat])
      .addTo(this.context.map);
  }

  render() {
    return (
      <div ref={(el: HTMLElement) => this.setMarkerContainer(el)}>
        <CustomMarker />
      </div>
    );
  }
}

interface MapProps {
  data: any;
}

interface MapState {
  ready: boolean;
}

class Map extends React.Component<MapProps, MapState> {
  map: mapboxgl.Map;
  mapContainer: Element;

  state: MapState = {
    ready: false,
  };

  static childContextTypes = {
    map: PropTypes.object,
  };

  getChildContext() {
    return {
      map: this.map,
    };
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [-104.990482, 39.710206],
      zoom: 10,
    });
    this.map.on('load', () => {
      this.setState({ ready: true });
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const { ready } = this.state;

    const style = {
      height: '100%',
      width: '100%',
    };

    return (
      <div style={style} ref={(el: any) => this.mapContainer = el}>
        { ready && !this.props.data.loading &&
          this.props.data.allBreweries.map((brewery: any, i: number) => (
          <MapMarker key={i}
            lat={brewery.lat}
            lng={brewery.lng}
          >
            <CustomMarker />
          </MapMarker>
        ))}
      </div>
    );
  }
}

const MapWithData = graphql(gql`
  query {
    allBreweries {
      lat, lng, id
    }
  }
`)(Map);

export default MapWithData;
