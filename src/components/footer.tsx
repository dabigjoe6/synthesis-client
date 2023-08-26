import * as React from "react";
import styled from "styled-components";
import { Colors } from "../config";
import { AuthContext } from "../contexts/Auth";
import Text from "./text";
import Button from "./button";


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

  return (
    <Container>
      <FooterText>
        Signed in as {user?.email}
        <LinkBtn label="Switch user" onClick={signUserOut} />
      </FooterText>
    </Container>
  );
};

export default Footer;
