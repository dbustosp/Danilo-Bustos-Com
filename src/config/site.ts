/**
 * Configuración central del sitio.
 *
 * Todo lo que es identidad (nombre, dominio, enlaces, navegación) vive aquí
 * para que cambiar un dato no implique tocar componentes.
 */
export const SITE = {
  /** Nombre propio. El dominio es el nombre, sin marcas inventadas. */
  name: 'Danilo Bustos',

  /** Dominio canónico. Debe coincidir con `site` en astro.config.mjs. */
  url: 'https://danilobustos.com',

  /** Idioma y locale por defecto de la interfaz. Cada post puede declarar el suyo. */
  lang: 'en',
  locale: 'en_US',

  /**
   * Línea de territorio bajo el nombre, en la cabecera de todas las páginas.
   * Posicionamiento por territorio, sin verbo y sin promesa.
   */
  domains: 'Information retrieval, artificial intelligence, and distributed systems',

  /** Línea de apoyo bajo el título. */
  tagline:
    'I build software solutions and platforms that apply artificial intelligence inside the enterprise.',

  /** Bio corta: se usa como descripción por defecto y en la sección About de la home. */
  shortBio:
    'Quince años en la intersección de recuperación de información, inteligencia artificial y sistemas distribuidos.',

  /** Repositorio público del sitio. Se enlaza desde el pie. */
  repo: 'https://github.com/dbustosp/Danilo-Bustos-Com',

  /**
   * Enlaces del pie. Solo los canales profesionales; Instagram y Facebook no van.
   * Un enlace vacío no se muestra: X queda oculto hasta confirmar el usuario.
   */
  social: {
    linkedin: 'https://www.linkedin.com/in/danilo-bustos/',
    github: 'https://github.com/dbustosp',
    twitter: '',
  },

  /**
   * Correo en dominio propio. Pospuesto: el sitio se lanza sin él y el
   * contacto es LinkedIn. Cuando exista, basta con rellenarlo aquí.
   */
  email: '',

  /**
   * Newsletter en Substack. Vacío mientras no exista: como los enlaces
   * sociales, un valor vacío no se muestra en ninguna parte. Es un enlace
   * hacia fuera, nunca un formulario: la captura del correo ocurre en
   * Substack, no aquí (§9: sin pop-ups ni captura de correos).
   */
  newsletter: '',

  /** Navegación principal. El resume entra aquí: es lo que busca un reclutador. */
  nav: [
    { href: '/', label: 'Home' },
    { href: '/writing', label: 'Writing' },
    { href: '/now', label: 'Now' },
    { href: '/about', label: 'About' },
    { href: '/resume', label: 'Resume' },
  ],
} as const;

/** Título completo de la home, en el formato "nombre — dominios". */
export const SITE_TITLE = `${SITE.name} — ${SITE.domains}`;
