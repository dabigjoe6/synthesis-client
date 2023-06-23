import * as React from 'react';
import styled from 'styled-components';

import logo from '../assets/logo.png';

import SettingsBtn from './settings-button';

interface HeaderProps {
  showSettingsModal: () => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 5px;
  padding-left: 5px;
  margin-bottom: 20px;
`;

const Image = styled.img`
  object-fit: center;
  cursor: pointer;
`;


const Header = ({ showSettingsModal }: HeaderProps) => {
  const handleLogoClick = () => {
    window.open("https://synthesisapp.com")
  }
  return (<Container>
    <Image src={logo} alt="Synthesis logo" width={20} onClick={handleLogoClick} />
    <SettingsBtn onClick={showSettingsModal} />
  </Container>)
};

export default Header;
