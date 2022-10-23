import styled from "styled-components";
import { Text } from "../components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const Padding = styled.div`
  height: 20px;
`;

const ErrorPage = () => {
  return (
    <Container>
      <Text fontSize="lg" bold>
        Oops!
      </Text>
      <Padding />
      <Text>Page Not Found.</Text>
    </Container>
  );
};

export default ErrorPage;
