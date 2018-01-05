import * as React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import VerticalLayout from 'Components/VerticalLayout';
import { MapStore } from 'State/Map';
import { InteractionStore } from 'State/Interaction';
import BreweryListItemTyped from './BreweryListItem';

const BreweryListItem = BreweryListItemTyped as any;

const Outer = styled(VerticalLayout)`
  position: absolute;
`;
const Inner = styled(VerticalLayout)`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  align-items: stretch;
`;

const BreweryList = observer((props: any) => {
  const breweries = props.data.loading ? [] : props.data.allBreweries
    .filter((brewery: any) => {
      return brewery.lat < props.mapState.viewboxTop &&
             brewery.lat > props.mapState.viewboxBottom &&
             brewery.lng < props.mapState.viewboxRight &&
             brewery.lng > props.mapState.viewboxLeft;
    })
    .sort((a: any, b: any) => a.name.localeCompare(b.name));

  return (
    <Outer full scroll>
      <Inner>
        {!props.data.loading && breweries.map((brewery: any, i: number) => (
          <BreweryListItem
            brewery={brewery}
            key={brewery.id}
            hovered={brewery.id === props.interactionStore.hoveredBreweryId}/>
        ))}
      </Inner>
    </Outer>
  );
});

// const BreweryListState = ({ data } : { data: any }) => (
//   <BreweryList
//     data={data}
//     mapState={MapStore}
//     interactionStore={InteractionStore}
//   />
// );
const BreweryListState = (props: any) => (
  <BreweryList {...props} mapState={MapStore} interactionStore={InteractionStore} />
);

const ListWithData = graphql(gql`
  query {
    allBreweries {
      name, id, lat, lng, visited
    }
  }
`)(BreweryListState);

export default ListWithData;
