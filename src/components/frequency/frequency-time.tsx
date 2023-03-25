import * as React from 'react';
import styled from 'styled-components';
import { times } from '../../config';
import { FrequencyContext } from '../../contexts/Frequency';
import FrequencySelect from './frequency-select';

const isLongTime = (time: string) => {
  return time.includes("10") || time.includes("11") || time.includes("12") || time.includes("22") || time.includes("23")
}

interface FrequencyTimeProps {
  time: string;
  index: number;
}

const Container = styled.div<{
  time: string;
}>`
  width: ${({ time }) => isLongTime(time) ? "55px" : "48px"};
`;

const FrequencyTime = ({ time, index }: FrequencyTimeProps) => {
  const { updateTime } = React.useContext(FrequencyContext);

  const generateOptions = () => {
    return (
      Object.keys(times).map((time: string) => {
        return <option key={time} value={times[time]}>{time}</option>
      })
    )
  };

  const handleTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTime(e.target.value, index)
  }

  return (
    <Container time={time}>
      <FrequencySelect value={time} onChange={handleTime}>
        {generateOptions()}
      </FrequencySelect>
    </Container>
  )
};

export default FrequencyTime