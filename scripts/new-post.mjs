#!/usr/bin/env node
/**
 * Crea el archivo de un ensayo con el frontmatter correcto.
 *
 *   node scripts/new-post.mjs "Título" --category thoughts [--lang en] [--date YYYY-MM-DD] [--featured] [--origin URL] [--mdx]
 *
 * El slug se deriva del título (minúsculas, sin acentos, guiones) y se
 * comprueba contra las rutas reservadas y los archivos existentes. El
 * ensayo nace como borrador; el cuerpo lo dicta Danilo.
 */
import { existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const CATEGORIES = ['engineering', 'enterprise', 'thoughts'];
const RESERVED = new Set([...CATEGORIES, 'about', 'cv', 'default', 'index', 'lab', 'now', 'og', 'rss', 'writing']);

const args = process.argv.slice(2);
const title = args.find((a) => !a.startsWith('--'));
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : (args[i + 1] ?? true);
};

if (!title || !flag('category')) {
  console.error('Uso: node scripts/new-post.mjs "Título" --category <engineering|enterprise|thoughts> [--lang en] [--date YYYY-MM-DD] [--featured] [--origin URL] [--mdx]');
  process.exit(1);
}

const category = flag('category');
if (!CATEGORIES.includes(category)) {
  console.error(`Categoría inválida "${category}". Opciones: ${CATEGORIES.join(' | ')}`);
  process.exit(1);
}

const lang = flag('lang') ?? 'en';
const date = flag('date') ?? new Date().toISOString().slice(0, 10);
const featured = args.includes('--featured');
const origin = flag('origin');
const ext = args.includes('--mdx') ? 'mdx' : 'md';

/** "Once años en Equifax" → "once-anos-en-equifax" */
const slug = title
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error(`No se pudo derivar un slug válido de "${title}".`);
  process.exit(1);
}
if (RESERVED.has(slug)) {
  console.error(`El slug "${slug}" está reservado por una ruta del sitio. Cambia el título o pasa otro.`);
  process.exit(1);
}

const file = resolve('src/content/writing', `${slug}.${ext}`);
if (existsSync(file) || existsSync(file.replace(/\.mdx?$/, ext === 'md' ? '.mdx' : '.md'))) {
  console.error(`Ya existe un ensayo con el slug "${slug}".`);
  process.exit(1);
}

const quote = (s) => `'${String(s).replace(/'/g, "''")}'`;
const lines = [
  '---',
  `title: ${quote(title)}`,
  `description: ''`,
  `date: ${date}`,
  `category: ${category}`,
  `featured: ${featured}`,
  'draft: true',
  `lang: ${lang}`,
];
if (origin && origin !== true) {
  lines.push('origin:', "  label: 'LinkedIn'", `  url: ${quote(origin)}`);
}
lines.push('---', '', '<!--', '  BORRADOR. Cuerpo: preguntas de entrevista; Danilo dicta las respuestas.', '  Claude corrige solo la mecánica y borra las preguntas al final.', '-->', '', '**Primera pregunta.**', '');

writeFileSync(file, lines.join('\n'));
console.log(`Creado ${file}`);
console.log(`URL: /writing/${slug}   Falta: description (obligatoria) y el cuerpo.`);
