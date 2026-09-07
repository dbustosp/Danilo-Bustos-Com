/**
 * Datos estructurados (JSON-LD). Dos esquemas y nada más: Person para el
 * sitio y Article para cada ensayo. Ayudan a que Google presente el perfil
 * correctamente cuando alguien busca el nombre.
 */
import { SITE } from '../config/site';
import { CATEGORIES } from './categories';
import { isoDate } from './dates';
import type { Post } from './posts';

const PERSON_ID = `${SITE.url}/#person`;

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.shortBio,
    knowsAbout: ['Information retrieval', 'Artificial intelligence', 'Distributed systems'],
    sameAs: [SITE.social.linkedin, SITE.social.github, SITE.social.twitter].filter(Boolean),
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    inLanguage: SITE.lang,
    author: { '@id': PERSON_ID },
  };
}

export function articleJsonLd(post: Post, url: URL, image?: URL) {
  const { title, description, date, updated, category, lang } = post.data;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: url.href,
    mainEntityOfPage: url.href,
    datePublished: isoDate(date),
    dateModified: isoDate(updated ?? date),
    inLanguage: lang,
    articleSection: CATEGORIES[category].label,
    ...(image ? { image: image.href } : {}),
    author: { '@type': 'Person', '@id': PERSON_ID, name: SITE.name, url: SITE.url },
    publisher: { '@id': PERSON_ID },
  };
}
