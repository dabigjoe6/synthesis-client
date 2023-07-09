import * as React from 'react';
import styled from "styled-components";
import { Colors } from "../config";
import Text, { FontSize } from "./text";
import { BottomSheet as BottomSheetComponent, BottomSheetRef } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css'

import SummarySettings from './summary-settings';
import PauseDigest from './pause-digest';

const BottomSheet = styled(BottomSheetComponent)`
  --rsbs-bg: ${Colors.BACKGROUND};
`

const Container = styled.div`
  display: flex;
  background: ${Colors.BACKGROUND};
  box-sizing: border-box;
  display: flex;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  align-self: center;
  margin-right: auto;
  margin-left: auto;
`;


const CloseBtn = styled.div`
  display: flex;
  color: ${Colors.PRIMARY};
  align-items: center;
  font-size: 0.9rem;
  margin-bottom: 40px;
  margin-top: 40px;
  cursor: pointer;
`;

const CloseText = styled(Text)`
  color: ${Colors.PRIMARY};
  text-decoration: underline;
  margin-left: 5px;
  font-size: 0.9rem;
`;

const ConfigContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: auto;
  margin-left: auto;
  align-self: center;
  margin-top: 20px;
`;

const SettingsModal = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const sheetRef = React.useRef<BottomSheetRef>(null);

  const handleClose = () => { onClose() }

  return (
    <BottomSheet
      open={isVisible}
      ref={sheetRef}
      snapPoints={({ maxHeight }: { maxHeight: number }) => [maxHeight - 250]}
    >
      <Container>
        <Text fontSize={FontSize.lg} bold>Change Settings</Text>
        <ConfigContainer>
          <SummarySettings />
          <PauseDigest />
        </ConfigContainer>
        <CloseBtn onClick={handleClose}>
          <CloseText>Close</CloseText>
        </CloseBtn>
      </Container>
    </BottomSheet>
  )
};

export default SettingsModal;
