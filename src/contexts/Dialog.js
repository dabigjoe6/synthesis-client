import { useState, createContext, useRef } from "react";

export const DialogContext = createContext({
  dialog: "",
  primaryAction: null,
  secondaryAction: null,
  showModal: false,
});

export const DialogProvider = ({ children }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [dialog, setDialog] = useState("");

  const dialogPrimaryAction = useRef(null);
  const dialogSecondaryAction = useRef(null);

  const displayDialog = ({ dialog, primaryAction, secondaryAction }) => {
    setDialog(dialog);
    dialogPrimaryAction.current = primaryAction;
    dialogSecondaryAction.current = secondaryAction;
    setModalVisible(true);
  };

  const resetModal = () => {
    setDialog("");
    dialogPrimaryAction.current = null;
    dialogSecondaryAction.current = null;
    setModalVisible(false);
  };

  return (
    <DialogContext.Provider
      value={{
        dialog,
        dialogPrimaryAction,
        dialogSecondaryAction,
        isModalVisible,
        displayDialog,
        resetModal,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};
