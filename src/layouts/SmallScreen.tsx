import * as React from 'react';
import styled from 'styled-components';
import Map from 'Components/Map';
import BreweryList from 'Components/BreweryListSmallScreen';
import Header from 'Components/HeaderSmallScreen';
import VerticalLayout from 'Components/VerticalLayout';

const ListHolder = styled.div`
  height: 15%;
`;

const SmallScreen = () => (
  <VerticalLayout full>
    <Header />
    <VerticalLayout full>
      <Map />
      <ListHolder>
        <BreweryList />
      </ListHolder>
    </VerticalLayout>
  </VerticalLayout>
);

export default SmallScreen;
