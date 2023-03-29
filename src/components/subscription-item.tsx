import * as React from "react";
import styled from "styled-components";
import { SubscriptionItemI, UserContext } from "../contexts/User";
import Text, { FontSize } from "./text";
import Button from "./button";
import { Colors, ServicesIcons } from "../config";
import { DialogContext } from "../contexts/Dialog";
import { toast } from "react-toastify";


const Container = styled.div`
  display: flex;
  margin-top: 5px;
  margin-bottom: 5px;
  background: ${Colors.BACKGROUND_LIGHT};
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 5px;
  padding-right: 5px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageAndName = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const UnsubscribeButton = styled(Button) <{
  transparent?: boolean;
}>`
  margin-top: 0px;
  color: red;
  padding: 0px;
  height: 10px;
  font-size: 0.7rem;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

const Image = styled.img`
  height: 25px;
  width: 25px;
  object-fit: cover;
  margin-right: 10px;
`;

const SubscriptionItem = ({ data }: { data: SubscriptionItemI }) => {
  const { name, url, _id, source } = data;

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

  const handleSource = (_source: string) => {
    switch (_source) {
      case "MEDIUM":
        return ServicesIcons.MEDIUM;
      case "SUBSTACK":
        return ServicesIcons.SUBSTACK;
      case "RSS":
        return ServicesIcons.RSS;
    };
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
      <InnerContainer>
        <ImageAndName>
          <Image src={handleSource(source)} alt={`${source} icon`} />
          <Text>{handleUrl(url)}</Text>
        </ImageAndName>
        <Text fontSize={FontSize.sm}>{name}</Text>
      </InnerContainer>
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
