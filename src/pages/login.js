import { useContext, useState } from "react";
import styled from "styled-components";
import { Input, Button, Text } from "../components";
import { AuthContext } from "../contexts/Auth";

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #171b22;
  flex-direction: column;
  border-radius: 3px;
  padding-top: 50px;
  padding-bottom: 50px;
  width: 90%;
`;

const H2 = styled.h2`
  color: white;
`;

const Form = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 2;
  padding-right: 10px;
  padding-left: 10px;
  box-sizing: border-box;
`;

const Login = () => {
  const {signUserIn} = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <Container>
      <H2>MorningBrew</H2>
      <Text fontSize="lg">Sign in to your account</Text>
      <Form>
        <Input label="Email address" value={email} onChange={setEmail} />
        <Input
          label="Password"
          value={password}
          type="password"
          onChange={setPassword}
        />
        <Button onClick={signUserIn} label="Log in" />
      </Form>
    </Container>
  );
};

export default Login;
