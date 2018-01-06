import * as React from 'react';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import { InteractionStore } from 'State/Interaction';

const BrewerySearch = () => (
  <TextField
    id="brewerySearch"
    label="Search for a brewery"
    fullWidth
    onChange={e => InteractionStore.brewerySearchString = e.target.value}
  />
);

export default BrewerySearch;
