import styled from "styled-components";

enum FontSize {
  "xl" = "xl",
  "lg" = "lg",
  "sm" = "sm"
}

const handleFontSize = (fontSize: FontSize | undefined) => {
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

const handleTextAlignment = (align: string | undefined) => {
  switch (align) {
    case "center":
      return "center";
    default:
      return "";
  }
};

const Text = styled.p<{
  fontSize?: FontSize;
  bold?: boolean;
  align?: string;
}>`
  margin-bottom: 0px;
  margin: 0px;
  color: white;
  font-size: ${({ fontSize }) => handleFontSize(fontSize)};
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
  text-align: ${({ align }) => handleTextAlignment(align)};
`;

export default Text;
