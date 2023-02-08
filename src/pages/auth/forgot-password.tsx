import * as React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Input, Button, Text, Spacing } from "../../components";
import { Container, Form, H4 } from "./components";
import { AuthContext } from "../../contexts/Auth";
import { toast } from "react-toastify";
import styled from "styled-components";
import { FontSize } from "../../components/text";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const TextContainer = styled.div`
  margin-top: 20px;
`;

const ForgotPassword = () => {
  const { resetUsersPassword } = React.useContext(AuthContext);

  const [hasResentLinkSent, setHasResentLinkSent] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const handleForgotPassword = ({ email }: { email: string }) => {
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
          <Text fontSize={FontSize.md} align="center">
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
