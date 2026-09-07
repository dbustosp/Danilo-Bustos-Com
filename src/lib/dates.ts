/**
 * Fechas legibles. Se formatean según el idioma del contenido.
 */
import { LOCALES, type Lang } from './i18n';

/** "September 6, 2026" / "6 de septiembre de 2026" */
export function formatDate(date: Date, lang: Lang = 'en'): string {
  return new Intl.DateTimeFormat(LOCALES[lang], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** "Sep 2026" / "sep 2026", para las listas del índice. */
export function formatMonthYear(date: Date, lang: Lang = 'en'): string {
  return new Intl.DateTimeFormat(LOCALES[lang], {
    year: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  })
    .format(date)
    .replace('.', '');
}

/** YYYY-MM-DD, para atributos datetime y datos estructurados. */
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);
