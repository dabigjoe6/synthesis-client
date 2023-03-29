import * as React from 'react';
import styled from "styled-components";
import Text from '../text';
import DaysItems from './days-items';
import Button from '../button';
import { Colors } from '../../config';

interface DaysModalProps {
  isVisible: boolean;
  closeDaysModal: () => void;
}

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #00000090;
  width: 250px;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${Colors.BACKGROUND_LIGHT};
  padding: 20px;
  border-radius: 4px;
  box-shadow: rgba(102, 206, 214, 0.2) 0px 12px 28px 0px,
    rgba(102, 206, 214, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  max-width: 80%;
`;


const DaysModal = ({ isVisible, closeDaysModal }: DaysModalProps) => {
  return isVisible ? (
    <ModalContainer>
      <Container>
        <Text align='center'>Which days of the week you want to receive your digest?</Text>
        <DaysItems />
        <Button label="Done" onClick={closeDaysModal} />
      </Container>
    </ModalContainer>
  ) : null
};

export default DaysModal;