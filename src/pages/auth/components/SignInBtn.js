import { Text } from "../../../components";
import { COLORS } from "../../../config";
import styled from "styled-components";
import H2 from "./H2";

const Container = styled.div`
  display: flex;
  align-items: center;
  border-width: 1px;
  border-color: ${COLORS.SECONDARY};
  border-style: solid;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
  width: 80%;
  cursor: pointer;
`;

const Icon = styled(H2)`
  color: ${COLORS.PRIMARY};
  margin: 0px;
  margin-right: 8px;
  margin-bottom: 1px;
`;

const SignInBtn = (props) => {
  return (
    <Container onClick={props.onClick}>
      <Icon>{props.icon}</Icon>
      <Text>{props.text}</Text>
    </Container>
  );
};

export default SignInBtn;
