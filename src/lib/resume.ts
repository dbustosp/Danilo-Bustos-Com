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
  /** Párrafos de qué se hizo. Prosa de Danilo; aquí no se redacta (§4). */
  summary?: string[];
  /** Viñetas, cuando el texto original venía como lista. */
  bullets?: string[];
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
        summary: [
          'Leading the Agentic Factory: the platform that standardizes how autonomous agents are built, deployed, and operated under regulatory constraints.',
        ],
      },
      {
        title: 'Global Software & ML Engineer (Master - P5) - Data Fabric Decision Science',
        start: new Date('2023-07-01'),
        end: new Date('2026-01-01'),
        bullets: [
          'In charge of leading the architecture and implementation of new Features for the EFX Analytical platform which involves ML/AI, BI, Big Data and Engineering Ops use cases.',
          'Designing and implementing the adoption of Vertex AI on the Global Enterprise Analytical Platform. It has been in Production since Q1 - 2023.',
          'Designing and implementing the Enterprise MLOps platform based on Vertex AI components.',
          'Implementing internal RAG applications to improve platform operations and internal processes.',
        ],
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
        summary: [
          'Moved to the US to be part of the Company technology migration to GCP as part of the architecture team in Data Fabric and Data Science (DFDS) alliance. Some of the key roles I have played:',
        ],
        bullets: [
          'Implementing the batch layer for the Key and Linking platform written in Go.',
          'In charge of enabling the AI Platform to the whole company.',
          'Designing and building the Machine Learning platform for the whole alliance.',
          'Research and Development to improve the quality of the data flowing into the EFX systems.',
          'Interview process: Interviewed over 50+ candidates.',
        ],
      },
      {
        title: 'Big Data Engineer Career',
        start: new Date('2017-09-01'),
        end: new Date('2020-01-01'),
        bullets: [
          'Designing big data pipelines to make data extraction easier for the data scientists. Using technologies such as Java, SpringXD, Apache Crunch, Apache Spark, Apache Hive, Impala, among others.',
          'Apache Spark based tool in order to make attributes creation easier and faster. Using technologies such as Python and PySpark.',
          'Spark streaming application in order to ingest data from Kafka server to the HDFS in a streaming fashion. Using technologies such as Scala, Spark Streaming, Apache Spark and Zookeeper.',
          'Squad lead in charge of making attributes creation a better process. Some of the tasks have been designing solutions to run in large scale systems, recruitment process, satisfy business needs and participate in products roadmap.',
        ],
      },
      {
        title: 'Big Data Engineer Intermediate at Data Service and Data Analytics',
        start: new Date('2015-06-01'),
        end: new Date('2017-09-01'),
        summary: [
          'As part of the D&A, we built a Hadoop platform for the different Equifax Business Units (USA, Canada and Australia). The biggest one involves +150 nodes and processing TBs of data daily. My role has been a mix between Data and Software Engineer, designing and developing solutions which fit with data scientists\' requirements.',
          'I had the chance to be working on processing Unstructured Data using Apache Spark and building Machine Learning models to make specific predictions.',
          'I got moved to Australia for 4.5 months in order to build the Big Data platform for Veda (new Equifax company). As a principal engineer, I have had the opportunity to participate in design decisions which fit with Business requirements.',
          'We use Hadoop environment for our solutions. Our stack includes technologies like Apache [Hadoop | Spark | Hive | Crunch | Avro | Parquet, Kafka], Impala, Spring-XD and a lot more.',
        ],
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
        summary: [
          'During my internship at Notre Dame I worked with Hadoop. I had a very good understanding about Hadoop Distributed File System and about the computing model MapReduce. I had to build pure MapReduce code using Java, specifically I parsed Wikipedia using this technology and at the same time I created a graph where the Wiki-pages are the nodes and Wiki-links are the edges. I also used Google Pregel and Vertex Programming to create a Wikipedia Graph.',
        ],
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
        summary: [
          'Implemented the WAND algorithm, scheduling logic, and a C++ ML model to predict online query response times for vertical search engines.',
        ],
      },
    ],
  },
];

for (const org of ORGS) org.positions.sort(byStartDesc);
ORGS.sort((a, b) => orgStart(b).getTime() - orgStart(a).getTime());
