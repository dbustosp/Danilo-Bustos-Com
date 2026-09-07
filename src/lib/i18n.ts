/**
 * Idioma: lo único que hay de i18n en este sitio, y a propósito.
 *
 * El sitio es en inglés. Cada ensayo se escribe en un solo idioma —el que
 * pide su audiencia— y no hay traducciones: sin rutas por locale, sin
 * hreflang, sin selector. Lo único que hace falta es que un ensayo en
 * español se anuncie como tal y traiga consigo su propia microcopia.
 */
export type Lang = 'es' | 'en';

/** Etiquetas BCP-47 para Intl. */
export const LOCALES: Record<Lang, string> = {
  es: 'es-CL',
  en: 'en-US',
};

/**
 * Los dos idiomas, en el orden en que se ofrecen: primero el del sitio.
 */
export const LANG_IDS: Lang[] = ['en', 'es'];

/** Cada idioma se nombra en su propio idioma, que es la convención. */
export const LANG_LABELS: Record<Lang, string> = {
  en: 'English',
  es: 'Español',
};

/**
 * Rutas de filtro: /writing/english y /writing/espanol. Sin acentos, como
 * cualquier slug del sitio, y reservadas en content.config.ts para que
 * ningún ensayo pueda ocuparlas.
 */
export const LANG_ROUTES: Record<Lang, string> = {
  en: 'english',
  es: 'espanol',
};

export const langUrl = (lang: Lang) => `/writing/${LANG_ROUTES[lang]}`;

/** Open Graph usa guion bajo: "en_US", no "en-US". */
export const ogLocale = (lang: Lang) => LOCALES[lang].replace('-', '_');

/** Microcopia del sitio alrededor de un ensayo, en el idioma del ensayo. */
export function ui(lang: Lang) {
  return lang === 'es'
    ? {
        updated: 'Actualizado el',
        origin: 'Una versión más breve se publicó primero en',
        back: 'Todos los escritos',
        draft: 'Borrador',
        newsletter: 'Recibe los ensayos nuevos por correo:',
        langLabel: 'ES',
      }
    : {
        updated: 'Updated on',
        origin: 'A shorter version was first published on',
        back: 'All writing',
        draft: 'Draft',
        newsletter: 'Get new essays by email:',
        langLabel: 'EN',
      };
}
