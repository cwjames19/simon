export const breakpoints = {
  phone: 320,
  phoneMd: 576,
  tablet: 768,
  desktop: 1024,
  desktopMd: 1200,
  desktopLaptop: 1366,
};

const customMediaQuery = maxWidth => `@media (min-width: ${maxWidth}px)`;
const customMediaLandscapeQuery = maxWidth => `@media (min-height: ${maxWidth}px) and (orientation: landscape)`;

export const media = {
  phone: customMediaQuery(breakpoints.phone),
  phoneLandscape: customMediaLandscapeQuery(breakpoints.phone),
  phoneMd: customMediaQuery(breakpoints.phoneMd),
  phoneMdLandscape: customMediaLandscapeQuery(breakpoints.phoneMd),
  tablet: customMediaQuery(breakpoints.tablet),
  tabletLandscape: customMediaLandscapeQuery(breakpoints.tablet),
  desktop: customMediaQuery(breakpoints.desktop),
  desktopMd: customMediaQuery(breakpoints.desktopMd),
  desktopLaptop: customMediaQuery(breakpoints.desktopLaptop),
  custom: customMediaQuery,
};
