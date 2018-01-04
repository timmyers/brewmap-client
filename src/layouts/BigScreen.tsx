import * as React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Map from 'Components/Map';
import BreweryList from 'Components/BreweryList';
import Header from 'Components/Header';
import VerticalLayout from 'Components/VerticalLayout';
import HorizontalLayout from 'Components/HorizontalLayout';
import AddBrewery from 'Components/AddBrewery';

const ListHolder = styled.div`
  width: 40%;
`;

class BigScreen extends React.Component {
  render () {
    return ([
      <Route exact path="/admin" key="/admin" render={() => (
        <VerticalLayout full>
          <Header />
          <HorizontalLayout full>
            <AddBrewery />
          </HorizontalLayout>
        </VerticalLayout>
      )} />,
      <Route exact path="/" key="/" render={() => (
        <VerticalLayout full>
          <Header />
          <HorizontalLayout full>
            <Map />
            <ListHolder>
              <BreweryList />
            </ListHolder>
          </HorizontalLayout>
        </VerticalLayout>
      )} />,
      <Route exact path="/login" key="/login" render={() => (
        <VerticalLayout full>
          <Header />
          <HorizontalLayout full>
            <Map />
            <ListHolder>
              <BreweryList />
            </ListHolder>
          </HorizontalLayout>
        </VerticalLayout>
      )} />,
    ]);
  }
}

export default BigScreen;
