import * as React from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import styled from 'styled-components';
import Text from '../text';
import FrequencyType from './frequency-type';
import FrequencyTime from './frequency-time';
import FrequencyWeek from './frequency-week';
import { Colors } from '../../config';
import { FrequencyContext } from '../../contexts/Frequency';
import FrequencyActions from './frequency-actions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 0px;
  align-items: center;
  padding-right: 10px;
  padding-left: 10px;
  height: 75px;
`

const InnerContainer = styled.div`
  display: flex;
  padding-top: 10px;
  color: ${Colors.SECONDARY};
  font-size: 0.9rem;
  flex-wrap: wrap;
  gap: 5px 0px;
  justify-content: center;
  margin-bottom: 10px;
`;

const ActionContainer = styled.div`
  display: flex;
  margin-left: 10px;
  align-items: center;
  width: 35px;
  justify-content: space-between;
`;

const FrequencyTimeContainer = styled.div`
  display: flex;
`

const FrequencyTimeWrapper = styled.div`
  display: flex;
  margin-left: 5px;
  color: white;
`


const renderFrequencyTimes = (times: Array<string>) => {
  return times.map((time, index) => {
    return (
      <FrequencyTimeWrapper key={time + "_" + index}>
        <FrequencyTime key={index} time={time} index={index} />
        {index === times.length - 1 ? null : ", "}
      </FrequencyTimeWrapper>
    )
  })
}

const AddTime = ({ onClick }: { onClick: () => void; }) => {

  const handleClick = () => { onClick() }
  return <AiOutlinePlus style={{ cursor: 'pointer' }} onClick={handleClick} />
}

const RemoveTime = ({ onClick }: { onClick: () => void; }) => {
  const handleClick = () => { onClick() }
  return <AiOutlineMinus style={{ cursor: 'pointer' }} onClick={handleClick} />
}




const Frequency = () => {
  const { frequencyType, times, addTime, removeTime, isNewChange } = React.useContext(FrequencyContext);

  return (
    <Container>
      <InnerContainer>
        <Text>Send</Text>
        <FrequencyType />
        {frequencyType === 'weekly' ? <FrequencyWeek /> : null}
        <Text>at</Text>
        <FrequencyTimeContainer>
          {renderFrequencyTimes(times)}
        </FrequencyTimeContainer>
        <ActionContainer>
          {times.length > 1 ? <RemoveTime onClick={removeTime} /> : null}
          {times.length === 3 ? null : <AddTime onClick={addTime} />}
        </ActionContainer>
      </InnerContainer>
      {isNewChange ? <FrequencyActions /> : null}
    </Container>
  )
};

export default Frequency