import * as React from "react";
import styled from "styled-components";
import {
  Text,
  Button,
  SubscriptionSheet,
  SettingsSheet,
  SubscriptionItem,
  Footer,
  Frequency,
  Header
} from "../../components";
import { FontSize } from "../../components/text";
import { FrequencyProvider } from "../../contexts/Frequency";
import { UserContext } from "../../contexts/User";
import { Enums } from "../../enums";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
`;

const SubscriptionsContainer = styled.div`
  height: 100vh;
  padding-top: 40px;
  width: 100vw;
  max-width: 500px;
  padding-right: 15px;
  padding-left: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
scr`;

const NewSubscribptionButton = styled(Button)`
  margin-top: 0px;
  margin-bottom: 20px;
`;

const EmptySubscriptionContainer = styled.div`
  position: relative;
  top: 40vh;
`;

const Home = () => {
  const { subscriptions, isDataLoading } = React.useContext(UserContext);

  const [isSubscriptionModalVisible, setSubscriptionModalVisibility] = React.useState(false);

  const [isSettingsModalVisible, setSettingsModalVisibility] = React.useState(false);

  const showSubscriptionModal = React.useCallback(() => {
    setSubscriptionModalVisibility(true);
  }, []);

  const showSettingsModal = React.useCallback(() => {
    setSettingsModalVisibility(true);
  }, []);

  const hideSubscriptionModal = React.useCallback(() => {
    setSubscriptionModalVisibility(false);
  }, []);

  const hideSettingsModal = React.useCallback(() => {
    setSettingsModalVisibility(false);
  }, []);

  return (
    <>
      <Container>
        {isDataLoading ? (
          <Text>{Enums.LOADING}</Text>
        ) : subscriptions && subscriptions.length > 0 ? (
          <SubscriptionsContainer>
            <Header showSettingsModal={showSettingsModal} />
            <div>
              <Text fontSize={FontSize.lg} align="center" bold>
                {Enums.SUBS_LIST_TITLE}
              </Text>
              <FrequencyProvider>
                <Frequency />
              </FrequencyProvider>
              <NewSubscribptionButton
                label={Enums.ADD_NEW_SUBS_MESSAGE}
                onClick={showSubscriptionModal}
              />
              {subscriptions && subscriptions.map((item) => (
                <SubscriptionItem
                  key={item?.subscription?.url}
                  data={item?.subscription}
                />
              ))}
            </div>
          </SubscriptionsContainer>
        ) : (
          <EmptySubscriptionContainer>
            <Text fontSize={FontSize.lg}>{Enums.NO_SUBS_MESSAGE}</Text>
            <Button
              label={Enums.ADD_SUBS_MESSAGE}
              onClick={showSubscriptionModal}
            />
          </EmptySubscriptionContainer>
        )}
        <Footer />
      </Container>
      <SubscriptionSheet
        isVisible={isSubscriptionModalVisible}
        onClose={hideSubscriptionModal}
      />
      <SettingsSheet
        isVisible={isSettingsModalVisible}
        onClose={hideSettingsModal}
      />
    </>
  );
};

export default Home;
