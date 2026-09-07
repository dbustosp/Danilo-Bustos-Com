/**
 * Las tres categorías del blog. Un solo blog dividido por categorías
 * visibles, no sitios separados: es lo que permite servir a una audiencia
 * deliberadamente mixta (ingenieros + enterprise) sin diluir el sitio.
 *
 * El id es el que va en el frontmatter (`category:`) y en la URL del índice
 * por categoría (/writing/<id>). Nunca forma parte de la URL de un post.
 */
export const CATEGORIES = {
  engineering: {
    label: 'Engineering',
    description: 'How systems actually get built: technical decisions under real constraints.',
    audience: 'Engineers I want to influence.',
  },
  enterprise: {
    label: 'Enterprise',
    description: 'Artificial intelligence strategy and adoption inside the traditional enterprise.',
    audience: 'Enterprise leaders and decision makers.',
  },
  notes: {
    label: 'Notes',
    description: 'Personal writing: life and lessons outside the technical work.',
    audience: 'Friends, family, and anyone who wants to read.',
  },
} as const;

export type CategoryId = keyof typeof CATEGORIES;

export const CATEGORY_IDS = Object.keys(CATEGORIES) as CategoryId[];

export const isCategory = (value: string): value is CategoryId => value in CATEGORIES;

export const categoryUrl = (id: CategoryId) => `/writing/${id}`;
