import { useContext } from "react";
import styled from "styled-components";
import { COLORS } from "../config";
import { AuthContext } from "../contexts/Auth";
import Text from "./text";
import Button from "./button";

const Container = styled.div`
  position: absolute;
  bottom: 0px;
  color: ${COLORS.PRIMARY};
  font-size: 0.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100px;
  padding-bottom: 8px;
`;

const LinkBtn = styled(Button)`
  width: max-content;
  background: transparent;
  color: ${COLORS.PRIMARY};
  text-decoration: underline;
  font-size: 0.65rem;
  height: max-content;
`;

const FooterText = styled(Text)`
  font-size: 0.7rem;
  margin-top: 0px;
  margin-bottom: 0px;
  height: max-content;
  color: ${COLORS.SECONDARY};
`;

const Footer = () => {
  const { email, signUserOut } = useContext(AuthContext);

  const handleJosephsProfile = () => {
    window.open("https://www.linkedin.com/in/joseph-olabisi/");
  };

  return (
    <Container>
      <FooterText>
        Signed in as {email}
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
