import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HorizontalLayout from 'Components/HorizontalLayout';
import Paper from 'material-ui/Paper';
import Button, { ButtonProps } from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import Auth, { login, logout, getProfile } from 'Features/Auth';
import { authStore } from 'State/auth';
import { InteractionStore } from 'State/Interaction';
import BeerMapMarkerImage from 'Images/beer_map_marker.svg';
import HeaderMenuButton from './HeaderMenuButton';

interface HolderProps {
  children?: React.ReactChild;
  className?: string;
}

const Holder: React.StatelessComponent<HolderProps> = ({ className, children }) => (
  <Paper className={className}>
    {children}
  </Paper>
);

const SignUpButton: React.StatelessComponent<ButtonProps> = props => (
  <Button raised {...props} />
);

const StyledHolder = styled(Holder)`
  height: 7%;
  background-color: #F9FAF7 !important;
  z-index: 10;
`;

const Layout = styled(HorizontalLayout)`
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const Title = styled.span`
  margin-left: 10px;
  font-size: 20px;
  font-family: Oswald;
  color: #655159;
`;

const SignUpButtonStyled = styled(SignUpButton)`
  margin-right: 10px;
  font-size: 14px;
  padding: 4px 8px;
  min-width: 60px;
  min-height: 30px;
  height: 50%;
`;

const Header = observer(({ authStore }: { authStore: any }) => (
  <StyledHolder>
    <Layout>
      <HorizontalLayout fullHeight alignCenter grow justifyStart>
        <img src={BeerMapMarkerImage} style={{ height: '70%', marginLeft: '10px' }} />
        <Title>
          Brewed Here
        </Title>
      </HorizontalLayout>
      <HorizontalLayout fullHeight alignCenter justifyEnd>
        <SignUpButtonStyled raised onClick={() => InteractionStore.toggleChat()}>
          Chat
        </SignUpButtonStyled>
        { !authStore.loggedIn ?
          <SignUpButtonStyled raised onClick={() => login()}>
            Log In
          </SignUpButtonStyled>
        :
          <HeaderMenuButton 
            showAdmin={authStore.sub === 'facebook|10213198044961330'}
          />
        }
      </HorizontalLayout>
      <Auth />
    </Layout>
  </StyledHolder>
));

const HeaderWithData = (props: any) => (
  <Header {...props} authStore={authStore} />
);

export default HeaderWithData;
