import * as React from 'react';
import styled from 'styled-components';

interface VerticalLayoutProps {
  children?: React.ReactNode;
  className?: string;
  full?: boolean;
  scroll?: boolean;
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  ${(props: any) => props.full && 'height: 100%; width: 100%;'}
  ${(props: any) => props.scroll && 'overflow: scroll; max-height: 100%; -webkit-overflow-scrolling: touch;'}
`;

const VerticalLayout: React.StatelessComponent<VerticalLayoutProps> = props => (
  <StyledDiv {...props} />
);

export default VerticalLayout;
