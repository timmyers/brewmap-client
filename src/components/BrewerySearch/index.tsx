import * as React from 'react';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import { InteractionStore } from 'State/Interaction';

const Holder = styled.div`
  margin: 5px 0px;
  padding: 10px;
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
