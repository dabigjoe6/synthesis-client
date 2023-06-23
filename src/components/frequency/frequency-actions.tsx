import * as React from 'react';
import styled from "styled-components";
import { Colors } from '../../config';
import { FrequencyContext } from '../../contexts/Frequency';
import { SettingsContext } from '../../contexts/Settings';
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
  margin-top: 0px;
`;

const ResetBtn = styled(ActionButton)`
  background: transparent;
  color: ${Colors.PRIMARY};
  border-width: 0.5px;
  border-style: 1px;
  border-color: ${Colors.PRIMARY};
  box-shadow: none;
  margin-top: 0px;
`;


const FrequencyActions = () => {
  let { frequencyType, times, selectedDays, resetChange, setIsNewChange } = React.useContext(FrequencyContext);
  const { saveNewFrequency } = React.useContext(SettingsContext);

  const [isLoading, setIsLoading] = React.useState(false);


  // Values from states directly were stale when handleClick is called
  // Hence the use of useRef as a hack due to the way closures work in Javascript
  // Honestly I don't truly understand the problem, and it was driviing me crazy
  // Tried using useCallback with the states as dependencies, but that didn't help either
  const _times = React.useRef<Array<string>>();
  const _frequencyType = React.useRef<string>();
  const _selectedDays = React.useRef<{ [key: string]: string }>();

  _times.current = times;
  _frequencyType.current = frequencyType;
  _selectedDays.current = selectedDays;

  const handleClick = () => {
    if (_frequencyType.current && _times.current && _selectedDays.current) {
      setIsLoading(true);
      saveNewFrequency(_frequencyType.current, _times.current, _selectedDays.current, (status) => {
        setIsLoading(false);
        if (status) {
          setIsNewChange(false);
        }
      })
    }
  };



  return (
    <Container>
      <SaveBtn label={isLoading ? "Saving..." : "Save"} onClick={handleClick} />
      <ResetBtn label="Reset" onClick={resetChange} />
    </Container>
  )
};

export default FrequencyActions;