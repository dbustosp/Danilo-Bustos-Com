// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/**
 * Archivos de una fuente variable de Fontsource (@fontsource-variable/<pkg>).
 *
 * Al venir de npm, el build no depende de ninguna red externa y el resultado
 * es idéntico en cualquier máquina. Solo se incluye el subconjunto latino:
 * cubre español e inglés completos.
 *
 * @param {string} pkg Slug del paquete en @fontsource-variable.
 */
const fontsource = (pkg) => ({
  normal: `@fontsource-variable/${pkg}/files/${pkg}-latin-standard-normal.woff2`,
  italic: `@fontsource-variable/${pkg}/files/${pkg}-latin-standard-italic.woff2`,
});

const newsreader = fontsource('newsreader');
const inter = fontsource('inter');
const sourceSerif = fontsource('source-serif-4');
const fraunces = fontsource('fraunces');

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // El dominio canónico. Sitemap, RSS, canonical y Open Graph se calculan a partir de aquí.
  site: 'https://danilobustos.com',

  // URLs limpias y permanentes: sin barra final (ver también vercel.json).
  trailingSlash: 'never',

  // Sitio 100 % estático: cada push a producción genera HTML plano.
  output: 'static',

  build: {
    /*
     * El CSS del sitio entero cabe en unos pocos kB, así que va dentro del
     * HTML: una petición bloqueante menos antes del primer render. Se pierde
     * la caché entre páginas, que aquí importa poco porque casi todo el mundo
     * llega desde fuera y ve una sola página.
     */
    inlineStylesheets: 'always',
  },

  integrations: [
    // Markdown para casi todo; MDX cuando un ensayo necesite un componente.
    mdx(),
    // Sitemap en /sitemap-index.xml; las páginas de trabajo (/lab) quedan fuera.
    sitemap({ filter: (page) => !page.includes('/lab') }),
  ],

  vite: {
    // Mermaid se carga bajo demanda; pre-empaquetarlo evita el 504 de Vite
    // la primera vez que se abre una página con diagrama en desarrollo.
    optimizeDeps: { include: ['mermaid'] },
  },

  markdown: {
    shikiConfig: {
      // Tema dual: el CSS global elige el color según el modo claro/oscuro.
      themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
      defaultColor: false,
    },
  },

  /**
   * Tipografía.
   *
   * Astro sirve las fuentes desde el propio dominio y genera los @font-face
   * con respaldos ajustados por métricas. Cada familia se expone como una
   * variable CSS; el sistema de diseño (src/styles/global.css) decide cuál va
   * en títulos y cuál en cuerpo. Cambiar la fuente del sitio es cambiar una
   * variable.
   *
   * Las familias marcadas "laboratorio" solo se cargan en /lab, la página de
   * prueba para comparar alternativas en pantalla. Se pueden borrar sin más
   * (aquí, en /lab y en package.json).
   */
  fonts: [
    {
      // Títulos: serif con carácter pero sobria.
      provider: fontProviders.local(),
      name: 'Newsreader',
      cssVariable: '--font-newsreader',
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [
          { src: [newsreader.normal], weight: '200 800', style: 'normal' },
          { src: [newsreader.italic], weight: '200 800', style: 'italic' },
        ],
      },
    },
    {
      // Cuerpo: legibilidad en pantalla.
      provider: fontProviders.local(),
      name: 'Inter',
      cssVariable: '--font-inter',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          { src: [inter.normal], weight: '100 900', style: 'normal' },
          { src: [inter.italic], weight: '100 900', style: 'italic' },
        ],
      },
    },
    {
      // Laboratorio: muy institucional y clásica.
      provider: fontProviders.local(),
      name: 'Source Serif 4',
      cssVariable: '--font-source-serif',
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [
          { src: [sourceSerif.normal], weight: '200 900', style: 'normal' },
          { src: [sourceSerif.italic], weight: '200 900', style: 'italic' },
        ],
      },
    },
    {
      // Laboratorio: más carácter y personalidad.
      provider: fontProviders.local(),
      name: 'Fraunces',
      cssVariable: '--font-fraunces',
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [
          { src: [fraunces.normal], weight: '100 900', style: 'normal' },
          { src: [fraunces.italic], weight: '100 900', style: 'italic' },
        ],
      },
    },
  ],
});
