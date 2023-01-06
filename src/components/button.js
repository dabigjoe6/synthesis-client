import { useCallback } from "react";
import styled from "styled-components";
import { COLORS } from "../config";

const handleBackground = ({ disabled, transparent }) => {
  if (disabled) return "grey";
  if (transparent) return "transparent";

  return COLORS.PRIMARY;
};

const Container = styled.button`
  width: 100%;
  margin-top: 20px;
  height: 35px;
  background: ${({ disabled, transparent }) =>
    handleBackground({ disabled, transparent })};
  border-radius: 5px;
  color: ${({ transparent }) => (transparent ? "white" : COLORS.BACKGROUND_LIGHT)};
  border-width: 0;
`;

const Button = ({ label, onClick, disabled, loading, ...props }) => {
  const handleClick = useCallback(() => {
    if (!disabled) {
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
