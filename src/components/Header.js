import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VerticalLayout from 'Components/VerticalLayout';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

const styles = () => ({
  root: {
    height: '10%',
    backgroundColor: '#F9FAF7',
    zIndex: 10,
  },
});

const Title = styled.span`
  margin-left: 20px;
  font-size: 40px;
  font-family: Oswald;
  color: #655159;
`;

const Header = ({ classes }) => (
  <Paper className={classes.root}>
    <VerticalLayout>
      <Title>
        Colorado Brewery Map
      </Title>
    </VerticalLayout>
  </Paper>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
