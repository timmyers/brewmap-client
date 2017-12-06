import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HorizontalLayout from 'Components/HorizontalLayout';
import Paper from 'material-ui/Paper';
import Button, { ButtonProps } from 'material-ui/Button';
import Auth, { login, logout, isAuthenticated } from 'Features/Auth';

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

const Header = () => (
  <StyledHolder>
    <Layout>
      <Title>
        Colorado Brewery Map
      </Title>
      { !isAuthenticated () ?
        <SignUpButtonStyled raised onClick={() => login()}>
          Sign Up
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
