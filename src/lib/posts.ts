/**
 * Consultas sobre la colección de ensayos. Los componentes no llaman a
 * getCollection directamente: pasan por aquí para que las reglas (orden,
 * borradores, destacados) vivan en un solo sitio.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import type { CategoryId } from './categories';

export type Post = CollectionEntry<'writing'>;

const byDateDesc = (a: Post, b: Post) => b.data.date.valueOf() - a.data.date.valueOf();

/** Los borradores solo se ven en desarrollo. En producción no existen. */
const isVisible = (post: Post) => import.meta.env.DEV || !post.data.draft;

/** Todos los posts publicados, del más reciente al más antiguo. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('writing', isVisible);
  return posts.sort(byDateDesc);
}

/** Los ensayos definitorios, marcados con `featured: true` en el frontmatter. */
export async function getFeaturedPosts(limit = 4): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter((post) => post.data.featured).slice(0, limit);
}

export async function getPostsByCategory(category: CategoryId): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter((post) => post.data.category === category);
}

/** URL permanente de un post: solo el slug, sin fecha ni categoría. */
export const postUrl = (post: Pick<Post, 'id'>) => `/writing/${post.id}`;
