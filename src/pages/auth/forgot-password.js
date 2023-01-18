import { useContext, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Input, Button, Text, Spacing } from "../../components";
import { Container, Form, H4 } from "./components";
import { AuthContext } from "../../contexts/Auth";
import { toast } from "react-toastify";
import styled from "styled-components";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const TextContainer = styled.div`
  margin-top: 20px;
`;

const ForgotPassword = () => {
  const { resetUsersPassword } = useContext(AuthContext);

  const [hasResentLinkSent, setHasResentLinkSent] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = ({ email }) => {
    setIsLoading(true);
    resetUsersPassword(email, (success) => {
      setIsLoading(false);
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
    return (
      <TextContainer>
        <Text bold>Resent link sent to your mail</Text>
      </TextContainer>
    );
  };

  return (
    <Container>
      {hasResentLinkSent ? (
        resetLinkSent()
      ) : (
        <>
          <H4>Reset Password</H4>
          <Text fontSize="md" align="center">
            To reset your password a reset link will be sent to your registered
            e-mail address
          </Text>
          <Spacing />
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
              loading={isLoading}
            />
          </Form>
        </>
      )}
    </Container>
  );
};

export default ForgotPassword;
