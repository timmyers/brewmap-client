import * as React from 'react';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import { InteractionStore } from 'State/Interaction';

const Holder = styled.div`
  margin: 0px 0px 5px 0px;
  padding: 10px;
  background-color: #eee;
  box-shadow: 
    0px 1px 5px 0px rgba(0, 0, 0, 0.2), 
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 
    0px 3px 1px -2px rgba(0, 0, 0, 0.12);
`;

const BrewerySearch = () => (
  <Holder>
    <TextField
      id="brewerySearch"
      label="Search for a brewery"
      fullWidth
      onChange={e => InteractionStore.brewerySearchString = e.target.value}
    />
  </Holder>
);

export default BrewerySearch;
