import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { media } from '../styles/breakpoints';
import Display from './Display';
import StartButton from './StartButton';
import StrictModeButton from './StrictModeButton';

const StyledControlBoardContainer = styled.section`
  width: 100%;
  height: 100%;
  padding: 27.5%;
  background-color: transparent;
  z-index: ${p => p.theme.zIndex.controls};

  * {
    z-index: ${p => p.theme.zIndex.controls};
  }
`;

const StyledControlBoard = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  border-radius: 50%;
  background-color: ${p => p.theme.color.controlBoard};
`;

const StyledTitle = styled.h1`
  font-size: 1.2rem;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  font-family: ${p => p.theme.fontFamily.title};
  font-weight: ${p => p.theme.fontWeight.extraBold};
  color: ${p => p.theme.color.black};
  margin: 34px 0 12px 0;
  padding: 0px;
  text-align: center;

  ${media.phoneMd} {
    font-size: 2.1rem;
    letter-spacing: 0.1rem;
    margin: 62px 0 20px 0;
  }
`;

const StyledControlsContainer = styled.div`
  display: grid;
  grid-template-columns: 40px 4fr 2fr;
  grid-template-rows: 7fr 4fr;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  height: 33%;
  margin: 0;
  padding: 0 15px;

  h2 {
    font-size: 0.45rem;
    text-transform: uppercase;
    font-family: sans-serif;
    text-align: center;
  }

  ${media.phoneMd} {
    grid-template-columns: 75px 2fr 2fr;
    padding: 0 22px;

    h2 {
      font-size: 0.75rem;
      margin-top: 10px;
    }
  }
`;

const ControlBoard = function ({
  onStartClick, onStrictClick, strictMode, count,
}) {

  return (
    <StyledControlBoardContainer>
      <StyledControlBoard>
        <StyledTitle>Simon</StyledTitle>
        <StyledControlsContainer>
          <Display count={count} />
          <StartButton onStartClick={onStartClick} />
          <StrictModeButton onStrictClick={onStrictClick} strictMode={strictMode} />
          <h2>{null}</h2>
          <h2>Start</h2>
          <h2>Strict</h2>
        </StyledControlsContainer>
      </StyledControlBoard>
    </StyledControlBoardContainer>
  );
};

ControlBoard.propTypes = {
  onStartClick: PropTypes.func.isRequired,
  onStrictClick: PropTypes.func.isRequired,
  strictMode: PropTypes.bool,
  count: PropTypes.number,
};

ControlBoard.defaultProps = {
  strictMode: false,
  count: undefined,
};

export default ControlBoard;
