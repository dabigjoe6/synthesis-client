import * as React from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';

import ComponentText from './text';
import { Colors } from '../config';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  align-self: center;
  background: ${Colors.BACKGROUND_LIGHT};
  padding: 5px;
  padding-right: 15px;
  border-radius: 4px;
  position: relative;
  top: 45px;
`;

const Text = styled(ComponentText)`
  color: ${Colors.PRIMARY};
  font-size: 0.75rem;
`;

const SummarySettings = () => {
  const [isSummaryOn, setIsSummaryOn] = React.useState(true);

  const handleChange = () => {
    setIsSummaryOn(isSummaryOn => !isSummaryOn);
  };


  return (
    <Container>
      <Text>{`Summaries of digest (${isSummaryOn ? 'On' : 'Off'})`}</Text>
      <Switch
        onChange={handleChange}
        checked={isSummaryOn}
        onColor={Colors.PRIMARY}
        offColor={Colors.BACKGROUND_LIGHT}
        offHandleColor={Colors.PRIMARY}
        onHandleColor={Colors.BACKGROUND_LIGHT}
        height={18}
        width={40}
      />
    </Container>
  )
};

export default SummarySettings;