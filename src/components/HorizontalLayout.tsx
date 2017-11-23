import * as React from 'react';
import styled from 'styled-components';

interface HorizontalLayoutProps {
  children?: React.ReactNode;
  className?: string;
  full?: boolean;
  scroll?: boolean;
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  ${(props: any) => props.full && 'height: 100%; width: 100%;'}
  ${(props: any) => props.scroll && 'overflow: auto; max-height: 100%;'}
`;

const HorizontalLayout: React.StatelessComponent<HorizontalLayoutProps> = props => (
  <StyledDiv {...props} />
);

export default HorizontalLayout;
