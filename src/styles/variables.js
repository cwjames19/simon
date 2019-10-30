import { breakpoints } from './breakpoints';

const color = {
  red: '#d80000',
  redActive: '#ff3535',
  yellow: '#d8d800',
  yellowActive: 'yellow',
  blue: '#0008af',
  blueActive: '#160aff',
  green: '#11bf01',
  greenActive: '#1af202',
  controlBoard: 'cornsilk',
  darkGrey: '#3b3b3d',
  activeButtonStroke: '#e8e8ba',
  powerButton: '#ADD8E6',
};

// Typography
const fontFamily = {
  title: `'Press Start 2P', 'system-ui', 'sans-serif'`,
};
const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
  extraBold: 800,
};
const fontSize = {
  error: '14px',
  phone: '16px',
  tablet: '18px',
};

// z-indices
const zIndex = {
  base: 1,
  board: 100,
  colors: 200,
  controls: 300,
};

// Easing functions
const easing = {
  easeOutSine: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeOutExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
  easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  easeInOutExpo: 'cubic-bezier(1, 0, 0, 1)',
};

const base = {
  fontFamily: 'Untitled Font Family',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '1.55',
  textColor: color.darkGrey,
};

const layout = {
  containerWidth: '984px',
  backgroundColor: color.white,
  zIndex: zIndex.base,
};

const variables = {
  color: { ...color },

  fontFamily: { ...fontFamily },

  fontWeight: { ...fontWeight },

  fontSize: { ...fontSize },

  zIndex: { ...zIndex },

  easing: { ...easing },

  breakpoint: { ...breakpoints },

  base: { ...base },

  layout: { ...layout },
};

export default variables;
