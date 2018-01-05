import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';
import { BeerMapMarker, BeerMapMarkerVisited } from 'Components/Icons';
import { InteractionStore } from 'State/Interaction';

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
  breweryId: number;
}

class MapMarker extends React.Component<MapMarkerProps, {}> {
  markerContainer: HTMLElement;
  marker: mapboxgl.Marker;

  static contextTypes = {
    map: PropTypes.object,
  };

  shouldComponentUpdate(nextProps: MapMarkerProps) {
    if (nextProps.visited !== this.props.visited) {
      return true;
    }
    return false;
  }

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

  onMouseEnter() {
    InteractionStore.hoveredBreweryId = this.props.breweryId;
  }
  onMouseLeave() {
    InteractionStore.hoveredBreweryId = null;
  }

  render() {
    const { visited } = this.props;
    return (
      <div
        ref={(el: HTMLElement) => this.setMarkerContainer(el)}
        onMouseEnter={() => this.onMouseEnter()}
        onMouseLeave={() => this.onMouseLeave()}
      >
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
