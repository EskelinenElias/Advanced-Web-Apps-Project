// Source: https://github.com/mui/material-ui/tree/v6.4.6/docs/data/material/getting-started/templates/dashboard

import {  Theme, Components } from '@mui/material/styles';

export const structureCustomizations: Components<Theme> = {
  MuiStack: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
        Color: theme.palette.text
      }),
    },
  },
};
