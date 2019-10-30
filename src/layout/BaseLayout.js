import React from 'react';
import styled, { ThemeProvider } from 'styled-components/macro';
import variables from '../styles/variables';
import StylesReset from '../styles/reset';
import StylesBase from '../styles/base';

const StyledPageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${p => p.theme.layout.backgroundColor};
  z-index: ${p => p.theme.layout.zIndex};
`;

const BaseLayout = function (props) {
  return (
    <ThemeProvider theme={variables}>
      <React.Fragment>
        <StylesReset />
        <StylesBase />
        <StyledPageWrapper>
          {props.children}
        </StyledPageWrapper>
      </React.Fragment>
    </ThemeProvider>
  )
};

export default BaseLayout;

