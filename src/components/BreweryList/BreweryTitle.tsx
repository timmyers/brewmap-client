import React from 'react';
import styled from 'styled-components';
import HorizontalLayout from 'Components/HorizontalLayout';

const TitleHolder = styled(HorizontalLayout)`
  width: 100%;
  justify-content: flex-start;
`;

const TitleSpan = styled.span`
  font-size: 15px;
  font-family: sans-serif;
`;

interface Props {
  title: string;
}

export default ({ title }: Props) => (
  <TitleHolder>
    <TitleSpan>
      { title}
    </TitleSpan>
  </TitleHolder>
);
