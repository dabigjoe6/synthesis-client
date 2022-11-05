import styled from "styled-components";
import { COLORS } from "../config";

const Select = styled.select`
  height: 35px;
  margin-top: 7px;
  border-radius: 5px;
  border-width: 0px;
  padding-left: 3px;
  color: white;
  background: ${COLORS.BACKGROUND_LIGHT};
`;

const DropdownInput = ({ value, values, onSelect }) => {
  return (
    <Select value={value} onChange={onSelect}>
      {values.map((value, index) => (
        <option key={index} value={value}>
          {value}
        </option>
      ))}
    </Select>
  );
};

export default DropdownInput;
