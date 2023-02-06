import * as React from 'react';
import styled from "styled-components";
import { Text, Spacing } from "../components";
import { FontSize } from '../components/text';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const ErrorPage = () => {
  return (
    <Container>
      <Text fontSize={FontSize.lg} bold>
        Oops!
      </Text>
      <Spacing />
      <Text>Page Not Found.</Text>
    </Container>
  );
};

export default ErrorPage;
