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

const handleTextAlignment = (align) => {
  switch (align) {
    case "center":
      return "center";
    default:
      return "";
  }
};

const Text = styled.p`
  margin-bottom: 0px;
  margin: 0px;
  color: white;
  font-size: ${({ fontSize }) => handleFontSize(fontSize)};
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
  text-align: ${({ align }) => handleTextAlignment(align)};
`;

export default Text;
