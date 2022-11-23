import styled from "styled-components";
import Text from "./text";
import TextInput from "./text-input";

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

const Input = ({ label, error, ...props }) => {
  return (
    <Container>
      <Text>{label}</Text>
      <TextInput {...props} />
      {error ? <ErrorText>{error}</ErrorText> : null}
    </Container>
  );
};

export default Input;
