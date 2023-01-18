import styled from 'styled-components';
import { COLORS } from '../../../config';
const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${COLORS.BACKGROUND_LIGHT};
  flex-direction: column;
  border-radius: 3px;
  padding-top: 50px;
  padding-bottom: 50px;
  width: 90%;
  max-width: 400px;
  padding-right: 20px;
  padding-left: 20px;
  box-sizing: border-box;
`;

export default Container;