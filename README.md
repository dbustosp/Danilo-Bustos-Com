# danilobustos.com

Sitio personal de Danilo Bustos. Una plataforma de escritura, no un
portafolio: ensayos sobre recuperación de información, inteligencia
artificial y sistemas distribuidos, en tres categorías (Ingeniería,
Enterprise y Notas).

- **Stack:** [Astro](https://astro.build) estático, Markdown/MDX, desplegado en Vercel.
- **Rutas:** `/` · `/writing` · `/writing/[slug]` · `/writing/[categoria]` · `/now` · `/about` · `/cv` · `/rss.xml`
- **Diseño:** editorial y tipográfico, modo claro y oscuro, sin cajas ni sombras.

## Desarrollo

```sh
npm install
npm run dev      # servidor local en http://localhost:4321 (los borradores se ven aquí)
npm run build    # astro check + build estático en dist/
npm run preview  # sirve dist/ localmente
```

Requiere Node 22 o superior (`.nvmrc`). Las fuentes vienen de paquetes npm
y se sirven desde el propio dominio: el build no necesita red.

## Escribir

Cada ensayo es un archivo en `src/content/writing/`; el nombre del archivo
es la URL permanente. Para empezar uno:

```sh
node scripts/new-post.mjs "Título del ensayo" --category notas
```

El esquema del frontmatter, las reglas de voz y las de cada categoría
están en [`CLAUDE.md`](./CLAUDE.md), pensado para que un agente de código
pueda trabajar en el repositorio sin instrucciones adicionales. La skill
`publish-post` (`.claude/skills/`) automatiza el proceso.

## Páginas de trabajo

`/lab` compara tipografías de títulos y colores de acento en pantalla;
`/lab/prosa` muestra todos los elementos de Markdown con el estilo del
sitio. No se enlazan, llevan `noindex` y se borran cuando haya decisión.

## Despliegue

Proyecto de Vercel conectado a este repositorio: cada push a la rama de
producción despliega solo y cada rama tiene su vista previa. `vercel.json`
fija el framework y las URLs sin barra final. La analítica es Vercel
Analytics (sin cookies, sin banner).
