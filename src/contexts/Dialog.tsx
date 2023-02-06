import * as React from "react";
import { useState, createContext, useRef } from "react";

interface DisplayDialog {
  dialog: string;
  primaryAction: ActionType | null;
  secondaryAction?: ActionType | null;
}

interface Action {
  action: () => void;
  text: string
}

type ActionType = Action | (() => void);

interface DialogContextI {
  dialog: string;
  isModalVisible: boolean;
  displayDialog: (dialog: DisplayDialog) => void;
  dialogPrimaryAction: React.MutableRefObject<ActionType | null> | null;
  dialogSecondaryAction: React.MutableRefObject<ActionType | null> | null;
  resetModal: () => void;
}

export const DialogContext = createContext<DialogContextI>({
  dialog: "",
  dialogPrimaryAction: null,
  dialogSecondaryAction: null,
  isModalVisible: false,
  displayDialog: () => { },
  resetModal: () => { }
});

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [dialog, setDialog] = useState("");

  const dialogPrimaryAction = useRef<ActionType | null>(null);
  const dialogSecondaryAction = useRef<ActionType | null>(null);

  const displayDialog = ({ dialog, primaryAction, secondaryAction }: DisplayDialog) => {
    setDialog(dialog);
    dialogPrimaryAction.current = primaryAction

    if (secondaryAction) {
      dialogSecondaryAction.current = secondaryAction;
    }

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
