import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { media } from '../styles/breakpoints';

const StyledStrictButtonWrapper = styled.div`
  display: flex-inline;
  flex-flow: column nowrap;
  justify-self: center;
  align-self: flex-end;
  margin-bottom: 6px;
  position: relative;

  ${media.phoneMd} {
    margin-bottom: 4px;
  }
`;

const StyledStrictButtonContainer = styled.div`
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

const StyledStrictButton = styled.div`
  background-color: ${p => p.theme.color.yellow};
  border-radius: 50%;
  height: 16px;
  width: 16px;

  ${media.phoneMd} {
    width: 28px;
    height: 28px;
  }
`;

const StyledStrictLampContainer = styled.div`
  position: absolute;
  top: -10px;
  left: calc(50% - 3px);
  background-color: ${p => p.theme.color.darkGrey};
  border-radius: 50%;
  height: 6px;
  width: 6px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.phoneMd} {
    left: calc(50% - 4px);
    width: 8px;
    height: 8px;
  }
`;

const StyledStrictLamp = styled.div`
  background-color: ${p => p.theme.color.red};
  border-radius: 50%;
  height: 4px;
  width: 4px;
  display: ${p => p.strictMode ? 'initial' : 'none'};

${ media.phoneMd} {
  width: 6px;
  height: 6px;
}
`;

const StrictModeButton = function ({ onStrictClick, strictMode }) {

  return (
    <StyledStrictButtonWrapper>
      <StyledStrictButtonContainer>
        <StyledStrictButton onClick={onStrictClick} />
      </StyledStrictButtonContainer>
      <StyledStrictLampContainer>
        <StyledStrictLamp strictMode={strictMode} />
      </StyledStrictLampContainer>
    </StyledStrictButtonWrapper>
  );
};

StrictModeButton.propTypes = {
  onStrictClick: PropTypes.func.isRequired,
  strictMode: PropTypes.bool,
};

StrictModeButton.defaultProps = {
  strictMode: false,
};

export default StrictModeButton;
