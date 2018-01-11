import * as React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Map from 'Components/Map';
import BreweryList from 'Components/BreweryList';
import BrewerySearch from 'Components/BrewerySearch';
import Header from 'Components/Header';
import VerticalLayout from 'Components/VerticalLayout';
import HorizontalLayout from 'Components/HorizontalLayout';
import AddBrewery from 'Components/AddBrewery';
import Profile from 'Components/Profile';

const RightSide = styled(VerticalLayout)`
  height: 100%;
  width: 400px;
  justify-content: flex-start;
  background-color: #f8f8f8;
`;

const ListHolder = styled.div`
  width: 100%;
  position: relative;
  flex-grow: 1;
`;

const Placeholder = styled.div`
  background-color: red;
  flex-grow: 1;
  width: 100%;
`;

class BigScreen extends React.Component {
  render () {
    const routes = ['/', '/login'].map(path =>
      <Route exact path={path} key={path} render={() => ([
        <Map />,
        <RightSide>
          <BrewerySearch />
          <ListHolder>
            <BreweryList />
          </ListHolder>
        </RightSide>,
      ])} />,
    );

    routes.push(
      <Route exact path="/admin" key="/admin" render={() => (
        <AddBrewery />
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
        <HorizontalLayout full>
          { routes }
        </HorizontalLayout>
      </VerticalLayout>
    );
  }
}

export default BigScreen;
