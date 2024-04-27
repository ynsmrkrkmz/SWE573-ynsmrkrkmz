import fs from 'fs';
import path from 'path';
import enUK from '../en-UK.json';
import enUS from '../en-US.json';
import trTR from '../tr-TR.json';

const translations: { [property: string]: Record<string, string> } = {
  'en-UK': enUK,
  'en-US': enUS,
  'tr-TR': trTR,
};

const referenceLocale = 'tr-TR';
const allLocales = Object.keys(translations);

console.log(`\nTranslations: ${allLocales}\n`);

allLocales.forEach((locale) => {
  if (locale !== referenceLocale) {
    console.log(`\n[${locale}] Syncing with ${referenceLocale}...`);

    Object.keys(translations[referenceLocale]).forEach((key) => {
      if (typeof translations[locale][key] === 'undefined') {
        console.log(`[${locale}] + ${key}`);
        translations[locale][key] = translations[referenceLocale][key];
      }
    });
  }

  console.log(`[${locale}] Sorting...`);
  translations[locale] = Object.keys(translations[locale])
    .sort((a, b) => a.localeCompare(b, locale))
    .reduce((acc: { [property: string]: string }, curr) => {
      acc[curr] = translations[locale][curr];

      return acc;
    }, {});

  fs.writeFileSync(
    path.resolve(__dirname, '..', `${locale}.json`),
    JSON.stringify(translations[locale], null, '  ') + '\n'
  );
  console.log(`[${locale}] DONE`);
});

console.log(
  '\nAll languages are synced and sorted. You can now replace the keys with actual translations.\n'
);

process.exit(0);
