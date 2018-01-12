import * as React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Map from 'Components/Map';
import BreweryList from 'Components/BreweryListSmallScreen';
import Header from 'Components/Header';
import VerticalLayout from 'Components/VerticalLayout';
import Profile from 'Components/Profile';

const ListHolder = styled.div`
  height: 15%;
`;

const SmallScreen = () => {
  const routes = ['/', '/login'].map(path =>
    <Route exact path={path} key={path} render={() => (
      <VerticalLayout full>
        <ListHolder>
          <BreweryList />
        </ListHolder>
        <Map />
      </VerticalLayout>
    )} />,
  );

  routes.push(
    <Route exact path="/profile" key="/profile" render={() => (
      <Profile />
    )} />,
  );

  return (
    <VerticalLayout full>
      <Header />
      { routes }
    </VerticalLayout>
  );
};

export default SmallScreen;
