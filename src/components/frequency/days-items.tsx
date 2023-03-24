import * as React from 'react';
import styled from 'styled-components';
import { FrequencyContext } from '../../contexts/Frequency';
import DayItem from './day-item';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;


const DaysItems = () => {
  const { selectedDays, handleDays } = React.useContext(FrequencyContext);

  return (
    <Container>
      <DayItem day="Mo" isFirst={true} selectedDays={selectedDays} onClick={handleDays} />
      <DayItem day="Tu" selectedDays={selectedDays} onClick={handleDays} />
      <DayItem day="We" selectedDays={selectedDays} onClick={handleDays} />
      <DayItem day="Th" selectedDays={selectedDays} onClick={handleDays} />
      <DayItem day="Fr" selectedDays={selectedDays} onClick={handleDays} />
      <DayItem day="Sa" selectedDays={selectedDays} onClick={handleDays} />
      <DayItem day="Su" isLast={true} selectedDays={selectedDays} onClick={handleDays} />
    </Container>
  )
};

export default DaysItems;