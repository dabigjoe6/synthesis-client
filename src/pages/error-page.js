import styled from "styled-components";
import { Text, Spacing } from "../components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const ErrorPage = () => {
  return (
    <Container>
      <Text fontSize="lg" bold>
        Oops!
      </Text>
      <Spacing />
      <Text>Page Not Found.</Text>
    </Container>
  );
};

export default ErrorPage;
