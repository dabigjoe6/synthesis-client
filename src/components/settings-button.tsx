import * as React from 'react';
import styled from 'styled-components';
import { GiSettingsKnobs } from 'react-icons/gi';

import ComponentText from './text';
import { Colors } from '../config';

interface SettingsBtnProps {
  onClick: () => void;
}

const Text = styled(ComponentText)`
  color: ${Colors.PRIMARY};
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
  cursor: pointer;
`

const Wrapper = styled.div`
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #171b22;
  color: ${Colors.PRIMARY};
  padding: 5px;
  padding-right: 10px;
  padding-left: 10px;
  width: 100%;
  max-width: 70px;
  border-radius: 4px;
`;

const SettingsBtn = ({ onClick }: SettingsBtnProps) => {
  return (
    <Container>
      <Wrapper onClick={onClick}>
        <GiSettingsKnobs style={{ marginRight: 5 }} />
        <Text role='button'>Settings</Text>
      </Wrapper>
    </Container>
  )
};

export default SettingsBtn;