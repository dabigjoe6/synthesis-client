import styled from "styled-components";
import { COLORS } from "../config";

const Select = styled.select`
  height: 35px;
  margin-top: 7px;
  border-radius: 5px;
  border-width: 0px;
  padding-left: 3px;
  color: white;
  background: ${COLORS.BACKGROUND_LIGHT}
`;

const DropdownInput = () => {
  return (
    <Select>
      <option value="medium">Medium</option>
    </Select>
  );
};

export default DropdownInput;
