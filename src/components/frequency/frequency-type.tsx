import * as React from 'react';
import styled from 'styled-components';
import { FrequencyContext } from '../../contexts/Frequency';
import { Colors } from '../../config';

const Container = styled.div<{
  frequencyType: string;
}>`
  position: relative;
  width: ${({ frequencyType }) => frequencyType === 'daily' ? '30px' : '45px'};
  height: 12px;
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
`;

const Type = styled.div`
  color: ${Colors.PRIMARY};
  text-decoration: underline;
  position: absolute;
  top: 0px;
  z-index: 1;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
`

const Select = styled.select`
  color: transparent;
  text-decoration: underline;
  border-width: 0;
  /* for Firefox */
  -moz-appearance: none;
  /* for Chrome */
  -webkit-appearance: none;
  appearance: none;
  font-size: 0.9rem;
  display: inline-block;
  width: fit-content;
  max-width: fit-content;
  background: transparent;
  z-index: 2;
  position: absolute;
`

const FrequencyType = () => {

  const { frequencyType, setFrequencyType } = React.useContext(FrequencyContext)

  const handleFrequencyType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFrequencyType(e.target.value)
  };

  return (
    <Container frequencyType={frequencyType}>
      <Select value={frequencyType} onChange={handleFrequencyType}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </Select>
      <Type>{frequencyType}</Type>
    </Container>
  )
}

export default FrequencyType