import * as React from 'react';
import { Text } from "../../../components";
import { Colors } from "../../../config";
import styled from "styled-components";
import H2 from "./H2";


export interface SignInBtnProps {
  icon: string;
  text: string;
  onClick: () => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  border-width: 1px;
  border-color: ${Colors.SECONDARY};
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
  color: ${Colors.PRIMARY};
  margin: 0px;
  margin-right: 8px;
  margin-bottom: 1px;
`;

const SignInBtn = (props: SignInBtnProps) => {
  return (
    <Container onClick={props.onClick}>
      <Icon>{props.icon}</Icon>
      <Text>{props.text}</Text>
    </Container>
  );
};

export default SignInBtn;
