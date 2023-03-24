import * as React from 'react';
import styled from 'styled-components';
import { Colors } from '../../config';

import Text, { FontSize } from '../text';

interface DayItemProps {
  day: string;
  isFirst?: boolean;
  isLast?: boolean;
  selectedDays: Object;
  onClick: (day: string) => void;
};

const Container = styled.div<{
  isFirst?: boolean;
  isLast?: boolean;
  isSelected: boolean;
}>`
  background: ${({ isSelected }) => isSelected ? Colors.PRIMARY : "transparent"};
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 8px;
  padding-bottom: 8px;
  border-left: 1px;
  border-right: 1px;
  border-width: 0.7px;
  border-color: ${Colors.BACKGROUND};
  border-style: solid;
  border-bottom-width: 0px;
  border-top-width: 0px;
  border-top-left-radius: ${({ isFirst }) => isFirst ? '8px' : '0px'};
  border-bottom-left-radius: ${({ isFirst }) => isFirst ? '8px' : '0px'};
  border-top-right-radius: ${({ isLast }) => isLast ? '8px' : '0px'};
  border-bottom-right-radius: ${({ isLast }) => isLast ? '8px' : '0px'};
`;

const DayItem = ({ day, isFirst, isLast, selectedDays, onClick }: DayItemProps) => {

  const handleClick = () => {
    onClick(day);
  }

  const getIsSelected = () => {
    return day in selectedDays
  }
  return (
    <Container isFirst={isFirst} isLast={isLast} isSelected={getIsSelected()} onClick={handleClick}>
      <Text fontSize={FontSize.sm}>{day}</Text>
    </Container>
  )
};

export default DayItem;