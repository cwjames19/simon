import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/macro';
import variables from '../styles/variables';

const StyledColorButtonWrapper = styled.div(props => {
  return css`
    position: absolute;
    width: 50%;
    height: 50%;
    z-index: ${props.theme.zIndex.colors};

    ${props.variantStyles}
  `;
});

const StyledSVG = styled.svg`
  height: 100%;
  width: 100%;
  z-index: inherit;
`;

const ColorButton = function ({ data: { viewBox, path, color, styles }, activeColors, onButtonClick }) {
  const visibleColor = variables.color[`${color}${activeColors.includes(color) ? 'Active' : ''}`];

  return (
    <StyledColorButtonWrapper variantStyles={styles}>
      <StyledSVG
        xmlns="http://www.w3c.com/2000/svg"
        version="1.1"
        baseProfile="full"
        viewBox={viewBox}
      >
        <path d={path} stroke={visibleColor} fill={visibleColor} onClick={() => { onButtonClick(color) }} />
      </StyledSVG>
    </StyledColorButtonWrapper>
  );
};

ColorButton.propTypes = {
  data: PropTypes.shape({
    viewBox: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    styles: PropTypes.array.isRequired,
  }),
};

export default ColorButton;
