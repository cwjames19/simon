import React from 'react';
import PropTypes from 'prop-types';
import { media } from '../styles/breakpoints';
import styled from 'styled-components/macro';

const StyledDisplay = styled.div`
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  background-color: black;
  border-radius: 10px;
  position: relative;
  top: 0px;
  font-size: 26px;
  font-family: monospace;
  text-align: right;

  span {
    line-height: normal;
    width: 100%;
    text-align: center;
    color: ${p => p.theme.color.red};
  }

  ${media.phoneMd} {
    height: 50px;
    border-radius: 15px;
    font-size: 40px;
  }

`;

const formatCount = function (num) {
  return String(num).length === 1 ? `0${num}` : `${num}`;
}

const Display = function ({ count }) {
  return (
    <StyledDisplay>
      {count !== null &&
        <span>{formatCount(count)}</span>
      }
    </StyledDisplay>
  );
};

Display.propTypes = {
  count: PropTypes.number,
};

Display.defaultProps = {
  count: null,
}

export default Display;
