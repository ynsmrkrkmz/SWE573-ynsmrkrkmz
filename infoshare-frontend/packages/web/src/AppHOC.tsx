import { LocaleMap } from '@infoshare/utils/constants';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useAppContext } from 'contexts/AppContext';
import { AuthProvider } from 'contexts/AuthContext';
import useHandleError from 'hooks/useHandleError';
import React, { FC, ReactNode, useMemo } from 'react';
import { getDataGridMUILocale, getMUILocale, themeOptions } from './contexts/ThemeContext';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  QueryKey,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryError } from 'types';
import api from 'services/api';

let _queryClientCache: QueryClient;

const AppHOC: FC<{ children: ReactNode }> = ({ children }) => {
  const { language } = useAppContext();
  const handleError = useHandleError();

  /**
   * Create a MUI theme with i18n locale
   * It changes default localized strings for the data grid component etc.
   * @see https://mui.com/material-ui/guides/localization/
   * @see https://mui.com/x/react-data-grid/localization/
   */
  const themeWithLocale = useMemo(
    () => createTheme(themeOptions, getDataGridMUILocale(language), getMUILocale(language)),
    [language]
  );

  const defaultQueryFn = async <T,>({ queryKey }: { queryKey: QueryKey }) => {
    const { data } = await api.fetch<T>({
      url: queryKey[0] as string,
    });
    return data;
  };
  /**
   * Create a QueryClient
   * It has to be created only once
   * @see https://react-query.tanstack.com/reference/QueryClient
   * @see https://react-query.tanstack.com/reference/QueryClientProvider
   */
  _queryClientCache =
    _queryClientCache ??
    new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => {
          handleError(new Error((error as ReactQueryError).response?.data?.meta?.message));
        },
      }),
      mutationCache: new MutationCache({
        onError: (error) => {
          handleError(new Error((error as ReactQueryError).response?.data?.meta?.message));
        },
      }),
      defaultOptions: {
        queries: {
          queryFn: defaultQueryFn,
          refetchOnWindowFocus: false,
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={LocaleMap[language]}>
      <QueryClientProvider client={_queryClientCache}>
        <ThemeProvider theme={themeWithLocale}>
          <AuthProvider>{children}</AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
};

export default AppHOC;
