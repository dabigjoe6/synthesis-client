import styled from "styled-components";
const Container = styled.button`
  width: 100%;
  margin-top: 20px;
  height: 35px;
  background: #66ced6;
  border-width: 0px;
  border-radius: 5px;
  color: #0d1117;
`;

const Button = ({ label, onClick, ...props }) => {
  return <Container onClick={onClick} {...props}>{label}</Container>;
};

export default Button;
