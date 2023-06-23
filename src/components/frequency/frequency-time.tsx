import * as React from 'react';
import styled from 'styled-components';
import { times } from '../../config';
import { FrequencyContext } from '../../contexts/Frequency';
import { Colors } from '../../config';

interface FrequencyTimeProps {
  time: string;
  index: number;
  isLast: boolean;
}

const Container = styled.div<{
  time: string;
}>`
  cursor: pointer;
  position: relative;
  width: 40px;
  height: 12px;
`;

const Time = styled.div`
  color: ${Colors.PRIMARY};
  text-decoration: underline;
  position: absolute;
  top: 0px;
  z-index: 1;
`

const Select = styled.select`
  color: transparent;
  background: transparent;
  border-width: 0;
  /* for Firefox */
  -moz-appearance: none;
  /* for Chrome */
  -webkit-appearance: none;
  appearance: none;
  font-size: 0.9rem;
  display: inline-block;
  width: 50px;
  background: transparent;
  z-index: 2;
  position: absolute;
`

const FrequencyTime = ({ time, index, isLast }: FrequencyTimeProps) => {
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
      <Select value={time} onChange={handleTime}>
        {generateOptions()}
      </Select>
      <Time>{time}{isLast ? null : ","}</Time>
    </Container>
  )
};

export default FrequencyTime