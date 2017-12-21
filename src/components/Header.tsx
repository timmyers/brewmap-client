import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HorizontalLayout from 'Components/HorizontalLayout';
import Paper from 'material-ui/Paper';
import Button, { ButtonProps } from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import Auth, { login, logout, isAuthenticated, getProfile } from 'Features/Auth';
import { authStore } from 'State/auth';
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
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const Title = styled.span`
  margin-left: 20px;
  font-size: 40px;
  font-family: Oswald;
  color: #655159;
`;

const SignUpButtonStyled = styled(SignUpButton)`
  margin-right: 50px;
`;

const Header = observer(() => (
  <StyledHolder>
    <Layout>
      <HorizontalLayout>
        <img src={BeerMapMarkerImage} style={{ height: '70%', marginLeft: '10px' }} />
        <Title>
          Brewed Here
        </Title>
      </HorizontalLayout>
      { !isAuthenticated() ?
        <SignUpButtonStyled raised onClick={() => login()}>
          Log In
        </SignUpButtonStyled>
      :
        <SignUpButtonStyled raised onClick={() => logout()}>
          Log Out
        </SignUpButtonStyled>
      }
      { authStore.sub === 'facebook|10213198044961330' &&
        <Link to="/admin">
          <SignUpButtonStyled raised onClick={() => logout()}>
            Admin
          </SignUpButtonStyled>
        </Link>
      }
      <Auth />
    </Layout>
  </StyledHolder>
));

export default Header;
