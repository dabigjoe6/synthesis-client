import * as React from 'react';
import styled from "styled-components";
import { Colors } from '../../config';
import { FrequencyContext } from '../../contexts/Frequency';
import Button from "../button";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ActionButton = styled(Button)`
  margin-top: 10px;
  width: 50px;
  height: 20px;
  font-size: 0.7rem;
`;

const SaveBtn = styled(ActionButton)`
  margin-right: 10px;
`;

const ResetBtn = styled(ActionButton)`
  background: transparent;
  color: ${Colors.PRIMARY};
  border-width: 0.5px;
  border-style: 1px;
  border-color: ${Colors.PRIMARY};
  box-shadow: none;
`;


const FrequencyActions = () => {
  const { saveNewFrequency, resetChange } = React.useContext(FrequencyContext);
  return (
    <Container>
      <SaveBtn label="Save" onClick={saveNewFrequency} />
      <ResetBtn label="Reset" onClick={resetChange} />
    </Container>
  )
};

export default FrequencyActions;