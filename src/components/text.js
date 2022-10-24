import styled from "styled-components";

const handleFontSize = (fontSize) => {
  switch (fontSize) {
    case "xl":
      return "2.5rem";
    case "lg":
      return "1.5rem";
    case "sm":
      return "0.7rem";
    default:
      return "0.9rem";
  }
};

const Text = styled.text`
  color: white;
  font-size: ${({ fontSize }) => handleFontSize(fontSize)};
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
`;

export default Text;
