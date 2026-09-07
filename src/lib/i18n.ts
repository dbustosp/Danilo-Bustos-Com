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
