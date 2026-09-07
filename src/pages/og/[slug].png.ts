/**
 * /og/<slug>.png — una imagen de vista previa por página y por ensayo,
 * generada en build. Las páginas fijas usan un nombre reservado; los
 * ensayos, su propio slug.
 */
import type { APIRoute } from 'astro';
import { SITE } from '../../config/site';
import { CATEGORIES } from '../../lib/categories';
import { renderOgImage, type OgInput } from '../../lib/og';
import { getPosts } from '../../lib/posts';

/** Imágenes de las páginas fijas. La clave es el nombre del archivo. */
export const PAGE_IMAGES: Record<string, OgInput> = {
  default: { title: SITE.name, subtitle: SITE.domains },
  writing: { title: 'Writing', subtitle: 'Engineering, enterprise, and personal notes.' },
  now: { title: "What I'm working on now" },
  about: { title: 'About', subtitle: SITE.shortBio },
  cv: { title: 'CV' },
};

/** Ruta de la imagen de una página fija o de un ensayo. */
export const ogImagePath = (slug: string) => `/og/${slug}.png`;

export async function getStaticPaths() {
  const posts = await getPosts();
  return [
    ...Object.entries(PAGE_IMAGES).map(([slug, props]) => ({ params: { slug }, props })),
    ...posts.map((post) => ({
      params: { slug: post.id },
      props: { title: post.data.title, eyebrow: CATEGORIES[post.data.category].label } satisfies OgInput,
    })),
  ];
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgImage(props as OgInput);
  return new Response(png, {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
};
