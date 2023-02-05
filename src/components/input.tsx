import * as React from 'react';
import styled from "styled-components";
import Text from "./text";
import TextInput from "./text-input";

interface InputProps {
  label: string;
  error: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`;

const ErrorText = styled(Text)`
  font-size: 0.7rem;
  color: red;
  margin-top: 5px;
`;

const Input = ({ label, error, ...props }: InputProps) => {
  return (
    <Container>
      <Text>{label}</Text>
      <TextInput {...props} />
      {error ? <ErrorText>{error}</ErrorText> : null}
    </Container>
  );
};

export default Input;
