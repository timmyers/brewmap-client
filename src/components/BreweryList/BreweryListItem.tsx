import * as React from 'react';
import styled from 'styled-components';
import StylablePaper from 'Components/StylablePaper';
import HorizontalLayout from 'Components/HorizontalLayout';
import VerticalLayout from 'Components/VerticalLayout';
import { observer } from 'mobx-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import BreweryTitle from './BreweryTitle';
import BreweryLocation from './BreweryLocation';
import BreweryVisited from './BreweryVisited';
import BreweryWebsite from './BreweryWebsite';
import BreweryPermanentlyClosed from './BreweryPermanentlyClosed';
import { authStore } from 'State/auth';
import { InteractionStore } from 'State/Interaction';
import { isPhone } from 'Layouts/Detect';

interface ItemProps {
  brewery: Brewery;
  mutate: any;
  showCheckbox: boolean;
  hovered: boolean;
}

interface OuterProps {
  hovered: boolean;
  onMouseEnter: Function;
  onMouseLeave: Function;
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
  full: boolean;
}

const Inner = styled(VerticalLayout)`
  align-items: center;
  justify-content: flex-start;
`;
const InnerTyped: React.StatelessComponent<InnerProps> = props => (
  <Inner {...props }/>
);

const Row = styled(HorizontalLayout)`
  width: 100%;
  margin-top: 5px;
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
        onMouseEnter={() => this.onMouseEnter()}
        onMouseLeave={() => this.onMouseLeave()}
      >
        <InnerTyped
          full
        >
          <BreweryTitle title={brewery.name} />
          { (brewery.locationName || brewery.website) &&
            <Row>
              { brewery.locationName && 
                <BreweryLocation title={brewery.locationName } />
              }
              { brewery.website &&
                <BreweryWebsite url={brewery.website} />
              }
            </Row>
          }
          <Row>
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
          </Row>
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
