import * as React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Map from 'Components/Map';
import BreweryList from 'Components/BreweryList';
import Header from 'Components/Header';
import VerticalLayout from 'Components/VerticalLayout';
import BrewerySearch from 'Components/BrewerySearch';
import Profile from 'Components/Profile';

const ListHolder = styled.div`
  height: 20%;
  background-color: #f8f8f8;
`;

const SmallScreen = () => {
  const routes = ['/', '/login'].map(path =>
    <Route exact path={path} key={path} render={() => (
      <VerticalLayout full>
        <Map />
        <BrewerySearch />
        <ListHolder>
          <BreweryList vertical={false} />
        </ListHolder>
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
