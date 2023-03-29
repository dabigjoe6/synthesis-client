import * as React from 'react';
import styled from 'styled-components';
import Text from '../text';
import { Colors } from '../../config';

import DaysModal from './days-modal';
import { FrequencyContext } from '../../contexts/Frequency';

const Container = styled.div`
  display: flex;
`;

const WeekDaysDropdown = styled.div`
  cursor: pointer;
  display: flex;
  color: ${Colors.PRIMARY};
  text-decoration: underline;
  background: transparent;
  margin-left: 5px;
  margin-right: 5px;
  width: max-content;
  height: 100%;
`;

const FrequencyWeek = () => {

  const { selectedDays } = React.useContext(FrequencyContext);

  const [isDaysModalOpened, setIsDaysModalOpen] = React.useState(false);

  const handleCloseModal = () => {
    setIsDaysModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsDaysModalOpen(true);
  }

  const renderSelectedDays = () => {
    return Object.keys(selectedDays).join(",")
  }

  return (
    <Container>
      <Text>on</Text>
      <WeekDaysDropdown onClick={handleOpenModal}>{renderSelectedDays()}</WeekDaysDropdown>
      <DaysModal isVisible={isDaysModalOpened} closeDaysModal={handleCloseModal} />
    </Container>
  )
};

export default FrequencyWeek