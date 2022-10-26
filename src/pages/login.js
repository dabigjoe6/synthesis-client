import { useContext, useState } from "react";
import styled from "styled-components";
import { Input, Button, Text } from "../components";
import { COLORS } from "../config";
import { AuthContext } from "../contexts/Auth";

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${COLORS.BACKGROUND_LIGHT};
  flex-direction: column;
  border-radius: 3px;
  padding-top: 50px;
  padding-bottom: 50px;
  width: 90%;
  max-width: 400px;
  padding-right: 20px;
  padding-left: 20px;
  box-sizing: border-box;
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
  const { signUserIn } = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = () => {
    signUserIn(email);
  };

  return (
    <Container>
      <H2>MorningBrew</H2>
      <Text fontSize="lg">Sign in to your account</Text>
      <Form>
        <Input label="Email address" value={email} onChange={handleEmail} />
        <Input
          label="Password"
          value={password}
          type="password"
          onChange={handlePassword}
        />
        <Button onClick={handleSignIn} label="Log in" disabled={!email} />
      </Form>
    </Container>
  );
};

export default Login;
