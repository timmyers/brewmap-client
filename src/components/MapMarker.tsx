import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';
import { BeerMapMarker, BeerMapMarkerVisited } from 'Components/Icons';

const CustomMarker: any = styled(BeerMapMarker)`
  width: 40px;
  height: 40px;
  position: absolute;
  left: -20px;
  top: -40px;
`;

const CustomMarkerVisited: any = styled(BeerMapMarkerVisited)`
  width: 40px;
  height: 40px;
  position: absolute;
  left: -20px;
  top: -40px;
`;

interface MapMarkerProps {
  lat: number;
  lng: number;
  visited: boolean;
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
    if (el === null) return;

    this.markerContainer = el;
    this.marker = new mapboxgl.Marker(this.markerContainer)
      .setLngLat([this.props.lng, this.props.lat])
      .addTo(this.context.map);
  }

  render() {
    const { visited } = this.props;
    return (
      <div ref={(el: HTMLElement) => this.setMarkerContainer(el)}>
        {
          visited ?
            <CustomMarkerVisited />
          :
            <CustomMarker />
        }
      </div>
    );
  }
}

export default MapMarker;
