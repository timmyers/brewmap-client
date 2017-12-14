import * as React from 'react';
import styled from 'styled-components';
import StylablePaper from 'Components/StylablePaper';
import HorizontalLayout from 'Components/HorizontalLayout';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Checkbox from 'material-ui/Checkbox';
import BreweryTitle from './BreweryTitle';

interface ItemProps {
  brewery: {
    name: string;
    id: string;
    visited: boolean;
  };
  mutate: any;
}

const Outer = styled(StylablePaper)`
  height: 50px;
`;

const Inner = styled(HorizontalLayout)`
  align-items: center;
  justify-content: flex-start;
  margin-left: 20px;
`;

class Item extends React.Component<ItemProps, {}> {
  shouldComponentUpdate(newProps: ItemProps) {
    return newProps.brewery.visited !== this.props.brewery.visited;
  }

  render() {
    const { brewery, mutate } = this.props;
    return (
      <Outer>
        <Inner full>
          <BreweryTitle>
            { brewery.name }
          </BreweryTitle>
          <Checkbox
            checked={brewery.visited}
            onChange={(e, checked) => {
              mutate({
                variables: {
                  brewery: brewery.id,
                  visited: checked,
                },
              });
            }}
          />
        </Inner>
      </Outer>
    );
  }
}

const ItemQL = graphql(gql`
  mutation setVisited($brewery: String!, $visited: Boolean!) {
    setVisited(brewery: $brewery, visited: $visited) {
      id, visited
    }
  }
`)(Item);

export default ItemQL;
