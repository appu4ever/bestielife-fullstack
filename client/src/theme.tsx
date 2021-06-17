import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = { heading: 'Heading Font Name', body: 'Body Font Name' };

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

const theme = extendTheme({
  colors: {
    black: '#16161D',
    white: '#ffffff',
    blue: '#6b8eff',
    green: '#3cdb9b',
    orange: '#fb8c00',
    pink: '#ea6d8c',
  },
  fonts,
  breakpoints,
  radii: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
});

export default theme;
