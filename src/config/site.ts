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
  lang: 'es',
  locale: 'es_CL',

  /**
   * Título del encabezado de la home: nombre + tres dominios.
   * Posicionamiento por territorio, sin verbo y sin promesa.
   */
  domains: 'Recuperación de información, inteligencia artificial y sistemas distribuidos',

  /** Línea de apoyo bajo el título. */
  tagline:
    'Creo soluciones de software y plataformas que aplican inteligencia artificial dentro del enterprise.',

  /** Bio corta: se usa como descripción por defecto y en la sección About de la home. */
  shortBio:
    'Quince años en la intersección de recuperación de información, inteligencia artificial y sistemas distribuidos.',

  /** Repositorio público del sitio. Se enlaza desde el pie. */
  repo: 'https://github.com/dbustosp/Danilo-Bustos-Com',

  /** Enlaces del pie. Solo los canales profesionales; Instagram y Facebook no van. */
  social: {
    linkedin: 'https://www.linkedin.com/in/dbustosp',
    github: 'https://github.com/dbustosp',
    twitter: 'https://x.com/dbustosp',
  },

  /** Navegación principal. El CV vive en /cv pero no se destaca aquí. */
  nav: [
    { href: '/writing', label: 'Escritos' },
    { href: '/now', label: 'Ahora' },
    { href: '/about', label: 'Sobre mí' },
  ],
} as const;

/** Título completo de la home, en el formato "nombre — dominios". */
export const SITE_TITLE = `${SITE.name} — ${SITE.domains}`;
