/**
 * La trayectoria profesional, como datos y no como prosa.
 *
 * Vive en TypeScript y no en el frontmatter de resume.md porque el esquema
 * de la colección `pages` (src/content.config.ts) solo admite title,
 * description y updated, y extenderlo obligaría también a /about y /now,
 * que no lo necesitan. Es el mismo sitio donde ya viven CATEGORIES y SITE.
 *
 * Se agrupa por organización y no por cargo: once años en Equifax son seis
 * puestos distintos, y una lista plana repetiría el nombre seis veces
 * escondiendo justo lo que importa, que es la progresión.
 *
 * Guardarraíles de §6 al añadir algo: nada que no sea ya público. Lo que hay
 * aquí sale del perfil público de LinkedIn de Danilo, publicado por él.
 */
export type Position = {
  /** El cargo. */
  title: string;
  /** Inicio. El día no se muestra; existe para poder ordenar. */
  start: Date;
  /** Fin. Ausente significa cargo actual. */
  end?: Date;
  /**
   * Una línea de qué se hizo. Condensada por Claude a partir del texto que
   * Danilo tiene en LinkedIn, a petición suya: es la excepción a §4 en esta
   * página. El original completo está en su perfil y en el historial de git.
   */
  summary?: string;
};

export type Org = {
  /** La organización. Es el ancla visual de la entrada. */
  org: string;
  /** Dónde. Solo cuando aporta: el sitio cambia la historia. */
  place?: string;
  /** Cargos dentro de la organización, del más reciente al más antiguo. */
  positions: Position[];
};

const byStartDesc = <T extends { start: Date }>(a: T, b: T) => b.start.getTime() - a.start.getTime();

/** Rango de fechas de una organización: del primer cargo al último. */
export const orgStart = (o: Org) => o.positions.reduce((a, p) => (p.start < a ? p.start : a), o.positions[0].start);
export const orgEnd = (o: Org) =>
  o.positions.some((p) => !p.end) ? undefined : o.positions.reduce((a, p) => (p.end! > a ? p.end! : a), o.positions[0].end!);

export const ORGS: Org[] = [
  {
    org: 'Google Cloud AI',
    place: 'Atlanta, Georgia',
    positions: [
      {
        title: 'Staff Forward Deployed Engineer',
        start: new Date('2026-10-01'),
        // Sin resumen: el alcance del rol todavía no es público (§6).
      },
    ],
  },
  {
    org: 'Equifax',
    place: 'Santiago, Chile → Atlanta, Georgia',
    positions: [
      {
        title: 'VP of AI Engineering',
        start: new Date('2026-01-01'),
        end: new Date('2026-09-30'),
        summary:
          'Leading the Agentic Factory: the platform that standardizes how autonomous agents are built, deployed, and operated under regulatory constraints.',
      },
      {
        title: 'Global Software & ML Engineer (Master - P5) - Data Fabric Decision Science',
        start: new Date('2023-07-01'),
        end: new Date('2026-01-01'),
        summary:
          'Architecture for the enterprise analytical platform, and the adoption of Vertex AI, the enterprise MLOps platform, and internal RAG applications on top of it.',
      },
      {
        title: 'Global Solutions Architect - Data Fabric Data Science',
        start: new Date('2021-09-01'),
        end: new Date('2023-07-01'),
      },
      {
        title: 'Software Engineer Specialist - Data Fabric',
        start: new Date('2020-01-01'),
        end: new Date('2021-09-01'),
        summary:
          'Moved to the US for the migration to Google Cloud: the batch layer for the Key and Linking platform in Go, and the machine learning platform for the whole alliance.',
      },
      {
        title: 'Big Data Engineer Career',
        start: new Date('2017-09-01'),
        end: new Date('2020-01-01'),
        summary:
          'Big data pipelines and streaming ingestion in Java, Scala and Spark, and squad lead for attribute creation.',
      },
      {
        title: 'Big Data Engineer Intermediate at Data Service and Data Analytics',
        start: new Date('2015-06-01'),
        end: new Date('2017-09-01'),
        summary:
          'Built the Hadoop platform for the business units in the US, Canada and Australia, including five months in Australia standing up the platform for Veda.',
      },
    ],
  },
  {
    org: 'University of Notre Dame',
    place: 'South Bend, Indiana',
    positions: [
      {
        title: 'Graduate Intern',
        start: new Date('2015-01-01'),
        end: new Date('2015-04-01'),
        summary:
          'MapReduce in Java on Hadoop: parsed Wikipedia into a graph of pages and links, and rebuilt it with Google Pregel and vertex programming.',
      },
    ],
  },
  {
    org: 'Yahoo! Research Latin America',
    place: 'Santiago, Chile',
    positions: [
      {
        title: 'Software Engineer',
        start: new Date('2014-03-01'),
        end: new Date('2014-12-01'),
        summary:
          'Implemented the WAND algorithm, scheduling logic, and a C++ ML model to predict online query response times for vertical search engines.',
      },
    ],
  },
];

for (const org of ORGS) org.positions.sort(byStartDesc);
ORGS.sort((a, b) => orgStart(b).getTime() - orgStart(a).getTime());
