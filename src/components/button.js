import styled from "styled-components";
import { COLORS } from "../config";

const handleBackground = ({ transparent, disabled }) => {
  if (disabled) return "grey";
  if (transparent) return "transparent";

  return COLORS.PRIMARY;
};

const Container = styled.button`
  width: 100%;
  margin-top: 20px;
  height: 35px;
  background: ${({ transparent, disabled }) =>
    handleBackground({ disabled, transparent })};
  border-radius: 5px;
  color: ${COLORS.BACKGROUND};
  border-width: 0;
`;

const Button = ({ label, onClick, disabled, loading, ...props }) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };
  return (
    <Container onClick={handleClick} {...props}>
      {loading ? "Loading..." : label}
    </Container>
  );
};

export default Button;
