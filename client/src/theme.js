import { createTheme } from '@mui/material/styles';

const createCustomTheme = () => {
  const theme = createTheme({

  });

  return createTheme(theme, {
    components: {
        MuiButton: {
            styleOverrides: {
                root: { 
                  margin: theme.spacing(1)
                }
            }
        }
    },
    palette: {
      primary: {
        main: '#0052cc',
      },
      secondary: {
        main: '#f50057',
      },
    },
});
};

export const theme = createTheme(createCustomTheme());