/**
 * Imagen de vista previa (Open Graph) generada en build con Satori.
 *
 * Plantilla única, definida una sola vez: fondo sobrio, título en grande en
 * Newsreader, nombre abajo. Cada post nuevo produce su imagen sin
 * intervención manual y el resultado es consistente.
 */
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { SITE } from '../config/site';

export interface OgInput {
  /** Texto principal, en grande. */
  title: string;
  /** Línea pequeña sobre el título (categoría o sección). */
  eyebrow?: string;
  /** Línea bajo el título, en gris. */
  subtitle?: string;
}

const WIDTH = 1200;
const HEIGHT = 630;

// Misma paleta que el modo claro del sitio (src/styles/global.css).
const BG = '#faf7f2';
const TEXT = '#1c1b19';
const MUTED = '#6b665f';
const ACCENT = '#2b4a6f';

// Resuelta desde la raíz del proyecto (el build se ejecuta ahí): el módulo empaquetado vive en dist/.
const fontsDir = new URL('src/assets/og/', pathToFileURL(`${process.cwd()}/`));
const loadFont = (file: string) => readFile(new URL(file, fontsDir));

let fontsPromise: Promise<Parameters<typeof satori>[1]['fonts']> | undefined;

function fonts() {
  fontsPromise ??= Promise.all([
    loadFont('Newsreader-500.ttf'),
    loadFont('Inter-400.ttf'),
    loadFont('Inter-500.ttf'),
  ]).then(([newsreader, inter, interMedium]) => [
    { name: 'Newsreader', data: newsreader, weight: 500 as const, style: 'normal' as const },
    { name: 'Inter', data: inter, weight: 400 as const, style: 'normal' as const },
    { name: 'Inter', data: interMedium, weight: 500 as const, style: 'normal' as const },
  ]);
  return fontsPromise;
}

/** El cuerpo del título baja de tamaño con la longitud para que quepa en tres líneas. */
function titleSize(title: string) {
  if (title.length > 90) return 52;
  if (title.length > 60) return 60;
  if (title.length > 36) return 70;
  return 84;
}

const div = (style: Record<string, string | number>, children: unknown) => ({
  type: 'div',
  props: { style, children },
});

export async function renderOgImage({ title, eyebrow, subtitle }: OgInput): Promise<Uint8Array<ArrayBuffer>> {
  const showName = title !== SITE.name;

  const svg = await satori(
    div(
      {
        width: WIDTH,
        height: HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 80px 60px',
        background: BG,
        color: TEXT,
        fontFamily: 'Inter',
      },
      [
        div(
          {
            fontSize: 24,
            fontWeight: 500,
            letterSpacing: 2,
            color: MUTED,
            minHeight: 30,
          },
          (eyebrow ?? '').toUpperCase(),
        ),
        div({ display: 'flex', flexDirection: 'column' }, [
          div(
            {
              fontFamily: 'Newsreader',
              fontWeight: 500,
              fontSize: titleSize(title),
              lineHeight: 1.08,
              letterSpacing: -1,
              maxWidth: 1000,
            },
            title,
          ),
          ...(subtitle
            ? [div({ marginTop: 20, fontSize: 30, lineHeight: 1.3, color: MUTED, maxWidth: 900 }, subtitle)]
            : []),
        ]),
        div(
          {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 28,
            color: MUTED,
          },
          [
            div({ display: 'flex', alignItems: 'center' }, [
              div({ width: 12, height: 12, background: ACCENT, marginRight: 16 }, ''),
              div({ fontWeight: 500, color: TEXT }, showName ? SITE.name : ''),
            ]),
            div({}, new URL(SITE.url).host),
          ],
        ),
      ],
    ),
    { width: WIDTH, height: HEIGHT, fonts: await fonts() },
  );

  const png = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng();
  // Copia a un ArrayBuffer propio: es lo que acepta Response como cuerpo.
  return new Uint8Array(png);
}
