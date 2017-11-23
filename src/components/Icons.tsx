import * as React from 'react';

import BeerMapMarkerImage from 'Images/beer_map_marker.svg';

interface IconProps {
  width?: number;
  height?: number;
}

export const BeerMapMarker = (props : IconProps) => (
  <img src={BeerMapMarkerImage} {...props} />
);
