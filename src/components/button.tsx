import * as React from "react";
import styled from "styled-components";
import { Colors } from "../config";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  loading?: boolean;
  transparent?: boolean;
  onClick: () => void;
}

const handleBackground = ({ disabled, transparent }: {
  disabled?: boolean;
  transparent?: boolean;
}) => {
  if (disabled) return "grey";
  if (transparent) return "transparent";

  return Colors.PRIMARY;
};

const Container = styled.button<{
  transparent?: boolean;
}>`
  width: 100%;
  margin-top: 20px;
  height: 35px;
  background: ${({ disabled, transparent }) =>
    handleBackground({ disabled, transparent })};
  border-radius: 5px;
  color: ${({ transparent }) =>
    transparent ? "white" : Colors.BACKGROUND_LIGHT};
  border-width: 0;
`;

const Button = ({ label, onClick, disabled, loading, ...props }: ButtonProps) => {
  const handleClick = React.useCallback(() => {
    if (!disabled && !loading) {
      onClick();
    }
  }, [disabled]);
  return (
    <Container disabled={disabled} onClick={handleClick} {...props}>
      {loading ? "Loading..." : label}
    </Container>
  );
};

export default Button;
