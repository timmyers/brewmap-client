import * as React from 'react';
import styled from 'styled-components';
import StylablePaper from 'Components/StylablePaper';
import HorizontalLayout from 'Components/HorizontalLayout';
import { observer } from 'mobx-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Checkbox from 'material-ui/Checkbox';
import BreweryTitle from './BreweryTitle';
import { authStore } from 'State/auth';

interface ItemProps {
  brewery: {
    name: string;
    id: string;
    visited: boolean;
  };
  mutate: any;
  showCheckbox: boolean;
  hovered: boolean;
}
interface OuterProps {
  hovered: boolean;
}

const Outer = styled(StylablePaper)`
  transition-duration: 150ms;
  height: ${(props: OuterProps) => props.hovered ? '70px' : '50px'};
  ${(props: OuterProps) => props.hovered && 'background-color: #e0e0e0 !important'}
`;

const Inner = styled(HorizontalLayout)`
  align-items: center;
  justify-content: flex-start;
`;

@observer
class Item extends React.Component<ItemProps, {}> {
  shouldComponentUpdate(newProps: ItemProps) {
    if (newProps.brewery.visited !== this.props.brewery.visited) return true;
    if (newProps.hovered !== this.props.hovered) return true;
    return false;
  }

  render() {
    const { brewery, mutate, showCheckbox, hovered } = this.props;
    return (
      <Outer hovered={hovered}>
        <Inner full>
          { showCheckbox &&
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
          }
          <BreweryTitle>
            { brewery.name }
          </BreweryTitle>
        </Inner>
      </Outer>
    );
  }
}

const ItemObservable = (props: any) => (
  <Item {...props} showCheckbox={authStore.loggedIn} />
);

const ItemQL = graphql(gql`
  mutation setVisited($brewery: String!, $visited: Boolean!) {
    setVisited(brewery: $brewery, visited: $visited) {
      id, visited
    }
  }
`)(ItemObservable);

export default ItemQL;
