import { useContext } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { useFormik } from "formik";
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

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const Login = () => {
  const { signUserIn } = useContext(AuthContext);

  const handleSignIn = ({ email }) => {
    signUserIn(email);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handleSignIn,
    validationSchema: LoginSchema,
  });

  return (
    <Container>
      <H2>MorningBrew</H2>
      <Text fontSize="md" align="center">
        Email digest of the most important articles from your favourite authors.
      </Text>
      <Form>
        <Input
          label="Email address"
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {/* TODO: Add Password when there's authentication */}
        {/* <Input
          label="Password"
          value={password}
          type="password"
          onChange={handlePassword}
        /> */}
        <Button
          onClick={formik.handleSubmit}
          label="Continue"
          disabled={!formik.isValid}
        />
      </Form>
    </Container>
  );
};

export default Login;
