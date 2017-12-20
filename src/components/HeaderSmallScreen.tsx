import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HorizontalLayout from 'Components/HorizontalLayout';
import Paper from 'material-ui/Paper';
import Button, { ButtonProps } from 'material-ui/Button';
import Auth, { login, logout, isAuthenticated } from 'Features/Auth';
import BeerMapMarkerImage from 'Images/beer_map_marker.svg';

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
  height: 10%;
  background-color: #F9FAF7 !important;
  z-index: 10;
`;

const Layout = styled(HorizontalLayout)`
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

const TopLeft = styled(HorizontalLayout)`
  align-items: center;
  height: 100%;
`;

const Title = styled.span`
  margin-left: 20px;
  font-size: 70px;
  font-family: Oswald;
  color: #655159;
`;

const SignUpButtonStyled = styled(SignUpButton)`
  margin-right: 50px;
  font-size: 50px !important;
`;

const Header = () => (
  <StyledHolder>
    <Layout>
      <TopLeft>
        <img src={BeerMapMarkerImage} style={{ height: '70%', marginLeft: '10px' }} />
        <Title>
          Brewed Here
        </Title>
      </TopLeft>
      { !isAuthenticated () ?
        <SignUpButtonStyled raised onClick={() => login()}>
          Log In
        </SignUpButtonStyled>
      :
        <SignUpButtonStyled raised onClick={() => logout()}>
          Log Out
        </SignUpButtonStyled>
      }
      <Auth />
    </Layout>
  </StyledHolder>
);

export default Header;
