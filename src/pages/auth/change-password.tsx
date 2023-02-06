import * as React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Input, Button } from "../../components";
import { Container, Form, H4 } from "./components";
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

  const { email, resetPasswordToken } = useParams();

  const [isLoading, setIsLoading] = React.useState(false);

  const { changePassword } = React.useContext(AuthContext);

  const handleChangePassword = ({ newPassword }: { newPassword: string; confirmNewPassword: string }) => {
    setIsLoading(true);
    changePassword({ email, newPassword, resetPasswordToken }, (success) => {
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
