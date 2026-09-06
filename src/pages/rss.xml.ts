/**
 * Feed RSS de todos los ensayos. Presente porque debe estarlo; no es un
 * canal de distribución por sí solo.
 */
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../config/site';
import { CATEGORIES } from '../lib/categories';
import { getPosts, postUrl } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE.name,
    description: SITE.shortBio,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postUrl(post),
      categories: [CATEGORIES[post.data.category].label],
    })),
    customData: `<language>${SITE.lang}</language>`,
    trailingSlash: false,
  });
}
