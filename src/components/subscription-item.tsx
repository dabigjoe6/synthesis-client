import * as React from "react";
import styled from "styled-components";
import { SubscriptionItemI, UserContext } from "../contexts/User";
import Text, { FontSize } from "./text";
import Button from "./button";
import { Colors } from "../config";
import { DialogContext } from "../contexts/Dialog";
import { toast } from "react-toastify";


const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
  background: ${Colors.BACKGROUND_LIGHT};
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 5px;
  padding-right: 5px;
`;

const UnsubscribeButton = styled(Button) <{
  transparent?: boolean;
}>`
  width: 100px;
  height: 100%;
  margin-top: 0px;
  color: red;
  padding: 0px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 2;
`;

const Space = styled.div`
  min-width: 10px;
`

const SubscriptionItem = ({ data }: { data: SubscriptionItemI }) => {
  const { name, url, _id } = data;

  const { unsubscribeFromAuthor } = React.useContext(UserContext);
  const { displayDialog } = React.useContext(DialogContext);

  const [isLoading, setIsLoading] = React.useState(false);

  const handleUrl = (url: string) => {
    const mediumUsernameRegex = /(?:@).*/;

    let name =
      url.match(mediumUsernameRegex) && (url.match(mediumUsernameRegex) || [])[0];

    let split = url.split("/@");

    if (split.length >= 2) {
      name = split[1];
    }

    split = url.split(".");

    if (split.length === 3) {
      name = split[0].split("//")[1];
    }

    if (!name) {
      return (name = url);
    }

    return name;
  };

  const handleUnsubscription = React.useCallback(async () => {
    const primaryAction = async () => {
      try {
        setIsLoading(true);
        await unsubscribeFromAuthor(_id, (success) => {
          setIsLoading(false);
          if (success) {
            toast.success("Succesfully unsubscribed");
          } else {
            toast.error("Could not unsubscribe");
          }
        });
      } catch (err) {
        toast.error("Something went wrong");
        console.error("Could not unsubscribe " + err);
      }
    };
    displayDialog({
      dialog: `Are you sure you want to unsubscribe from ${handleUrl(url)}?`,
      primaryAction,
    });
  }, []);

  return (
    <Container>
      <Wrapper>
        <Text>{handleUrl(url)}</Text>
        <Space />
        <Text fontSize={FontSize.sm}>{name}</Text>
      </Wrapper>
      <Actions>
        <UnsubscribeButton
          transparent
          label="unsubscribe"
          loading={isLoading}
          onClick={handleUnsubscription}
        />
      </Actions>
    </Container>
  );
};

export default SubscriptionItem;
