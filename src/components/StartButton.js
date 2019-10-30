import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { media } from '../styles/breakpoints';


const StyledStartButtonWrapper = styled.div`
  display: flex-inline;
  flex-flow: column nowrap;
  justify-self: center;
  align-self: flex-end;
  margin-bottom: 6px;

  ${media.phoneMd} {
    margin-bottom: 4px;
  }
`;

const StyledStartButtonContainer = styled.div`
  background-color: ${p => p.theme.color.darkGrey};
  border-radius: 50%;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.phoneMd} {
    width: 36px;
    height: 36px;
  }
`;

const StyledStartButton = styled.div`
  background-color: ${p => p.theme.color.red};
  border-radius: 50%;
  height: 16px;
  width: 16px;

  ${media.phoneMd} {
    width: 28px;
    height: 28px;
  }
`;

const StartButton = function ({ onStartClick }) {
  return (
    <StyledStartButtonWrapper>
      <StyledStartButtonContainer>
        <StyledStartButton onClick={onStartClick} />
      </StyledStartButtonContainer>
    </StyledStartButtonWrapper>
  );
};

StartButton.propTypes = {
  onStartClick: PropTypes.func.isRequired,
};

// StartButton.defaultProps = {

// };

export default StartButton;
