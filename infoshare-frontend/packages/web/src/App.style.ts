import { css } from '@emotion/react';
import styled from '@emotion/styled';

const GlobalStyles = css`
  /* Fix components wrapped with NavLink */
  a,
  a:link,
  a:visited,
  a:active {
    text-decoration: none;
    color: inherit;
  }
`;

export const AppLoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
`;

export default GlobalStyles;
