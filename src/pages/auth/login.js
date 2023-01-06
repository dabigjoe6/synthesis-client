import { useContext } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Input, Button, Text } from "../../components";
import { Container, Form, H4, H2 } from "./components";
import { AuthContext } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email address").required("Required"),
  password: Yup.string().required("Enter password"),
});

const Login = () => {
  const navigate = useNavigate();
  const { signUserIn } = useContext(AuthContext);

  const handleSignIn = (loginDetails) => {
    signUserIn(loginDetails);
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password")
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
      <H2>MorningBrew</H2>
      <Text fontSize="md" align="center">
        Email digest of the most important articles from your favourite authors
      </Text>
      <H4>Login</H4>
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
        <Button
          onClick={handleForgotPassword}
          label="Forgot password?"
          transparent
        />
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
