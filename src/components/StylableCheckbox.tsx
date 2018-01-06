import * as React from 'react';
import styled from 'styled-components';
import Checkbox from 'material-ui/Checkbox';

interface HolderProps {
  children?: React.ReactChild;
  className?: string;
}

const Styled: React.StatelessComponent<HolderProps> = ({ className, children }) => (
  <Checkbox className={className}>
    {children}
  </Checkbox>
);

export default Styled;
