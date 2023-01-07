import { useContext, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Input, Button, Text } from "../../components";
import { Container, Form, H4, H2 } from "./components";
import { AuthContext } from "../../contexts/Auth";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ChangePasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Please enter your password")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/^(?=.*[a-z]).+$/, "Must contain at least one lowercase letter")
    .matches(/^(?=.*[A-Z]).+$/, "Must contain at least one uppercase letter")
    .matches(/^(?=.*\d).+$/, "Must contain at least one digit"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm new password"),
});

const ChangePassword = () => {
  const navigate = useNavigate();

  const { email, reesetToken } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const { changePassword } = useContext(AuthContext);

  const handleChangePassword = ({ newPassword }) => {
    setIsLoading(true);
    changePassword({ email, newPassword, reesetToken }, (success) => {
      setIsLoading(false);
      if (success) {
        toast.success("Password changed successfully");
        navigate("/login");
      } else {
        toast.error("Could not change password");
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    onSubmit: handleChangePassword,
    validationSchema: ChangePasswordSchema,
  });

  return (
    <Container>
      <H2>MorningBrew</H2>
      <Text fontSize="md" align="center">
        Email digest of the most important articles from your favourite authors
      </Text>
      <H4>Change Password</H4>
      <Form>
        <Input
          label="Enter new password"
          id="newPassword"
          name="newPassword"
          type="password"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          error={formik.errors.newPassword}
        />
        <Input
          label="Confirm new password"
          id="confirmNewPassword"
          name="confirmNewPassword"
          type="password"
          value={formik.values.confirmNewPassword}
          onChange={formik.handleChange}
          error={formik.errors.confirmNewPassword}
        />
        <Button
          onClick={formik.handleSubmit}
          label="Continue"
          disabled={!formik.isValid}
          loading={isLoading}
        />
      </Form>
    </Container>
  );
};

export default ChangePassword;
