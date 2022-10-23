import styled from "styled-components";
import Text from "./text";
import TextInput from "./text-input";

const Input = ({ label, props }) => {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin-top: 10px;
  `;

  return (
    <Container>
      <Text bold>{label}</Text>
      <TextInput {...props} />
    </Container>
  );
};

export default Input;
