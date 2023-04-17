import * as React from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';

import ComponentText from './text';
import { Colors } from '../config';
import * as _ from 'lodash';
import { SettingsContext } from '../contexts/Settings';
import { AuthContext } from '../contexts/Auth';

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
`;

const Text = styled(ComponentText)`
  color: ${Colors.PRIMARY};
  font-size: 0.75rem;
`;

const SummarySettings = () => {
  const { user } = React.useContext(AuthContext);
  const { enableSummary, disableSummary } = React.useContext(SettingsContext);


  const [isSummaryOn, setIsSummaryOn] = React.useState<boolean>(user?.settings?.isSummaryEnabled || true);
  const [isLoading, setIsLoading] = React.useState(false);


  const handleChange = () => {
    setIsSummaryOn(prevSummaryOn => !prevSummaryOn);
  };


  const currentSummaryValue = React.useRef<boolean>();
  currentSummaryValue.current = isSummaryOn;

  React.useEffect(() => {
    const debounceFunc = _.debounce(() => {
      setIsLoading(true);
      if (currentSummaryValue.current) {
        enableSummary(() => { setIsLoading(false) });
      } else {
        disableSummary(() => { setIsLoading(false) });
      }
    }, 200);

    debounceFunc();
  }, [isSummaryOn])

  return (
    <Container>
      <Text>{`Summaries of digest (${isSummaryOn ? 'On' : 'Off'})`}</Text>
      <Switch
        disabled={isLoading}
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