import { useContext, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Input, Button } from "../../components";
import { Container, Form, H4 } from "./components";
import { AuthContext } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Enter your email"),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/^(?=.*[a-z]).+$/, "Must contain at least one lowercase letter")
    .matches(/^(?=.*[A-Z]).+$/, "Must contain at least one uppercase letter")
    .matches(/^(?=.*\d).+$/, "Must contain at least one digit"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = ({ email, password }) => {
    setIsLoading(true);
    registerUser({ email, password }, () => {
      setIsLoading(false);
    });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: handleSignUp,
    validationSchema: SignUpSchema,
  });

  return (
    <Container>
      <H4>Create a new account</H4>
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
          label="Enter password"
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
        <Input
          label="Confirm password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.errors.confirmPassword}
        />

        <Button
          onClick={handleLogin}
          label="Already have an account? Login"
          transparent
        />
        <Button
          onClick={formik.handleSubmit}
          label="Create account"
          disabled={!formik.isValid}
          loading={isLoading}
        />
      </Form>
    </Container>
  );
};

export default SignUp;
