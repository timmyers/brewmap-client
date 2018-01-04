import * as React from 'react';

import BeerMapMarkerImage from 'Images/beer_map_marker.svg';
import BeerMapMarkerVisitedImage from 'Images/beer_map_marker_visited.svg';

interface IconProps {
  children?: React.ReactNode;
  className?: string;
}

export const BeerMapMarker = (props : IconProps) => (
  <img src={BeerMapMarkerImage} {...props} />
);
export const BeerMapMarkerVisited = (props : IconProps) => (
  <img src={BeerMapMarkerVisitedImage} {...props} />
);
