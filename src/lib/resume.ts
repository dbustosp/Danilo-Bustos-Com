/**
 * La trayectoria profesional, como datos y no como prosa.
 *
 * Vive en TypeScript y no en el frontmatter de resume.md porque el esquema
 * de la colección `pages` (src/content.config.ts) solo admite title,
 * description y updated, y extenderlo obligaría también a /about y /now,
 * que no lo necesitan. Es el mismo sitio donde ya viven CATEGORIES y SITE.
 *
 * Guardarraíles de §6 al añadir un cargo: sin nombres internos de sistemas
 * ni productos que no sean ya públicos, y sin cifras no confirmadas.
 */
export type Role = {
  /** La organización. Es el ancla visual de la entrada. */
  org: string;
  /**
   * El cargo. Cuelga de la organización, no al revés.
   *
   * Opcional a propósito: es preferible una entrada sin cargo a una con un
   * cargo inventado. Si falta, no se renderiza la línea.
   */
  title?: string;
  /** Inicio. El día no se muestra; existe para poder ordenar. */
  start: Date;
  /** Fin. Ausente significa cargo actual. */
  end?: Date;
  /** Una línea de qué se hizo. Prosa de Danilo. */
  summary?: string;
};

/*
 * El orden se impone aquí y no en la plantilla: una página no debería poder
 * desordenar una carrera por escribir mal un map.
 */
const byStartDesc = (a: Role, b: Role) => b.start.getTime() - a.start.getTime();

export const ROLES: Role[] = [
  {
    org: 'Google Cloud AI',
    title: 'Staff Forward Deployed Engineer',
    start: new Date('2026-10-01'),
    // Sin resumen todavía: el alcance del rol no es público (§6).
  },
  {
    org: 'Equifax',
    // TODO: el cargo real. "Agentic Factory" es la plataforma, no el título.
    start: new Date('2015-01-01'),
    end: new Date('2026-09-30'),
    summary:
      'Last stretch leading the Agentic Factory, the platform that standardizes how autonomous agents are built, deployed, and operated under regulatory constraints.',
  },
].sort(byStartDesc);
