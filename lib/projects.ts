export const featuredProjects = [
  {
    slug: 'ai-playground',
    title: 'AI Playground',
    label: 'Applied AI',
    tone: 'lavender',
    technologies: ['Python', 'Local inference', 'RAG'],
    summary:
      'A practical lab for local inference, document retrieval and model evaluation.',
    intro:
      'AI Playground is where I try things out with models on my own machine. I can follow a result back through the pipeline, change one piece at a time and see what difference it makes.',
    sections: [
      {
        title: 'RagLab',
        body: 'RagLab lets me index documents, adjust chunking and search by meaning using local embeddings. I can inspect the passages, the context a model receives and the timings at each stage. On Apple Silicon I can also run an optional local model to generate answers from those passages.',
      },
      {
        title: 'SpeechLab',
        body: 'SpeechLab runs Whisper locally on Apple Silicon. I can compare a transcription with an editable reference, see where words were added, missed or confused, and compare accuracy and performance.',
      },
      {
        title: 'Evaluation',
        body: 'Retrieval and generation raise different questions. I use small evaluation cases to inspect whether the right evidence surfaced and whether an answer was supported by it. I’m exploring how far these checks can take me when comparing models and settings.',
      },
    ],
    external: {
      label: 'View AI Playground on GitHub',
      href: 'https://github.com/norfali/ai-playground',
    },
    journal: 'learning-ai-by-building-things',
  },
  {
    slug: 'london-ai-atlas',
    title: 'London AI Atlas',
    label: 'Interactive mapping',
    tone: 'cyan',
    technologies: ['TypeScript', 'PixiJS', 'OpenStreetMap'],
    summary:
      'An illustrated map of London’s AI ecosystem, from the city skyline down to the buildings where teams work.',
    intro:
      'London AI Atlas is a miniature, interactive map of the city’s AI ecosystem. It combines a city-wide view with detailed isometric districts, placing teams among the streets, landmarks and transport links that surround them.',
    sections: [
      {
        title: 'Building a miniature London',
        body: 'The overview draws the Thames, parks and transport from OpenStreetMap. The district views turn building footprints and street geometry into isometric scenes. Local details, from rail lines through Shoreditch to bridges across the Thames, make each district recognisable.',
      },
      {
        title: 'Putting teams on the map',
        body: 'Company profiles are tied to evidence about where teams actually work. A registered address can point somewhere else entirely. The research process keeps the source alongside the location so an entry can be checked and updated as companies move.',
      },
    ],
    journal: 'mapping-londons-ai-ecosystem',
  },
] as const;

export const independentProjects: {
  title: string;
  summary: string;
  href: string;
  technologies: string[];
  art?: 'tracker' | 'pitch';
}[] = [
  {
    title: 'MyRolora',
    art: 'tracker',
    technologies: ['Next.js', 'Supabase'],
    summary:
      'MyRolora brings job applications and their progress together in one place, giving people a dedicated way to manage a search.',
    href: 'https://myrolora.com',
  },
  {
    title: 'Ugly Game Awards',
    art: 'pitch',
    technologies: ['Next.js', 'Supabase'],
    summary:
      'A football fan vote inspired by the Razzies, for dives, dirty play and the other ugly bits of the beautiful game.',
    href: 'https://www.uglygameawards.com/',
  },
];

export const professionalProjects = [
  {
    title: 'Morningstar Design System',
    field: 'Design systems',
    summary:
      'I developed accessible components, design tokens and shared frontend foundations as the system moved from HTML, Jekyll and JavaScript through Vue 2 and Vue 3 to the newer Product System.',
    href: 'https://design.morningstar.com',
  },
  {
    title: 'Royal Mint',
    field: 'Ecommerce',
    summary:
      'I was one of the lead engineers building the Royal Mint’s ecommerce site from scratch in Sitecore, back when Internet Explorer 8 still had to work.',
    href: 'https://www.royalmint.com/',
  },
  {
    title: 'VisitBritain & TfL',
    field: 'Transport and tourism',
    summary:
      'I was one of the lead engineers on a programme that grew into six projects with different requirements. It launched in 2015 and reached 41 countries.',
  },
];
