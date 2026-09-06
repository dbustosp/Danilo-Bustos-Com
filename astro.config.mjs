// @ts-check
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // El dominio canónico. Sitemap, RSS, canonical y Open Graph se calculan a partir de aquí.
  site: 'https://danilobustos.com',

  // URLs limpias y permanentes: sin barra final (ver también vercel.json).
  trailingSlash: 'never',

  // Sitio 100 % estático: cada push a producción genera HTML plano.
  output: 'static',
});
