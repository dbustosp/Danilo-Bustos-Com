/**
 * Las tres categorías del blog. Un solo blog dividido por categorías
 * visibles, no sitios separados: es lo que permite servir a una audiencia
 * deliberadamente mixta (ingenieros + enterprise) sin diluir el sitio.
 *
 * El id es el que va en el frontmatter (`category:`) y en la URL del índice
 * por categoría (/writing/<id>). Nunca forma parte de la URL de un post.
 */
export const CATEGORIES = {
  ingenieria: {
    label: 'Ingeniería',
    description: 'Cómo se construyen de verdad los sistemas: decisiones técnicas bajo restricciones.',
    audience: 'Ingenieros a los que quiero influenciar.',
  },
  enterprise: {
    label: 'Enterprise',
    description: 'Estrategia y adopción de inteligencia artificial en la empresa tradicional.',
    audience: 'Líderes y decisores del enterprise.',
  },
  notas: {
    label: 'Notas',
    description: 'Escritura personal: vida y aprendizajes fuera de lo técnico.',
    audience: 'Amigos, familia y quien quiera leer.',
  },
} as const;

export type CategoryId = keyof typeof CATEGORIES;

export const CATEGORY_IDS = Object.keys(CATEGORIES) as CategoryId[];

export const isCategory = (value: string): value is CategoryId => value in CATEGORIES;

export const categoryUrl = (id: CategoryId) => `/writing/${id}`;
