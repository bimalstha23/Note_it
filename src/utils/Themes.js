import { createTheme } from '@mui/material/styles';

export const MainTheme = createTheme({
    palette: {
        primary: {
            main: '#121212',
        },
        secondary: {
            main: '#ffffff',
        },
        background: {
            //   paper:'#121212',
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#121212',
                    borderRadius: '25px',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                }
            }
        },
        MuiCardMedia: {
            styleOverrides: {
                root: {
                    backgroundColor: '#121212',
                    borderRadius: '25px',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                }
            }
        }
    },
  


});

export const SidebarTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});