export const languages = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'km', label: 'ខ្មែរ', name: 'Khmer' },
  { code: 'zh', label: '中文', name: 'Chinese' },
];

const loaders = {
  en: () => import('./en.js'),
  km: () => import('./km.js'),
  zh: () => import('./zh.js'),
};

export async function loadTranslations(lang) {
  const loader = loaders[lang] || loaders.en;
  const module = await loader();
  return module.default;
}
