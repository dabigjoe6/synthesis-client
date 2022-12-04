import { useContext, useState, useCallback } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { COLORS, SERVICES } from "../config";
import DropdownInput from "./dropdown-input";
import Input from "./input";
import Spacing from "./spacing";
import Text from "./text";
import Button from "./button";
import { UserContext } from "../contexts/User";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const Container = styled.div`
  display: flex;
  background: ${COLORS.BACKGROUND};
  height: 50%;
  width: 90vw;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  border-radius: 10px;
  position: relative;
  box-shadow: rgba(102, 206, 214, 0.2) 0px 12px 28px 0px,
    rgba(102, 206, 214, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100vw;
  height: 50vh;
  position: absolute;
  background: #00000090;
  height: 100vh;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 0px;
  right: 10px;
  background: transparent;
  color: red;
  width: fit-content;
`;

const MediumSchema = Yup.object().shape({
  author: Yup.string()
    .url("Enter a valid URL")
    .matches(
      /^https?:\/\/(?:www\.)?(?:[a-z0-9]+\.medium\.com|medium\.com\/@[a-z0-9]+)$/,
      "Must be a valid Medium URL eg https://medium.com/@josepholabisi or https://josepholabisi.medium.com"
    )
    .required("Required"),
  service: Yup.string(),
});

const SERVICES_VALUES = Object.values(SERVICES);

const SubscriptionModal = ({ isVisible, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { subscribeToAuthor } = useContext(UserContext);

  const handleSubscription = useCallback(({ service, author }) => {
    try {
      setIsLoading(true);
      subscribeToAuthor(service, author);
      setIsLoading(false);
      handleClose();
      toast.success("Subscription succesfull!");
    } catch (err) {
      console.error(err, "Failed to subscribe to " + service);
      toast.error("Failed to subscribe");
      setIsLoading(false);
    }
  }, []);

  const handleClose = useCallback(() => {
    formik.resetForm();
    onClose();
  }, []);

  const formik = useFormik({
    initialValues: {
      author: "",
      service: SERVICES_VALUES[0],
    },
    onSubmit: handleSubscription,
    validationSchema: MediumSchema,
  });

  return isVisible ? (
    <Wrapper>
      <Container>
        <CloseButton label="Cancel" onClick={handleClose} />
        <Text fontSize="xl" bold>
          Add New Subscription
        </Text>
        <Spacing />
        <Text>Select service</Text>
        <DropdownInput
          value={formik.values.service}
          values={SERVICES_VALUES}
          onSelect={formik.handleChange}
          name="service"
        />
        <Input
          lightShade
          label={`Enter author's ${formik.values.service} URL`}
          name="author"
          type="text"
          placeholder="Enter authors medium URL"
          value={formik.values.author}
          onChange={formik.handleChange}
          error={formik.errors.author}
        />
        <Button
          label="Subscribe"
          onClick={formik.handleSubmit}
          loading={isLoading}
          disabled={!formik.isValid}
        />
      </Container>
    </Wrapper>
  ) : null;
};

export default SubscriptionModal;
