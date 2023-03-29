import * as React from 'react';
import styled from 'styled-components';
import { FrequencyContext } from '../../contexts/Frequency';
import FrequencySelect from './frequency-select';

const Container = styled.div<{
  frequencyType: string;
}>`
  margin-right: ${({ frequencyType }) => frequencyType === 'daily' ? '-10px' : '5px'};
  margin-left: 5px;
  cursor: pointer;
`;


const FrequencyType = () => {

  const { frequencyType, setFrequencyType } = React.useContext(FrequencyContext)

  const handleFrequencyType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFrequencyType(e.target.value)
  };

  return (
    <Container frequencyType={frequencyType}>
      <FrequencySelect value={frequencyType} onChange={handleFrequencyType}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </FrequencySelect>
    </Container>
  )
}

export default FrequencyType