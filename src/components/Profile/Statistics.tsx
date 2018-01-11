import * as React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import VerticalLayout from 'Components/VerticalLayout';
import { BreweryStore, BreweryState } from 'State/Brewery';

const MainDiv = styled(VerticalLayout) `
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content:center;
`;

interface TProps {
  breweryStore: BreweryState;
} 

const StatsSpan = styled.span`
  font-size: 14px;
  font-family: sans-serif;
`;

const Profile = observer(({ breweryStore }: TProps) => (
  <MainDiv>
    <StatsSpan>
      {`You have visted ${breweryStore.visitedBreweries.length} ` +
       `of ${breweryStore.breweries.length} breweries.`}
    </StatsSpan>
  </MainDiv>
));

const ProfileWithState = () => (
  <Profile breweryStore={BreweryStore} />
);

export default ProfileWithState;
