import * as React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import HorizontalLayout from 'Components/HorizontalLayout';
import { BreweryStore } from 'State/Brewery';
import BreweryListItemTyped from './BreweryListItem';

const BreweryListItem = BreweryListItemTyped as any;

const Outer = styled(HorizontalLayout)`
`;
const Inner = styled(HorizontalLayout)`
  height: 100%;
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
          <BreweryListItem brewery={brewery} key={brewery.id}/>
        ))}
      </Inner>
    </Outer>
  );
});

const BreweryListState = (props: any) => (
  <BreweryList {...props} breweryStore={BreweryStore} />
);

export default BreweryListState;
