import * as React from 'react';
import styled from 'styled-components';
import StylablePaper from 'Components/StylablePaper';
import HorizontalLayout from 'Components/HorizontalLayout';
import VerticalLayout from 'Components/VerticalLayout';
import { observer } from 'mobx-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import BreweryTitle from './BreweryTitle';
import BreweryVisited from './BreweryVisited';
import BreweryPermanentlyClosed from './BreweryPermanentlyClosed';
import { authStore } from 'State/auth';
import { InteractionStore } from 'State/Interaction';
import { isPhone } from 'Layouts/Detect';

interface ItemProps {
  brewery: {
    name: string;
    id: string;
    visited: boolean;
    closed: boolean;
  };
  mutate: any;
  showCheckbox: boolean;
  hovered: boolean;
}
interface OuterProps {
  hovered: boolean;
}

const Outer = styled.div`
  margin: 0px 0px;
  padding: 10px;
  transition-duration: 150ms;
  ${(props: OuterProps) => props.hovered && 'background-color: #e0e0e0 !important'}
`;

const OuterPhone = styled.div`
  margin: 0px 0px;
  padding: 5px;
  width: 200px;
  transition-duration: 150ms;
  ${(props: OuterProps) => props.hovered && 'background-color: #e0e0e0 !important'}
`;

interface InnerProps {
  onMouseEnter: Function;
  onMouseLeave: Function;
  full: boolean;
}
const Inner = styled(VerticalLayout)`
  align-items: center;
  justify-content: flex-start;
`;
const InnerTyped: React.StatelessComponent<InnerProps> = props => (
  <Inner {...props }/>
);

const CheckboxRow = styled(HorizontalLayout)`
  width: 100%;
  justify-content: flex-start;
`;

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

    const OuterUsed = isPhone() ? OuterPhone : Outer;

    return (
      <OuterUsed
        hovered={hovered}
      >
        <InnerTyped
          full
          onMouseEnter={() => this.onMouseEnter()}
          onMouseLeave={() => this.onMouseLeave()}
        >
          <BreweryTitle title={brewery.name} />
          <CheckboxRow>
            { showCheckbox &&
              <BreweryVisited
                visited={brewery.visited}
                onChange={(checked: any) => {
                  mutate({
                    variables: {
                      brewery: brewery.id,
                      visited: checked,
                    },
                  });
                }}
              />
            }
            { brewery.closed && <BreweryPermanentlyClosed />}
          </CheckboxRow>
        </InnerTyped>
      </OuterUsed>
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
