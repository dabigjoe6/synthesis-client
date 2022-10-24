import { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../config";
import DropdownInput from "./dropdown-input";
import Input from "./input";
import Spacing from "./spacing";
import Text from "./text";
import Button from "./button";

const Container = styled.div`
  display: flex;
  background: ${COLORS.BACKGROUND};
  height: 100vh;
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: 400px;
`;

const Wrapper = styled.div`
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  position: absolute;
`;

const SubscriptionModal = ({ isVisible, onClose }) => {
  const [author, setAuthor] = useState("");

  const handleAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const handleSubscription = () => {
    onClose();
  };

  return (
    <Wrapper isVisible={isVisible}>
      <Container>
        <Text fontSize="xl" bold>
          Add New Subscription
        </Text>
        <Spacing />
        <Text>Select service</Text>
        <DropdownInput />
        <Input
          lightShade
          label="Enter author's URL or username"
          name="author"
          type="text"
          value={author}
          onChange={handleAuthor}
        />
        <Button label="Subscribe" onClick={handleSubscription} />
      </Container>
    </Wrapper>
  );
};

export default SubscriptionModal;
