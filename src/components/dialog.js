import { useContext, useCallback } from "react";
import styled from "styled-components";
import { DialogContext } from "../contexts/Dialog";
import Button from "./button";
import { COLORS } from "../config";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #00000050;
  position: absolute;
  align-items: center;
  justify-content: center;
  color: white;
`;

const ModalContainer = styled.div`
  display: flex;
  border-radius: 7px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  padding-left: 20px;
  justify-content: center;
  align-items: center;
  background: ${COLORS.BACKGROUND};
  box-shadow: rgba(102, 206, 214, 0.2) 0px 12px 28px 0px,
    rgba(102, 206, 214, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  flex-direction: column;
`;

const DialogText = styled.h3`
  color: white;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ActionButton = styled(Button)`
  width: 100px;
  margin-right: 5px;
  margin-left: 5px;
`;

const Dialog = () => {
  const {
    isModalVisible,
    dialog,
    dialogPrimaryAction,
    dialogSecondaryAction,
    resetModal,
  } = useContext(DialogContext);

  const handlePrimaryAction = useCallback(() => {
    let primaryActionText = "Yes";
    let action;
    if (typeof dialogPrimaryAction.current === "object") {
      primaryActionText = dialogPrimaryAction.current.text;
      action = dialogPrimaryAction.current.action;
    } else {
      action = dialogPrimaryAction.current;
    }

    const handleAction = async () => {
      await action();
      resetModal();
    };

    return <ActionButton onClick={handleAction} label={primaryActionText} />;
  }, []);

  const handleSecondaryAction = useCallback(() => {
    let secondaryActionText = "No";
    let action;
    if (typeof dialogSecondaryAction.current === "object") {
      secondaryActionText = dialogSecondaryAction.current.text;
      action = dialogSecondaryAction.current.action;
    } else if (typeof dialogSecondaryAction.current === "function") {
      action = dialogSecondaryAction.current;
    }

    const handleAction = async () => {
      if (action) {
        await action();
      }
      resetModal();
    };

    return <ActionButton onClick={handleAction} label={secondaryActionText} />;
  }, []);

  return !isModalVisible ? null : (
    <Container>
      <ModalContainer>
        <DialogText>{dialog}</DialogText>
        <Actions>
          {handlePrimaryAction()}
          {handleSecondaryAction()}
        </Actions>
      </ModalContainer>
    </Container>
  );
};

export default Dialog;
