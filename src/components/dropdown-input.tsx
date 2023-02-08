import * as React from 'react';
import styled from "styled-components";
import { Colors } from "../config";

const Select = styled.select`
  height: 35px;
  margin-top: 7px;
  border-radius: 5px;
  border-width: 0px;
  padding-left: 3px;
  color: white;
  background: ${Colors.BACKGROUND_LIGHT};
`;

const DropdownInput = ({ value, values, onSelect, ...props }: {
  name: string;
  value: string;
  values: string[];
  onSelect: (e: React.ChangeEvent) => void;
}) => {
  return (
    <Select value={value} onChange={onSelect} {...props}>
      {values.map((value, index) => (
        <option key={index} value={value}>
          {value}
        </option>
      ))}
    </Select>
  );
};

export default DropdownInput;
