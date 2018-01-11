import * as React from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import VerticalLayout from 'Components/VerticalLayout';
import Statistics from './Statistics';

const MainDiv = styled(VerticalLayout)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content:center;
`;

const Holder = styled(Paper as any)`
  width: 300px;
  height: 400px;
`;

const Profile = () => (
  <MainDiv>
    <Holder>
      <Statistics />
    </Holder>
  </MainDiv>
);

export default Profile;
