import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { observer } from 'mobx-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import HorizontalLayout from 'Components/HorizontalLayout';
import MapMarker from 'Components/MapMarker';
import { MapStore } from 'State/map';

mapboxgl.accessToken =
  'pk.eyJ1IjoidGltbXllcnMiLCJhIjoiY2phcm9uNHhsNGxyYzMzcGRpaWptMDV6ZCJ9.fI92wckRDkzqVEZipg6crQ';

interface MapProps {
  data: any;
}

interface MapState {
  ready: boolean;
}

export class Map extends React.Component<MapProps, MapState> {
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
      MapStore.viewboxLeft = bounds.getWest();
      MapStore.viewboxBottom = bounds.getSouth();
      MapStore.viewboxRight = bounds.getEast();
      MapStore.viewboxTop = bounds.getNorth();
    });
    this.map.on('move', () => {
      const bounds = this.map.getBounds();
      MapStore.viewboxLeft = bounds.getWest();
      MapStore.viewboxBottom = bounds.getSouth();
      MapStore.viewboxRight = bounds.getEast();
      MapStore.viewboxTop = bounds.getNorth();
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
        { ready && !this.props.data.loading &&
          this.props.data.allBreweries.map((brewery: any, i: number) => (
          <MapMarker key={brewery.id}
            lat={brewery.lat}
            lng={brewery.lng}
            visited={brewery.visited || false}
          />
        ))}
      </div>
    );
  }
}

const MapWithData = observer(graphql(gql`
  query {
    allBreweries {
      lat, lng, visited, id
    }
  }
`)(Map));

export default MapWithData;
