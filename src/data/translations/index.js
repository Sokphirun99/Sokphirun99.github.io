import en from './en.js';

export const languages = [
  { code: 'en', label: 'EN', name: 'English' },
];

export async function loadTranslations() {
  return en;
}

export default en;
