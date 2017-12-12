import * as React from 'react';
import styled from 'styled-components';
import StylablePaper from 'Components/StylablePaper';
import HorizontalLayout from 'Components/HorizontalLayout';
import BreweryTitle from './BreweryTitle';

interface ItemProps {
  brewery: {
    name: string;
  };
}

const Outer = styled(StylablePaper)`
  height: 50px;
`;

const Inner = styled(HorizontalLayout)`
  align-items: center;
  justify-content: flex-start;
  margin-left: 20px;
`;

class Item extends React.PureComponent<ItemProps, {}> {
  shouldComponentUpdate(newProps: ItemProps) {
    return newProps.brewery.name !== this.props.brewery.name;
  }

  render() {
    const { brewery } = this.props;
    return (
      <Outer>
        <Inner full>
          <BreweryTitle>
            { brewery.name }
          </BreweryTitle>
        </Inner>
      </Outer>
    );
  }
}

export default Item;
