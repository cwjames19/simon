import { createGlobalStyle } from 'styled-components';
import { media } from './breakpoints';

const Base = createGlobalStyle`
  html {
    -webkit-text-size-adjust: none;
  }

  body {
    // background-color: ${p => p.theme.color.backgroundColor};
    // font-weight: ${p => p.theme.base.fontWeight};
    // font-size: ${p => p.theme.base.fontSize};
    // line-height: ${p => p.theme.base.lineHeight};
    // font-family: ${p => p.theme.base.fontFamily};
    // color: ${p => p.theme.base.textColor};
    // -webkit-font-smoothing: antialiased;
    // -moz-osx-font-smoothing: grayscale;

    ${media.tablet} {
      font-size: ${p => p.theme.fontSize.tablet};
    }
  }

  img,
  svg {
    vertical-align: middle;
  }

  svg {
    fill: currentColor;
  }
`;

export default Base;
