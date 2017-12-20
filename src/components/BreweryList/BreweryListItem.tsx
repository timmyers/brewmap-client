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
}

const Outer = styled(StylablePaper)`
  height: 50px;
`;

const Inner = styled(HorizontalLayout)`
  align-items: center;
  justify-content: flex-start;
  margin-left: 20px;
`;

@observer
class Item extends React.Component<ItemProps, {}> {
  shouldComponentUpdate(newProps: ItemProps) {
    return newProps.brewery.visited !== this.props.brewery.visited;
  }

  render() {
    const { brewery, mutate, showCheckbox } = this.props;
    return (
      <Outer>
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
