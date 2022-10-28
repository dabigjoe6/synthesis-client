import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Text,
  Button,
  SubscriptionModal,
  SubscriptionItem,
  Spacing,
} from "../components";
import useSubscription from "../hooks/subscription";

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
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { getUserSubscriptions } = useSubscription();

  const [isSubscriptionModalVisible, setSubscriptionModalVisibility] =
    useState(false);

  const showSubscriptionModal = () => {
    setSubscriptionModalVisibility(true);
  };

  const hideSubscriptionModal = () => {
    _getUserSubscriptions();
    setSubscriptionModalVisibility(false);
  };

  const _getUserSubscriptions = async () => {
    setIsLoading(true);
    const _subscriptions = await getUserSubscriptions();
    setSubscriptions(_subscriptions);
    setIsLoading(false);
  };

  useEffect(() => {
    _getUserSubscriptions();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : subscriptions && subscriptions.length > 0 ? (
        <SubscriptionsContainer>
          <Text fontSize="xl" bold>
            Subscriptions
          </Text>
          <Text>Here's a list of all your subscriptions</Text>
          <Spacing />
          {subscriptions.map((item) => (
            <SubscriptionItem data={item.subscription} />
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
