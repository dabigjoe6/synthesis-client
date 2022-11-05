import { useContext, useState } from "react";
import styled from "styled-components";
import {
  Text,
  Button,
  SubscriptionModal,
  SubscriptionItem,
  Spacing,
} from "../components";
import { UserContext } from "../contexts/User";

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
  const { subscriptions, isDataLoading } = useContext(UserContext);

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
      {isDataLoading ? (
        <Text>Loading...</Text>
      ) : subscriptions && subscriptions.length > 0 ? (
        <SubscriptionsContainer>
          <Text fontSize="xl" bold>
            Subscriptions
          </Text>
          <Text>You'll get an email digest of one article from your subscriptions at 7:30 AM UTC everyday (This will be customizable in future updates)</Text>
          <Spacing />
          {subscriptions.map((item) => (
            <SubscriptionItem
              key={item.subscription.url}
              data={item.subscription}
            />
          ))}
          <Spacing />
          <NewSubscribptionButton
            label="Add new Subscription"
            onClick={showSubscriptionModal}
          />
        </SubscriptionsContainer>
      ) : (
        <>
          <Text fontSize="lg">You don't have any subscriptions</Text>
          <Button
            label="Add Subscription now"
            onClick={showSubscriptionModal}
          />
        </>
      )}
      <SubscriptionModal
        isVisible={isSubscriptionModalVisible}
        onClose={hideSubscriptionModal}
      />
    </Container>
  );
};

export default Home;
