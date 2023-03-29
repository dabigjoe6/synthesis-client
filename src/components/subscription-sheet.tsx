import * as React from 'react';
import styled from "styled-components";
import * as Yup from "yup";
import { Colors, Services, ServicesIcons } from "../config";
import Input from "./input";
import Text, { FontSize } from "./text";
import Service from './service';
import Button from "./button";
import { UserContext } from "../contexts/User";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { CiCircleChevLeft } from 'react-icons/ci';
import { BottomSheet as BottomSheetComponent, BottomSheetRef } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css'

const BottomSheet = styled(BottomSheetComponent)`
  --rsbs-bg: ${Colors.BACKGROUND};
`

const Container = styled.div`
  display: flex;
  background: ${Colors.BACKGROUND};
  box-sizing: border-box;
  display: flex;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  align-self: center;
  margin-right: auto;
  margin-left: auto;
`;

const InputContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const BackBtn = styled.div`
  display: flex;
  color: ${Colors.PRIMARY};
  align-items: center;
  font-size: 0.9rem;
  margin-bottom: 40px;
  cursor: pointer;
`;

const CloseBtn = styled.div`
  display: flex;
  color: ${Colors.PRIMARY};
  align-items: center;
  font-size: 0.9rem;
  margin-bottom: 40px;
  cursor: pointer;
`;

const BackText = styled(Text)`
  color: ${Colors.PRIMARY};
  text-decoration: underline;
  margin-left: 5px;
  font-size: 0.9rem;
`;


const CloseText = styled(Text)`
  color: ${Colors.PRIMARY};
  text-decoration: underline;
  margin-left: 5px;
  font-size: 0.9rem;
`;

const ServiceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: center;
`;

const MediumSchema = Yup.object().shape({
  author: Yup.string()
    .url(
      "Enter a valid URL eg https://medium.com/@josepholabisi or https://josepholabisi.medium.com"
    )
    .required("Required"),
  service: Yup.string(),
});

const SubstackSchema = Yup.object().shape({
  author: Yup.string()
    .url("Enter a valid URL eg https://timdenning.substack.com")
    .required("Required"),
  service: Yup.string(),
});

const RSSSchema = Yup.object().shape({
  author: Yup.string()
    .url("Enter a valid RSS feed URL eg https://blog.gregbrockman.com/feed")
    .required("Required"),
  service: Yup.string(),
});

const SERVICES_VALUES = Object.values(Services);

const SubscriptionModal = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const sheetRef = React.useRef<BottomSheetRef>();

  const [isLoading, setIsLoading] = React.useState(false);

  const [isServiceSelected, setIsServiceSelected] = React.useState(false);

  const { subscribeToAuthor } = React.useContext(UserContext);

  const handleSchema = () => {
    switch (formik.values.service) {
      case Services.MEDIUM:
        return MediumSchema;
      case Services.SUBSTACK:
        return SubstackSchema;
      case Services.RSS:
        return RSSSchema;
      default:
        return MediumSchema;
    }
  };

  const handleSubscription = React.useCallback(({ service, author }: { service: Services; author: string }) => {
    try {
      setIsLoading(true);
      subscribeToAuthor(service, author, (success) => {
        setIsLoading(false);
        if (success) {
          toast.success("Subscription succesful!");
          handleClose();
        } else {
          throw new Error()
        }
      });
    } catch (err) {
      console.error(err, "Failed to subscribe to " + service);
      toast.error("Failed to subscribe");
      setIsLoading(false);
    } finally {
      setIsServiceSelected(false);
    }
  }, []);

  const handleClose = React.useCallback(() => {
    formik.resetForm();
    onClose();
  }, []);

  const formik = useFormik({
    initialValues: {
      author: "",
      service: SERVICES_VALUES[0],
    },
    onSubmit: handleSubscription,
    validationSchema: handleSchema,
  });

  const handleServiceClick = (source: string) => {
    let service;

    switch (source) {
      case "Medium":
        service = Services.MEDIUM;
        break;
      case "Substack":
        service = Services.SUBSTACK;
        break;
      case "RSS Feed":
        service = Services.RSS;
        break;
      default:
        service = Services.MEDIUM;
        break;
    };

    formik.setFieldValue("service", service);

    setIsServiceSelected(true);
  };

  const handleBackBtn = () => {
    setIsServiceSelected(false);
  }

  return (
    <BottomSheet
      open={isVisible}
      ref={sheetRef}
      snapPoints={({ maxHeight }: { maxHeight: number }) => [maxHeight - 250]}

    >
      <Container>
        <Text fontSize={FontSize.lg} bold>Select Source</Text>
        {isServiceSelected ?
          (
            <InputContainer>
              <BackBtn onClick={handleBackBtn}>
                <CiCircleChevLeft />
                <BackText>Back</BackText>
              </BackBtn>
              <Input
                lightShade
                label={`Enter author's ${formik.values.service} URL`}
                name="author"
                type="text"
                placeholder={`Enter authors ${formik.values.service} URL`}
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
            </InputContainer>
          ) :
          (
            <ServiceContainer>
              <Service onClick={handleServiceClick} source="Medium" icon={ServicesIcons.MEDIUM} />
              <Service onClick={handleServiceClick} source="Substack" icon={ServicesIcons.SUBSTACK} />
              <Service onClick={handleServiceClick} source="RSS Feed" icon={ServicesIcons.RSS} />
            </ServiceContainer>
          )}
        {!isServiceSelected ? (
          <CloseBtn onClick={handleClose}>
            <CloseText>Close</CloseText>
          </CloseBtn>
        ) : null}
      </Container>
    </BottomSheet>
  )
};

export default SubscriptionModal;
