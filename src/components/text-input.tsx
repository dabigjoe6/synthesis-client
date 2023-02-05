import styled from "styled-components";
import { Colors } from "../config";

const TextInput = styled.input<{
  lightShade?: boolean;
}>`
  height: 30px;
  margin-top: 5px;
  border-width: 0px;
  border-radius: 5px;
  background: ${({ lightShade }) =>
    lightShade ? Colors.BACKGROUND_LIGHT : Colors.BACKGROUND};
  color: white;
  padding-right: 7px;
  padding-left: 7px;
  font-size: 0.8rem;
`;

export default TextInput;
