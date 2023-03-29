import styled from "styled-components";
import { Colors } from "../../config";

const FrequencySelect = styled.select`
  color: ${Colors.PRIMARY};
  text-decoration: underline;
  background: transparent;
  border-width: 0;
  /* for Firefox */
  -moz-appearance: none;
  /* for Chrome */
  -webkit-appearance: none;
`;

export default FrequencySelect