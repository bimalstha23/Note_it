import React from 'react';
import { AppRouter } from './Routes/AppRouter.js';
import { AuthcontextProvider } from './Contexts/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import { MainTheme } from './utils/Themes.js';

function App() {
  const Theme = MainTheme;
  return (
    <ThemeProvider theme={Theme}>
      {/* <DBContextProvider> */}
        <AuthcontextProvider>
          <AppRouter />
        </AuthcontextProvider>
      {/* </DBContextProvider> */}
    </ThemeProvider>
  );
}
export default App;
