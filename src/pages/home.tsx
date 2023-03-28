import * as React from "react";
import styled from "styled-components";
import {
  Text,
  Button,
  SubscriptionSheet,
  SubscriptionItem,
  Spacing,
  Footer,
  PauseDigest,
  Frequency,
  SummarySettings
} from "../components";
import { FontSize } from "../components/text";
import { FrequencyProvider } from "../contexts/Frequency";
import { UserContext } from "../contexts/User";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
`;

const SubscriptionsContainer = styled.div`
  height: 100vh;
  padding-top: 50px;
  width: 100vw;
  max-width: 500px;
  padding-right: 15px;
  padding-left: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NewSubscribptionButton = styled(Button)``;

const Home = () => {
  const { subscriptions, isDataLoading } = React.useContext(UserContext);

  const [isSubscriptionModalVisible, setSubscriptionModalVisibility] =
    React.useState(false);

  const showSubscriptionModal = React.useCallback(() => {
    setSubscriptionModalVisibility(true);
  }, []);

  const hideSubscriptionModal = React.useCallback(() => {
    setSubscriptionModalVisibility(false);
  }, []);

  return (
    <Container>
      {isDataLoading ? (
        <Text>Loading...</Text>
      ) : subscriptions && subscriptions.length > 0 ? (
        <SubscriptionsContainer>
          <div>
            <Text fontSize={FontSize.lg} align="center" bold>
              Your subscriptions
            </Text>
            <FrequencyProvider>
              <Frequency />
            </FrequencyProvider>
            <Spacing />
            {subscriptions && subscriptions.map((item) => (
              <SubscriptionItem
                key={item?.subscription?.url}
                data={item?.subscription}
              />
            ))}
            <Spacing />
            <NewSubscribptionButton
              label="Add new Subscription"
              onClick={showSubscriptionModal}
            />
          </div>
          <SummarySettings />
          <PauseDigest />
        </SubscriptionsContainer>
      ) : (
        <>
          <Text fontSize={FontSize.lg}>You don't have any subscriptions</Text>
          <Button
            label="Add Subscription now"
            onClick={showSubscriptionModal}
          />
        </>
      )}
      <SubscriptionSheet
        isVisible={isSubscriptionModalVisible}
        onClose={hideSubscriptionModal}
      />
      <Footer />
    </Container>
  );
};

export default Home;
