import * as React from "react";
import styled from "styled-components";
import { Colors } from "../config";
import { AuthContext } from "../contexts/Auth";
import Text from "./text";
import Button from "./button";
import SummarySettings from "./summary-settings";
import PauseDigest from "./pause-digest";


const Container = styled.div`
  color: ${Colors.PRIMARY};
  font-size: 0.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 15px;
  position: relative;
  bottom: 5rem;
`;

const ConfigContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: auto;
  margin-left: auto;
  align-self: center;
`;

const LinkBtn = styled(Button)`
  width: max-content;
  background: transparent;
  color: ${Colors.PRIMARY};
  text-decoration: underline;
  font-size: 0.65rem;
  height: max-content;
`;

const FooterText = styled(Text)`
  font-size: 0.7rem;
  margin-top: 0px;
  margin-bottom: 0px;
  height: max-content;
  color: ${Colors.SECONDARY};
`;

const Footer = () => {
  const { user, signUserOut } = React.useContext(AuthContext);

  const handleJosephsProfile = () => {
    window.open("https://www.linkedin.com/in/joseph-olabisi/");
  };

  return (
    <Container>
      <ConfigContainer>
        <SummarySettings />
        <PauseDigest />
      </ConfigContainer>
      <FooterText>
        Signed in as {user?.email}
        <LinkBtn label="Switch user" onClick={signUserOut} />
      </FooterText>
      <FooterText>
        Developed by
        <LinkBtn label="Joseph Olabisi" onClick={handleJosephsProfile} />
      </FooterText>
    </Container>
  );
};

export default Footer;
