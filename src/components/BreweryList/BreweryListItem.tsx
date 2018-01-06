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
import { InteractionStore } from 'State/Interaction';

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

interface InnerProps {
  onMouseEnter: Function;
  onMouseLeave: Function;
  full: boolean;
}
const Inner = styled(HorizontalLayout)`
  align-items: center;
  justify-content: flex-start;
`;
const InnerTyped: React.StatelessComponent<InnerProps> = props => (
  <Inner {...props }/>
);

@observer
class Item extends React.Component<ItemProps, {}> {
  shouldComponentUpdate(newProps: ItemProps) {
    if (newProps.brewery.visited !== this.props.brewery.visited) return true;
    if (newProps.hovered !== this.props.hovered) return true;
    return false;
  }

  onMouseEnter() {
    console.log('mouse enter');
    InteractionStore.hoveredBreweryId = this.props.brewery.id;
  }
  onMouseLeave() {
    InteractionStore.hoveredBreweryId = null;
  }

  render() {
    const { brewery, mutate, showCheckbox, hovered } = this.props;
    return (
      <Outer
        hovered={hovered}
      >
        <InnerTyped
          full
          onMouseEnter={() => this.onMouseEnter()}
          onMouseLeave={() => this.onMouseLeave()}
        >
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
        </InnerTyped>
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
