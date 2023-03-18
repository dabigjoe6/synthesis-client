import * as React from 'react';
import Text from './text';
import { GiPauseButton, GiPlayButton } from 'react-icons/gi';
import styled from 'styled-components';
import { Colors } from '../config';
import { AuthContext } from '../contexts/Auth';
import { SettingsContext } from '../contexts/Settings';

const Container = styled.div`
  position: relative;
  bottom: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  flex-direction: column;
`

const InnerContainer = styled.div<{
  isDigestPaused?: boolean
}>`
  display: flex;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 4px;
  background-color: ${({ isDigestPaused }) => isDigestPaused ? Colors.PRIMARY : Colors.BACKGROUND_LIGHT};
  color: ${({ isDigestPaused }) => isDigestPaused ? Colors.BACKGROUND : Colors.PRIMARY};
  font-size: 0.8rem;
  margin-top: 10px;
  max-width: 120px;
  align-items: center;

`

const IconContainer = styled.div`
  margin-right: 5px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ResumeContainer = styled.div`
  padding: 20px;
  border-radius: 4px;
  background: ${Colors.BACKGROUND_LIGHT};
  display: flex;
  flex-direction: column;
  align-items: center;
`


const PauseDigest = () => {

  const { user } = React.useContext(AuthContext);
  const { pauseDigest, resumeDigest } = React.useContext(SettingsContext);

  const [isLoading, setIsLoading] = React.useState(false);

  const isUserDigestPaused = () => {
    if (user && user.settings && (typeof user.settings.isDigestPaused === "boolean") && user.settings.isDigestPaused) {
      return true;
    } else if (user && user.settings && (typeof user.settings.isDigestPaused === "boolean") && !user.settings.isDigestPaused) {
      return false
    } else if (user?.settings?.isDigestPaused === undefined) {
      return false
    } else {
      return false
    }
  }

  const handleResumeDigest = () => {
    setIsLoading(true);
    resumeDigest(() => {
      setIsLoading(false);
    });
  }

  const handlePauseDigest = async () => {
    setIsLoading(true);
    pauseDigest(() => {
      setIsLoading(false);
    });
  }

  const handleDigest = (isUserDigestPaused: boolean) => {
    if (isUserDigestPaused) {
      handleResumeDigest();
    } else {
      handlePauseDigest();
    }
  }

  const renderInnerContainer = () => {
    if (user && user.settings && (typeof user.settings.isDigestPaused === "boolean") && user.settings.isDigestPaused) {
      return renderResume(true, isLoading);
    } else if (user && user.settings && (typeof user.settings.isDigestPaused === "boolean") && !user.settings.isDigestPaused) {
      return renderPause(false, isLoading);
    } else if (user?.settings?.isDigestPaused === undefined) {
      return renderPause(false, isLoading);
    }
  }

  const renderPause = (isDigestPaused: boolean, isLoading: boolean) => (
    <InnerContainer isDigestPaused={isDigestPaused} onClick={() => handleDigest(isUserDigestPaused())}>
      <IconContainer>
        <GiPauseButton />
      </IconContainer>
      {isLoading ? "Loading..." : "Pause digest"}
    </InnerContainer>
  )

  const renderResume = (isDigestPaused: boolean, isLoading: boolean) => (
    <ResumeContainer>
      <Text>Your digest is paused, start receiving it again.</Text>
      <InnerContainer isDigestPaused={isDigestPaused} onClick={() => handleDigest(isUserDigestPaused())}>
        <IconContainer>
          <GiPlayButton />
        </IconContainer>
        {isLoading ? "Loading..." : "Resume digest"}
      </InnerContainer>
    </ResumeContainer>
  )

  return (
    <Container>
      {renderInnerContainer()}
    </Container>
  )
};

export default PauseDigest