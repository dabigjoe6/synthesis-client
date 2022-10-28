import styled from "styled-components";
import Text from "./text";
import Button from "./button";
import { COLORS } from "../config";
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
  const { name, url } = data;

  const handleUrl = (url) => {
    const regex = /(?<=@).*/

    return url.match(regex)
  }
  return (
    <Container>
      <Text>
        {handleUrl(url)} - <Text fontSize="sm">{name}</Text>
      </Text>
      <Actions>
        <UnsubscribeButton transparent label="Unsubscribe" />
      </Actions>
    </Container>
  );
};

export default SubscriptionItem;
