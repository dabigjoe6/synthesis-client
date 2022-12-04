import styled from "styled-components";
import { COLORS } from "../config";

const TextInput = styled.input`
  height: 30px;
  margin-top: 5px;
  border-width: 0px;
  border-radius: 5px;
  background: ${({ lightShade }) =>
    lightShade ? COLORS.BACKGROUND_LIGHT : COLORS.BACKGROUND};
  color: white;
  padding-right: 7px;
  padding-left: 7px;
  font-size: 0.8rem;
`;

export default TextInput;
