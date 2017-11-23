import * as React from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import VerticalLayout from 'Components/VerticalLayout';
import BreweryListItem from './BreweryListItem';

const Outer = styled(VerticalLayout)`
`;
const Inner = styled(VerticalLayout)`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  align-items: stretch;
`;

const BreweryList = (props: any) => (
  <Outer full scroll>
    <Inner>
      {!props.data.loading && props.data.allBreweries.map((brewery: any) => (
        <BreweryListItem brewery={brewery} />
      ))}
    </Inner>
  </Outer>
);

const ListWithData = graphql(gql`
  query {
    allBreweries {
      name, id
    }
  }
`)(BreweryList);

export default ListWithData;
