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

const Input = ({ label, ...props }) => {
  return (
    <Container>
      <Text>{label}</Text>
      <TextInput {...props} />
    </Container>
  );
};

export default Input;
