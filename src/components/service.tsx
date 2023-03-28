import * as React from 'react';
import styled from 'styled-components';
import { CiCircleChevRight } from 'react-icons/ci';
import { Colors } from '../config';
import Text from './text';

interface ServiceProps {
  source: string;
  icon: string;
  onClick: (source: string) => void;
};

const Container = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 5px;
  border-style: solid;
  border-width: 0.5px;
  border-color: ${Colors.PRIMARY};
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  color: ${Colors.PRIMARY};
`;

const Image = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  margin-bottom: 5px;
`;

const Service = ({ source, icon, onClick }: ServiceProps) => {
  const handleClick = () => {
    onClick(source);
  };

  return (
    <Container onClick={handleClick}>
      <Image src={icon} alt={`${source} icon`} />
      <InnerContainer>
        <Text>{source}</Text>
        <CiCircleChevRight />
      </InnerContainer>
    </Container>
  )
};

export default Service;
