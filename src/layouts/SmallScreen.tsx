import * as React from 'react';
import styled from 'styled-components';
import Map from 'Components/Map';
import BreweryList from 'Components/BreweryList';
import Header from 'Components/Header';
import VerticalLayout from 'Components/VerticalLayout';

const ListHolder = styled.div`
  height: 70%;
`;

const SmallScreen = () => (
  <VerticalLayout>
    <Header />
    <VerticalLayout>
      <ListHolder>
        <BreweryList />
      </ListHolder>
      <Map />
    </VerticalLayout>
  </VerticalLayout>
);

export default SmallScreen;
