import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';
import { BeerMapMarker, BeerMapMarkerVisited } from 'Components/Icons';
import { InteractionStore } from 'State/Interaction';

interface MarkerProps {
  hovered: boolean;
}

const CustomMarker: any = styled(BeerMapMarker)`
  width: ${(props: MarkerProps) => props.hovered ? '50px' : '40px'};
  height: ${(props: MarkerProps) => props.hovered ? '50px' : '40px'};
  position: absolute;
  left: ${(props: MarkerProps) => props.hovered ? '-25px' : '-20px'};
  top: ${(props: MarkerProps) => props.hovered ? '-50px' : '-40px'};
`;

const CustomMarkerVisited: any = styled(BeerMapMarkerVisited)`
  width: ${(props: MarkerProps) => props.hovered ? '50px' : '40px'};
  height: ${(props: MarkerProps) => props.hovered ? '50px' : '40px'};
  position: absolute;
  left: ${(props: MarkerProps) => props.hovered ? '-25px' : '-20px'};
  top: ${(props: MarkerProps) => props.hovered ? '-50px' : '-40px'};
`;

interface MapMarkerProps {
  lat: number;
  lng: number;
  visited: boolean;
  breweryId: string;
  hovered: boolean;
}

class MapMarker extends React.Component<MapMarkerProps, {}> {
  markerContainer: HTMLElement;
  marker: mapboxgl.Marker;

  static contextTypes = {
    map: PropTypes.object,
  };

  shouldComponentUpdate(nextProps: MapMarkerProps) {
    return nextProps.visited !== this.props.visited ||
           nextProps.hovered !== this.props.hovered;
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
    const { visited, hovered } = this.props;
    return (
      <div
        ref={(el: HTMLElement) => this.setMarkerContainer(el)}
        onMouseEnter={() => this.onMouseEnter()}
        onMouseLeave={() => this.onMouseLeave()}
      >
        {
          visited ?
            <CustomMarkerVisited hovered={hovered} />
          :
            <CustomMarker hovered={hovered} />
        }
      </div>
    );
  }
}

export default MapMarker;
