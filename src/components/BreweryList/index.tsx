import * as React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import VerticalLayout from 'Components/VerticalLayout';
import { InteractionStore } from 'State/Interaction';
import { BreweryStore } from 'State/Brewery';
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
  const breweries = props.breweryStore.breweriesInView;

  return (
    <Outer full scroll>
      <Inner>
        {breweries.map((brewery: any, i: number) => (
          <BreweryListItem
            brewery={brewery}
            key={brewery.id}
            hovered={brewery.id === props.interactionStore.hoveredBreweryId}/>
        ))}
      </Inner>
    </Outer>
  );
});

const BreweryListState = (props: any) => (
  <BreweryList {...props} breweryStore={BreweryStore} interactionStore={InteractionStore} />
);

export default BreweryListState;
