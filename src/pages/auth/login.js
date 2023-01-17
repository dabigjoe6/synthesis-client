import { useContext, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Input, Button, Spacing } from "../../components";
import {
  Container,
  Form,
  H4,
  GoogleSignIn,
  EmailSignIn,
} from "./components";
import { AuthContext } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import styled from "styled-components";

const CreateNewAccountBtn = styled(Button)`
  margin-top: 0px;
`;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email address").required("Required"),
  password: Yup.string().required("Enter password"),
});

const Login = () => {
  const navigate = useNavigate();
  const { signUserIn, signUserInWithGoogle } = useContext(AuthContext);

  const onGoogleLoginSuccess = (response) => {
    setIsLoading(true);
    signUserInWithGoogle(response.code, () => {
      setIsLoading(false);
    });
  };

  const onGoogleLoginFailure = (response) => {
    // TODO: Handle better
    console.error("Could not sign in with google", response);
  };

  const login = useGoogleLogin({
    onSuccess: onGoogleLoginSuccess,
    onFailure: onGoogleLoginFailure,
    flow: 'auth-code'
  });

  const [isLoading, setIsLoading] = useState(false);

  const [isEmailSignIn, setIsEmailSignIn] = useState(false);

  const emailForm = () => (
    <Form>
      <Input
        label="Email address"
        id="email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Input
        label="Password"
        id="password"
        name="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
    </Form>
  );

  const handleEmailSignIn = () => {
    setIsEmailSignIn(true);
  };

  const handleGoogleSignIn = () => {
    login();
  };

  const handleSignIn = (loginDetails) => {
    setIsLoading(true);
    signUserIn(loginDetails, () => {
      setIsLoading(false);
    });
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      passwowrd: "",
    },
    onSubmit: handleSignIn,
    validationSchema: LoginSchema,
  });

  return (
    <Container>
      <H4>Welcome Back</H4>
      <Spacing />
      {isEmailSignIn ? (
        emailForm()
      ) : (
        <>
          <GoogleSignIn onClick={handleGoogleSignIn} />
          <EmailSignIn onClick={handleEmailSignIn} />
        </>
      )}
      <CreateNewAccountBtn
        onClick={handleSignUp}
        label="No account? Create one"
        transparent
      />
      <Button
        onClick={handleForgotPassword}
        label="Forgot password?"
        transparent
      />
      <Button
        onClick={formik.handleSubmit}
        label="Continue"
        disabled={!formik.isValid}
        loading={isLoading}
      />
    </Container>
  );
};

export default Login;
