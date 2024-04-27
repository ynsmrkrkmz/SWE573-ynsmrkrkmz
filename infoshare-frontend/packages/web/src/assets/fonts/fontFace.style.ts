import { css } from '@emotion/react';

import GilroyBlack from './Gilroy/Gilroy-Black.woff';
import GilroyBlack2 from './Gilroy/Gilroy-Black.woff2';

import GilroyBold from './Gilroy/Gilroy-Bold.woff';
import GilroyBold2 from './Gilroy/Gilroy-Bold.woff2';

import GilroyBlackItalic from './Gilroy/Gilroy-BlackItalic.woff';
import GilroyBlackItalic2 from './Gilroy/Gilroy-BlackItalic.woff2';

import GilroyExtraBoldItalic from './Gilroy/Gilroy-ExtraBoldItalic.woff';
import GilroyExtraBoldItalic2 from './Gilroy/Gilroy-ExtraBoldItalic.woff2';

import GilroyExtraBold from './Gilroy/Gilroy-ExtraBold.woff';
import GilroyExtraBold2 from './Gilroy/Gilroy-ExtraBold.woff2';

import GilroyBoldItalic from './Gilroy/Gilroy-BoldItalic.woff';
import GilroyBoldItalic2 from './Gilroy/Gilroy-BoldItalic.woff2';

import GilroyHeavy from './Gilroy/Gilroy-Heavy.woff';
import GilroyHeavy2 from './Gilroy/Gilroy-Heavy.woff2';

import GilroyHeavyItalic from './Gilroy/Gilroy-HeavyItalic.woff';
import GilroyHeavyItalic2 from './Gilroy/Gilroy-HeavyItalic.woff2';

import GilroyLightItalic from './Gilroy/Gilroy-LightItalic.woff';
import GilroyLightItalic2 from './Gilroy/Gilroy-LightItalic.woff2';

import GilroyLight from './Gilroy/Gilroy-Light.woff';
import GilroyLight2 from './Gilroy/Gilroy-Light.woff2';

import GilroyMediumItalic from './Gilroy/Gilroy-MediumItalic.woff';
import GilroyMediumItalic2 from './Gilroy/Gilroy-MediumItalic.woff2';

import GilroySemiBold from './Gilroy/Gilroy-SemiBold.woff';
import GilroySemiBold2 from './Gilroy/Gilroy-SemiBold.woff2';

import GilroyRegular from './Gilroy/Gilroy-Regular.woff';
import GilroyRegular2 from './Gilroy/Gilroy-Regular.woff2';

import GilroyRegularItalic from './Gilroy/Gilroy-RegularItalic.woff';
import GilroyRegularItalic2 from './Gilroy/Gilroy-RegularItalic.woff2';

import GilroyMedium from './Gilroy/Gilroy-Medium.woff';
import GilroyMedium2 from './Gilroy/Gilroy-Medium.woff2';

import GilroySemiBoldItalic from './Gilroy/Gilroy-SemiBoldItalic.woff';
import GilroySemiBoldItalic2 from './Gilroy/Gilroy-SemiBoldItalic.woff2';

import GilroyThinItalic from './Gilroy/Gilroy-ThinItalic.woff';
import GilroyThinItalic2 from './Gilroy/Gilroy-ThinItalic.woff2';

import GilroyUltraLight from './Gilroy/Gilroy-UltraLight.woff';
import GilroyUltraLight2 from './Gilroy/Gilroy-UltraLight.woff2';

import GilroyThin from './Gilroy/Gilroy-Thin.woff';
import GilroyThin2 from './Gilroy/Gilroy-Thin.woff2';

import GilroyUltraLightItalic from './Gilroy/Gilroy-UltraLightItalic.woff';
import GilroyUltraLightItalic2 from './Gilroy/Gilroy-UltraLightItalic.woff2';

const FontFace = css`
  @font-face {
    font-family: 'Gilroy';
    src: url(${GilroyBlack2}) format('woff2'), url(${GilroyBlack}) format('woff');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Gilroy';
    src: url(${GilroyBold2}) format('woff2'), url(${GilroyBold}) format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Gilroy';
    src: url(${GilroyBlackItalic2}) format('woff2'), url(${GilroyBlackItalic}) format('woff');
    font-weight: 900;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Gilroy';
    src: url(${GilroyExtraBoldItalic2}) format('woff2'),
      url(${GilroyExtraBoldItalic}) format('woff');
    font-weight: bold;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Gilroy';
    src: url(${GilroyExtraBold2}) format('woff2'), url(${GilroyExtraBold}) format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Gilroy';
    src: url(${GilroyBoldItalic2}) format('woff2'), url(${GilroyBoldItalic}) format('woff');
    font-weight: bold;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Gilroy';
    src: url(${GilroyHeavy2}) format('woff2'), url(${GilroyHeavy}) format('woff');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Gilroy';
    src: url(${GilroyHeavyItalic2}) format('woff2'), url(${GilroyHeavyItalic}) format('woff');
    font-weight: 900;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Gilroy';
    src: url(${GilroyLightItalic2}) format('woff2'), url(${GilroyLightItalic}) format('woff');
    font-weight: 300;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Gilroy';
    src: url(${GilroyLight2}) format('woff2'), url(${GilroyLight}) format('woff');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Gilroy';
    src: url(${GilroyMediumItalic2}) format('woff2'), url(${GilroyMediumItalic}) format('woff');
    font-weight: 500;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Gilroy';
    src: url(${GilroySemiBold2}) format('woff2'), url(${GilroySemiBold}) format('woff');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Gilroy';
    src: url(${GilroyRegular2}) format('woff2'), url(${GilroyRegular}) format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Gilroy-RegularItalic';
    src: url(${GilroyRegularItalic2}) format('woff2'), url(${GilroyRegularItalic}) format('woff');
    font-weight: normal;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Gilroy';
    src: url(${GilroyMedium2}) format('woff2'), url(${GilroyMedium}) format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Gilroy';
    src: url(${GilroySemiBoldItalic2}) format('woff2'), url(${GilroySemiBoldItalic}) format('woff');
    font-weight: 600;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Gilroy';
    src: url(${GilroyThinItalic2}) format('woff2'), url(${GilroyThinItalic}) format('woff');
    font-weight: 100;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Gilroy';
    src: url(${GilroyUltraLight2}) format('woff2'), url(${GilroyUltraLight}) format('woff');
    font-weight: 200;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Gilroy';
    src: url(${GilroyThin2}) format('woff2'), url(${GilroyThin}) format('woff');
    font-weight: 100;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Gilroy';
    src: url(${GilroyUltraLightItalic2}) format('woff2'),
      url(${GilroyUltraLightItalic}) format('woff');
    font-weight: 200;
    font-style: italic;
    font-display: swap;
  }
`;

export default FontFace;
