import * as localesCore from '@mui/material/locale';
import { ThemeOptions } from '@mui/material/styles';
import * as localesDataGrid from '@mui/x-data-grid';

type SupportedLocales = 'enUS' | 'trTR';

export const convertLanguateToMUILocale = (loc: string) => {
  // DataGrid locales only supports enUS for English language
  if (loc === 'en-UK' || loc === 'en-GB') {
    return 'enUS';
  }
  return loc.replace('-', '');
};

export const getMUILocale = (language: string) =>
  localesCore[convertLanguateToMUILocale(language) as SupportedLocales];

export const getDataGridMUILocale = (language: string) =>
  localesDataGrid[convertLanguateToMUILocale(language) as SupportedLocales];

// https://mui.com/customization/theming/#custom-variables
declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      chart: {
        colors: {
          success: string;
          warning: string;
          error: string;
          pieColors: string[];
        };
      };
    };
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    custom: {
      chart: {
        colors: {
          success: string;
          warning: string;
          error: string;
          pieColors: string[];
        };
      };
    };
  }
}

/**
 * Custom MUI Theme Options
 * @see https://material-ui.com/customization/themes/
 */
export const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'Gilroy, sans-serif',
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.9375rem',
      fontWeight: 400,
      lineHeight: 1.57,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: '0.9375rem',
      fontWeight: 400,
      lineHeight: '1.25rem',
    },
    h1: {
      fontWeight: 700,
      fontSize: '1.5625rem',
      lineHeight: '1.8125rem',
    },
    h2: {
      fontWeight: 400,
      fontSize: '1.5625rem',
      lineHeight: '1.8125rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: '1.345rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: '1.1875rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5625rem',
      lineHeight: '2.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.375,
    },
  },
  palette: {
    background: {
      default: '#F4F5FA',
      paper: '#FDFDFD',
    },
    primary: {
      light: '#61518b',
      main: '#3A266F',
      dark: '#281a4d',
      contrastText: '#fdfdfd',
    },
    secondary: {
      light: '#8f689b',
      main: '#734383',
      dark: '#502e5b',
      contrastText: '#fdfdfd',
    },
    text: {
      primary: '#304767',
      secondary: '#6E7380',
    },
    success: {
      main: '#2E7D32',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#0288D1',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#ED6C02',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#D32F2F',
      light: '#FF6D6D',
      contrastText: '#FFFFFF',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {},
        body: {},
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h5',
        },
        subheaderTypographyProps: {
          variant: 'subtitle2',
        },
      },
      styleOverrides: {
        root: {
          padding: '32px 24px',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          padding: '10px 0 10px',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            fontWeight: 'bold',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
          textTransform: 'none',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
        helperText: ' ',
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
  // https://mui.com/customization/theming/#custom-variables
  custom: {
    chart: {
      colors: {
        success: '#3eab49',
        warning: '#ffbf11',
        error: '#fd5236',
        pieColors: ['#63b6fc', '#13ecac', '#ff7171'],
      },
    },
  },
};
