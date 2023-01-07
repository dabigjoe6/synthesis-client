import { useContext, useCallback, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/User";
import Text from "./text";
import Button from "./button";
import { COLORS } from "../config";
import { DialogContext } from "../contexts/Dialog";
import { toast } from "react-toastify";
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

  const [isLoading, setIsLoading] = useState(false);

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

  const handleUnsubscription = useCallback(async () => {
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
      dialog: `Are you sure you want to unsubscribe from ${handleUrl(url)}`,
      primaryAction,
    });
  }, []);

  return (
    <Container>
      <Text>
        {handleUrl(url)} - <Text fontSize="sm">{name}</Text>
      </Text>
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
