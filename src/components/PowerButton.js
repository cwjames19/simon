import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { media } from '../styles/breakpoints';

const StyledPowerButtonContainer = styled.div`
  width: 26px;
  height: 16px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 3px;
  background-color: ${p => p.theme.color.darkGrey};

  ${media.phoneMd} {
    padding: 5px;
    width: 58px;
    height: 34px;
  }
`;

const StyledPowerButton = styled.input`
  height: 10px;
  width: 10px;
  background-color: ${p => p.theme.color.powerButton};
  justify-self: flex-start;
  transition: justify-content 300ms ease-out;

  &.on {
    justify-self: flex-end;
  }

  ${media.phoneMd} {
    height: 24px;
    width: 24px;
  }
`;

const PowerButton = function (props) {
  return (
    <StyledPowerButtonContainer>
      <StyledPowerButton type="checkbox" />
    </StyledPowerButtonContainer>
  );
};

// PowerButton.propTypes = {

// };

// PowerButton.defaultProps = {

// };

export default PowerButton;
