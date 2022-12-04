import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/User";
import Text from "./text";
import Button from "./button";
import { COLORS } from "../config";
import { DialogContext } from "../contexts/Dialog";
const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
  background: ${COLORS.BACKGROUND_LIGHT};
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 5px;
  padding-right: 5px;
`;

const UnsubscribeButton = styled(Button)`
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

const SubscriptionItem = ({ data }) => {
  const { name, url, _id } = data;

  const { unsubscribeFromAuthor } = useContext(UserContext);
  const { displayDialog } = useContext(DialogContext);

  const handleUrl = (url) => {
    const mediumUsernameRegex = /(?:@).*/;

    let name =
      url.match(mediumUsernameRegex) && url.match(mediumUsernameRegex)[0];

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

  const handleUnsubscription = async () => {
    const primaryAction = () => {
      unsubscribeFromAuthor(_id);
    };
    displayDialog({
      dialog: `Are you sure you want to unsubscribe from ${handleUrl(url)}`,
      primaryAction,
    });
  };

  return (
    <Container>
      <Text>
        {handleUrl(url)} - <Text fontSize="sm">{name}</Text>
      </Text>
      <Actions>
        <UnsubscribeButton
          transparent
          label="unsubscribe"
          onClick={handleUnsubscription}
        />
      </Actions>
    </Container>
  );
};

export default SubscriptionItem;
