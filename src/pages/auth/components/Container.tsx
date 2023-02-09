import * as React from 'react';
import styled from "styled-components";
import { Text as TextComponent } from "../../../components";
import synthesisLogo from '../../../synthesis.png';
import { Colors } from "../../../config";
import { useNavigate } from "react-router-dom";
const Body = styled.div`
  display: flex;
  align-items: center;
  background-color: ${Colors.BACKGROUND_LIGHT};
  flex-direction: column;
  border-radius: 3px;
  padding-bottom: 30px;
  width: 90%;
  max-width: 400px;
  padding-right: 20px;
  padding-left: 20px;
  box-sizing: border-box;
`;

const IconWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 40px;
  padding-left: 40px;
  box-sizing: border-box;
  pointer: cursor;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 400px;
  align-items: center;
`;

const Logo = styled.img`
  width: 120px;
  height: 50px;
  object-fit: cover;
  margin-bottom: 20px;
`

const Text = styled(TextComponent)`
  text-align: center;
`

const Container = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate('/login');
  }

  return (
    <Wrapper>
      <IconWrapper onClick={handleIconClick}>
        <Logo src={synthesisLogo} />
        <Text>Email digests of the most important articles from your favourite authors</Text>
      </IconWrapper>
      <Body>{children}</Body>
    </Wrapper>
  );
};

export default Container;
