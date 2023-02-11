import * as React from "react";
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
import { AuthContext, LoginDetails } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import styled from "styled-components";
import { Colors } from "../../config";

const CreateNewAccountBtn = styled(Button) <{ transparent: boolean }>`
  margin-top: 10px;
  color: ${Colors.SECONDARY};
`;

const ForgotPasswordBtn = styled(Button) <{ transparent: boolean }>`
  color: grey;
`;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email address").required("Required"),
  password: Yup.string().required("Enter password"),
});

const Login = () => {
  const navigate = useNavigate();
  const { signUserIn, signUserInWithGoogle } = React.useContext(AuthContext);

  const onGoogleLoginSuccess = (response: { code: string }) => {
    setIsLoading(true);
    signUserInWithGoogle(response.code, () => {
      setIsLoading(false);
    });
  };

  const login = useGoogleLogin({
    onSuccess: onGoogleLoginSuccess,
    flow: 'auth-code'
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const [isEmailSignIn, setIsEmailSignIn] = React.useState(false);

  const emailForm = () => (
    <Form>
      <Input
        label="Email address"
        id="email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email as string}
      />
      <Input
        label="Password"
        id="password"
        name="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password as string}
      />
      <CreateNewAccountBtn
        onClick={handleSignUp}
        label="No account? Create one"
        transparent
      />
      <ForgotPasswordBtn
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
    </Form>
  );

  const handleEmailSignIn = () => {
    setIsEmailSignIn(true);
  };

  const handleGoogleSignIn = () => {
    login();
  };

  const handleSignIn = (loginDetails: LoginDetails) => {
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
      password: "",
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

    </Container>
  );
};

export default Login;
