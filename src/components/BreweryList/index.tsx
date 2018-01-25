import * as React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import VerticalLayout from 'Components/VerticalLayout';
import HorizontalLayout from 'Components/HorizontalLayout';
import { InteractionStore, InteractionState } from 'State/Interaction';
import { BreweryStore, BreweryState } from 'State/Brewery';
import BreweryListItemTyped from './BreweryListItem';

const BreweryListItem = BreweryListItemTyped as any;

const OuterVertical = styled(VerticalLayout)`
  position: absolute;
`;
const InnerVertical = styled(VerticalLayout)`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  align-items: stretch;
`;

const OuterHorizontal = styled(HorizontalLayout)`
  position: absolute;
`;
const InnerHorizontal = styled(HorizontalLayout)`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  align-items: stretch;
`;

interface TProps {
  vertical: boolean;
  breweryStore: BreweryState;
  interactionStore: InteractionState;
}

const BreweryList = observer(({ vertical, breweryStore, interactionStore } : TProps) => {
  const breweries = breweryStore.breweriesMatchingSearch.length ?
    breweryStore.breweriesMatchingSearch :
    breweryStore.breweriesInView;

  const Outer = vertical ? OuterVertical : OuterHorizontal;
  const Inner = vertical ? InnerVertical : InnerHorizontal;

  return (
    <Outer full scroll>
      <Inner>
        { breweries.map((brewery: any, i: number) => (
          <BreweryListItem
            brewery={brewery}
            key={brewery.id}
            hovered={brewery.id === interactionStore.hoveredBreweryId}
          />
        ))}
      </Inner>
    </Outer> 
  );
});

const BreweryListState = (props: any) => (
  <BreweryList {...props} breweryStore={BreweryStore} interactionStore={InteractionStore} />
);

export default BreweryListState;
