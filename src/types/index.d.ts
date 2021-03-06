declare module '*.svg';
declare module '*.css';
declare module 'react-map-gl';
declare module 'fuzzy-search';
declare module 'material-ui-community-icons'
  
declare module 'jss';
declare module 'jss-preset-default';
declare module 'react-jss/lib/JssProvider';

declare var google: any;
declare var drift: any;

interface Brewery {
  name: string;
  locationName: string;
  website: string;
  id: string;
  visited: boolean;
  closed: boolean;
}