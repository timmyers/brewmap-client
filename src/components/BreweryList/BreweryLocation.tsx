import React from 'react';
import styled from 'styled-components';
import HorizontalLayout from 'Components/HorizontalLayout';
import Place from 'material-ui-icons/Place';

const TitleHolder = styled(HorizontalLayout)`
  margin-top: 5px;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const TitleSpan = styled.span`
  font-size: 14px;
  color: #9B9B9B;
  font-family: sans-serif;
`;

const PlaceIcon = styled(Place as any)`
  color: #9B9B9B;
`;

interface Props {
  title: string;
}

export default ({ title }: Props) => (
  <TitleHolder>
    <PlaceIcon />
    <TitleSpan>
      { title}
    </TitleSpan>
  </TitleHolder>
);