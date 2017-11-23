import * as React from 'react';

import BeerMapMarkerImage from 'Images/beer_map_marker.svg';

interface IconProps {
  children?: React.ReactNode;
  className?: string;
}

export const BeerMapMarker = (props : IconProps) => (
  <img src={BeerMapMarkerImage} {...props} />
);
