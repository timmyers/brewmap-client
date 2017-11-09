import React from 'react';
import styled from 'styled-components';
import Map from 'Components/Map';
import BreweryList from 'Components/BreweryList';
import Header from 'Components/Header';
import VerticalLayout from 'Components/VerticalLayout';
import HorizontalLayout from 'Components/HorizontalLayout';

const ListHolder = styled.div`
  width: 40%;
`;

const BigScreen = () => (
  <VerticalLayout>
    <Header />
    <HorizontalLayout>
      <Map />
      <ListHolder>
        <BreweryList />
      </ListHolder>
    </HorizontalLayout>
  </VerticalLayout>
);

export default BigScreen;
