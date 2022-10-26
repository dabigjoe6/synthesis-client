import { useContext, useState } from "react";
import styled from "styled-components";
import { COLORS, SERVICES } from "../config";
import DropdownInput from "./dropdown-input";
import Input from "./input";
import Spacing from "./spacing";
import Text from "./text";
import Button from "./button";
import useSubscription from "../hooks/subscription";
import { AuthContext } from "../contexts/Auth";

const Container = styled.div`
  display: flex;
  background: ${COLORS.BACKGROUND};
  height: 50%;
  width: 90vw;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  border-radius: 10px;
  position: relative;
  box-shadow: rgba(102, 206, 214, 0.2) 0px 12px 28px 0px,
    rgba(102, 206, 214, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
`;

const Wrapper = styled.div`
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100vw;
  height: 50vh;
  position: absolute;
  background: #00000090;
  height: 100vh;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 0px;
  right: 10px;
  background: transparent;
  color: red;
  width: fit-content;
`;

const SubscriptionModal = ({ isVisible, onClose }) => {
  const [author, setAuthor] = useState("");
  const [service, setService] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { email } = useContext(AuthContext);

  const { subscribeToService } = useSubscription();

  const handleAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const handleSubscription = () => {
    try {
      setIsLoading(true);
      subscribeToService(service, {
        email,
        author,
      });
      setIsLoading(false);
      onClose();
    } catch (err) {
      console.error(err, "Failed to subscribe to " + service);
      setIsLoading(false);
    }
  };

  const handleSelectedService = (event) => {
    setService(event.target.value);
  };

  return (
    <Wrapper isVisible={isVisible}>
      <Container>
        <CloseButton label="Cancel" onClick={onClose} />
        <Text fontSize="xl" bold>
          Add New Subscription
        </Text>
        <Spacing />
        <Text>Select service</Text>
        <DropdownInput
          values={Object.values(SERVICES)}
          onSelect={handleSelectedService}
        />
        <Input
          lightShade
          label="Enter author's URL or username"
          name="author"
          type="text"
          value={author}
          onChange={handleAuthor}
        />
        <Button
          label="Subscribe"
          onClick={handleSubscription}
          loading={isLoading}
        />
      </Container>
    </Wrapper>
  );
};

export default SubscriptionModal;
