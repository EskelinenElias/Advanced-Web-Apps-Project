// Source: https://github.com/mui/material-ui/tree/v6.4.6/docs/data/material/getting-started/templates/dashboard

import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { colorSchemes, typography, shape } from './themePrimitives';
import { surfacesCustomizations } from './customizations/surfaces';
import { navigationCustomizations } from './customizations/navigation';
import { dataDisplayCustomizations } from './customizations/dataDisplay';
import { structureCustomizations } from './customizations/structure';

interface AppThemeProps {
  children: React.ReactNode;
}

const theme = createTheme({
  colorSchemes,
  typography,
  //shadows,
  shape,
  components: {
    ...surfacesCustomizations,
    ...navigationCustomizations,
    ...dataDisplayCustomizations,
    ...structureCustomizations
  }
})

export default function AppTheme(props: AppThemeProps) {
  const { children } = props;
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}

