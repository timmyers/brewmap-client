import * as React from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';

interface HolderProps {
  children?: React.ReactChild;
  className?: string;
}

const Holder: React.StatelessComponent<HolderProps> = ({ className, children }) => (
  <Paper className={className}>
    {children}
  </Paper>
);

export default Holder;
