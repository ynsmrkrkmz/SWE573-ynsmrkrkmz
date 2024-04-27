import enUK from './en-UK.json';
import enUS from './en-US.json';
import trTR from './tr-TR.json';

export enum Languages {
  TR_TR = 'tr-TR',
  EN_US = 'en-US',
  EN_UK = 'en-UK',
}

export const translations: { [property: string]: Record<string, string> } = {
  'en-UK': enUK,
  'en-US': enUS,
  'tr-TR': trTR,
};

export const labels: { [property: string]: string } = {
  'en-UK': 'English (UK)',
  'en-US': 'English (US)',
  'tr-TR': 'Türkçe',
};

const i18n = {
  translations,
  labels,
};

export default i18n;
