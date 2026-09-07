/**
 * Colecciones de contenido y esquema del frontmatter.
 *
 * Todo lo que se escribe vive en src/content:
 *   - writing/  los ensayos del blog (Markdown o MDX), uno por archivo.
 *   - pages/    el cuerpo de las páginas estáticas (about, now, cv).
 *
 * El nombre del archivo es el slug y por tanto la URL permanente del post
 * (/writing/<slug>). Sin fechas ni categorías en la ruta: si un post cambia
 * de categoría, el enlace no se rompe.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_IDS } from './lib/categories';

/** Solo minúsculas, dígitos y guiones simples. Sin acentos, sin fechas. */
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Rutas que ya existen en el sitio y que un post no puede ocupar. */
const RESERVED_SLUGS = new Set([
  ...CATEGORY_IDS,
  'about',
  'default', // imagen Open Graph por defecto (/og/default.png)
  'index',
  'lab',
  'now',
  'og',
  'resume',
  'rss',
  'writing',
]);

const writing = defineCollection({
  loader: glob({
    // Archivos planos; los que empiezan por "_" (plantillas) se ignoran.
    pattern: ['*.{md,mdx}', '!_*'],
    base: './src/content/writing',
    generateId: ({ entry }) => {
      const slug = entry.replace(/\.(md|mdx)$/, '');
      if (!SLUG_PATTERN.test(slug)) {
        throw new Error(
          `Slug inválido "${slug}" en src/content/writing. ` +
            'Usa solo minúsculas, dígitos y guiones: por-ejemplo-asi.md',
        );
      }
      if (RESERVED_SLUGS.has(slug)) {
        throw new Error(`El slug "${slug}" está reservado por una ruta del sitio. Elige otro nombre de archivo.`);
      }
      return slug;
    },
  }),
  schema: z.object({
    /** Título del post. Tiene que hacer todo el trabajo: no hay imágenes en el índice. */
    title: z.string().min(1).max(120),
    /** Una o dos frases. Va en la meta description, en Open Graph y en el feed RSS. */
    description: z.string().min(1).max(220),
    /** Fecha de publicación, formato YYYY-MM-DD. */
    date: z.coerce.date(),
    /** Última revisión sustancial, si la hubo. */
    updated: z.coerce.date().optional(),
    /** Una de las tres categorías: engineering | enterprise | notes. */
    category: z.enum(CATEGORY_IDS),
    /** Destacado en la home y arriba del índice. Se rota desde aquí, no desde el código. */
    featured: z.boolean().default(false),
    /** Borrador: visible en desarrollo, excluido del build de producción. */
    draft: z.boolean().default(false),
    /** Idioma del post. La interfaz es en inglés; un post puede estar en español. */
    lang: z.enum(['es', 'en']).default('en'),
    /** Si una versión anterior se publicó en otro sitio (por ejemplo, LinkedIn). */
    origin: z
      .object({
        label: z.string(),
        url: z.url(),
      })
      .optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Fecha de la última actualización; se muestra en /now. */
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { writing, pages };
