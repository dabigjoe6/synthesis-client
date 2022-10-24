import styled from "styled-components";
import { COLORS } from "../config";
const Container = styled.button`
  width: 100%;
  margin-top: 20px;
  height: 35px;
  background: ${({ transparent }) =>
    transparent ? "transparent" : COLORS.PRIMARY};
  border-width: 0px;
  border-radius: 5px;
  color: ${COLORS.BACKGROUND};
`;

const Button = ({ label, onClick, ...props }) => {
  return (
    <Container onClick={onClick} {...props}>
      {label}
    </Container>
  );
};

export default Button;
