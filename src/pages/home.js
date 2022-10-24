import { useState } from "react";
import styled from "styled-components";
import {
  Text,
  Button,
  SubscriptionModal,
  SubscriptionItem,
  Spacing,
} from "../components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`;

const SubscriptionsContainer = styled.div`
  height: 100vh;
  padding-top: 50px;
  width: 100vw;
  max-width: 500px;
  padding-right: 10px;
  padding-left: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const NewSubscribptionButton = styled(Button)``;

const Home = () => {
  const subscriptions = [1];

  const [isSubscriptionModalVisible, setSubscriptionModalVisibility] =
    useState(false);

  const showSubscriptionModal = () => {
    setSubscriptionModalVisibility(true);
  };

  const hideSubscriptionModal = () => {
    setSubscriptionModalVisibility(false);
  };

  return (
    <Container>
      {subscriptions.length === 0 ? (
        <>
          <Text fontSize="lg">You don't have any subscriptions</Text>
          <Button
            label="Add Subscription now"
            onClick={showSubscriptionModal}
          />
        </>
      ) : (
        <SubscriptionsContainer>
          <Text fontSize="xl" bold>
            Subscriptions
          </Text>
          <Text>Here's a list of all your subscriptions</Text>
          <Spacing />
          <SubscriptionItem />
          <Spacing />
          <NewSubscribptionButton
            label="Add new Subscription"
            onClick={showSubscriptionModal}
          />
        </SubscriptionsContainer>
      )}
      <SubscriptionModal
        isVisible={isSubscriptionModalVisible}
        onClose={hideSubscriptionModal}
      />
    </Container>
  );
};

export default Home;
