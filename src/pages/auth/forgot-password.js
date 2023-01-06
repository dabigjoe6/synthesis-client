import { useContext, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Input, Button, Text } from "../../components";
import { Container, Form, H4, H2 } from "./components";
import { AuthContext } from "../../contexts/Auth";
import { toast } from "react-toastify";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const ForgotPassword = () => {
  const { resetUsersPassword } = useContext(AuthContext);

  const [hasResentLinkSent, setHasResentLinkSent] = useState(false);

  const handleForgotPassword = ({ email }) => {
    resetUsersPassword(email, (success) => {
      if (success) {
        setHasResentLinkSent(true);
        toast.success("Check your mail for reset link");
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handleForgotPassword,
    validationSchema: ForgotPasswordSchema,
  });

  const resetLinkSent = () => {
    return <Text>Resent link sent to your mail</Text>;
  };

  return (
    <Container>
      <H2>MorningBrew</H2>
      <Text fontSize="md" align="center">
        Email digest of the most important articles from your favourite authors
      </Text>
      <H4>Reset Password</H4>
      {hasResentLinkSent ? (
        resetLinkSent
      ) : (
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
          <Button
            onClick={formik.handleSubmit}
            label="Send reset link"
            disabled={!formik.isValid}
          />
        </Form>
      )}
    </Container>
  );
};

export default ForgotPassword;
