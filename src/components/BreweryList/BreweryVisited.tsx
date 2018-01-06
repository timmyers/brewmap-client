import React from 'react';
import styled from 'styled-components';
import HorizontalLayout from 'Components/HorizontalLayout';
import Checkbox from 'material-ui/Checkbox';
import StylableCheckbox from 'Components/StylableCheckbox';

const Holder = styled(HorizontalLayout)`
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const MyCheckbox = styled(StylableCheckbox)`
  width: 30px !important;
  height: 30px !important;
`;

const VisitedSpan = styled.span`
  font-size: 12px;
  font-family: sans-serif;
`;

interface Props {
  visited: boolean;
  onChange: Function;
}

export default ({ visited, onChange } : Props) => (
  <Holder>
    <VisitedSpan>Visited</VisitedSpan>
    <MyCheckbox
      checked={visited}
      onChange={(e: any, checked: any) => onChange(checked)}
    />
  </Holder>
);
