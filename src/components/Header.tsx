import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VerticalLayout from 'Components/VerticalLayout';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

interface HolderProps {
  children?: React.ReactChild;
  className?: string;
}

class Holder extends React.Component<HolderProps, {}> {
  render() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

const StyledHolder = styled(Holder)`
  height: 10%;
  backgroundColor: '#F9FAF7',
  zIndex: 10,
`;

const Title = styled.span`
  margin-left: 20px;
  font-size: 40px;
  font-family: Oswald;
  color: #655159;
`;

const Header = () => (
  <StyledHolder>
    <VerticalLayout>
      <Title>
        Colorado Brewery Map
      </Title>
    </VerticalLayout>
  </StyledHolder>
);

export default Header;
