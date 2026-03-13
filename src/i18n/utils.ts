import es from './es.json';
import fr from './fr.json';

const translations: Record<string, Record<string, string>> = { es, fr };

export type Locale = 'es' | 'fr';
export const defaultLocale: Locale = 'es';
export const locales: Locale[] = ['es', 'fr'];

export function t(key: string, locale: Locale = defaultLocale): string {
  return translations[locale]?.[key] ?? translations[defaultLocale]?.[key] ?? key;
}

/** Get locale from Astro.currentLocale or URL */
export function getLocale(astroLocale?: string): Locale {
  return astroLocale === 'fr' ? 'fr' : 'es';
}

/** Build a localized path */
export function localePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return locale === 'es' ? clean : `/fr${clean}`;
}
