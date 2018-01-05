import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { observer } from 'mobx-react';
import HorizontalLayout from 'Components/HorizontalLayout';
import MapMarker from 'Components/MapMarker';
import { MapStore } from 'State/Map';
import { BreweryStore } from 'State/Brewery';

mapboxgl.accessToken =
  'pk.eyJ1IjoidGltbXllcnMiLCJhIjoiY2phcm9uNHhsNGxyYzMzcGRpaWptMDV6ZCJ9.fI92wckRDkzqVEZipg6crQ';

interface MapProps {
  breweryStore: any;
}

interface MapState {
  ready: boolean;
}

@observer export class Map extends React.Component<MapProps, MapState> {
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
      const bounds = this.map.getBounds();
      MapStore.viewbox = {
        left: bounds.getWest(),
        bottom: bounds.getSouth(),
        right: bounds.getEast(),
        top: bounds.getNorth(),
      };
    });
    this.map.on('move', () => {
      const bounds = this.map.getBounds();
      MapStore.viewbox = {
        left: bounds.getWest(),
        bottom: bounds.getSouth(),
        right: bounds.getEast(),
        top: bounds.getNorth(),
      };
    });
  }

  componentDidUpdate() {
    this.map.resize();
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
        { ready &&
          this.props.breweryStore.sortedBreweries.map((brewery: any, i: number) => (
          <MapMarker key={brewery.id}
            lat={brewery.lat}
            lng={brewery.lng}
            visited={brewery.visited || false}
            breweryId={brewery.id}
          />
        ))}
      </div>
    );
  }
}

const MapWithData = () => (
  <Map breweryStore={BreweryStore} />
);

export default MapWithData;
