import es from './es.json';
import fr from './fr.json';

const translations: Record<string, Record<string, string>> = { es, fr };

export type Locale = 'es' | 'fr';
export const defaultLocale: Locale = 'es';
export const locales: Locale[] = ['es', 'fr'];

export function t(key: string, locale: Locale = defaultLocale): string {
  return translations[locale]?.[key] ?? translations[defaultLocale]?.[key] ?? key;
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  return locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
}

export function localePath(path: string, locale: Locale): string {
  const clean = path.replace(/^\/(es|fr)/, '').replace(/^\/+/, '/') || '/';
  return locale === defaultLocale ? clean : `/fr${clean === '/' ? '' : clean}`;
}
