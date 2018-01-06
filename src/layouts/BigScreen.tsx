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

const SearchHolder = styled.div`
  padding: 5px;
`;

const RightSide = styled(VerticalLayout)`
  width: 40%;
  justify-content: flex-start;
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
      <Route exact path={path} key={path} render={() => (
        <VerticalLayout full>
          <Header />
          <HorizontalLayout full>
            <Map />
            <RightSide>
              <SearchHolder>
                <BrewerySearch />
              </SearchHolder>
              <ListHolder>
                <BreweryList />
              </ListHolder>
            </RightSide>
          </HorizontalLayout>
        </VerticalLayout>
      )} />,
    );

    routes.push(<Route exact path="/admin" key="/admin" render={() => (
      <VerticalLayout full>
        <Header />
        <HorizontalLayout full>
          <AddBrewery />
        </HorizontalLayout>
      </VerticalLayout>
    )} />);

    return (routes);
  }
}

export default BigScreen;
