import * as React from 'react';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import { InteractionStore } from 'State/Interaction';
import { isPhone } from 'Layouts/Detect';

const Holder = styled.div`
  padding: ${isPhone() ? '5px 10px' : '10px'};
  background-color: #eee;
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
