export const londonAiAtlasScreenshot = '/images/london-ai-atlas.webp';

export const featuredProjects = [
  {
    slug: 'ai-playground',
    title: 'AI Playground',
    label: 'Applied AI',
    tone: 'lavender',
    technologies: ['Python', 'Local LLMs', 'RAG', 'LLM Evaluation'],
    cardSummary: 'Local AI experiments, retrieval, transcription and model evaluation.',
    detailTechnologies: [
      'Python',
      'MLX',
      'Local LLMs',
      'RAG',
      'Embeddings',
      'Whisper',
      'Evaluation',
    ],
    summary:
      'A practical lab for local inference, document retrieval and model evaluation.',
    intro: [
      'AI Playground is where I get to experiment with language models, retrieval, evaluation and whatever else catches my curiosity.',
      "It's a collection of small, local experiments where I can pull things apart, inspect what happens and break things safely. No grand framework, just practical engineering and plenty of questions to investigate.",
    ],
    sections: [
      {
        title: 'RagLab',
        body: [
          "RagLab is my little RAG experiment. I can feed it documents, adjust how they're split into chunks and see what retrieval actually finds.",
          'It also supports local answer generation, so I can inspect the passages, prompt context and timings to understand what happens between asking a question and getting an answer.',
          "It's particularly useful when something looks right at first glance but turns out to be missing the one bit of information I needed.",
        ],
      },
      {
        title: 'SpeechLab',
        body: [
          'SpeechLab lets me run Whisper locally and compare its transcription against an editable reference.',
          "Rather than relying on a single accuracy score, I can inspect the words that were missed, added or confused. Sometimes the model gets something wrong. Occasionally, it's my reference that needs correcting.",
          'Either way, I can see what happened instead of guessing.',
        ],
      },
      {
        title: 'Evaluation',
        body: [
          "I've also been experimenting with small evaluation cases for retrieval and generation.",
          'The idea is to start with questions where I know what the right evidence should look like, then compare what changes when I adjust retrieval settings or generation behaviour.',
          'Nothing unnecessarily elaborate. Just enough structure to tell whether an experiment actually improved something or simply produced a different answer.',
        ],
      },
    ],
    external: {
      label: 'View AI Playground on GitHub',
      href: 'https://github.com/norfali/ai-playground',
    },
    relatedIntro:
      "I've written a little more about the experiments, including what worked, what didn't and what I discovered along the way.",
  },
  {
    slug: 'london-ai-atlas',
    title: 'London AI Atlas',
    label: 'Interactive mapping',
    tone: 'cyan',
    technologies: ['TypeScript', 'PixiJS', 'AI Agents', 'Tavily'],
    cardSummary:
      'An interactive miniature London, with AI agents helping research where companies work.',
    detailTechnologies: [
      'TypeScript',
      'PixiJS',
      'OpenStreetMap',
      'AI Agents',
      'Tavily',
      'Geoapify',
      'Python',
      'MLX',
    ],
    summary:
      'An illustrated map of London’s AI ecosystem, from the city skyline down to the buildings where teams work.',
    intro: [
      "London AI Atlas is my interactive, miniature map of London's AI ecosystem. It brings together real-world geography, isometric city districts and AI-assisted company research to explore where London's AI teams actually work.",
      "From recognisable landmarks to tiny moving trains and buses, I've had plenty of fun bringing the city to life.",
    ],
    sections: [
      {
        title: 'Building a miniature London',
        body: [
          'Using OpenStreetMap data, I turn building footprints, streets and landmarks into detailed isometric districts, with a city-wide overview to help visitors find their bearings.',
          "Building heights come from available map data or reasonable estimates. I've also added small animated details, including trains and buses following their routes, to make the city feel a little more alive.",
        ],
      },
      {
        title: 'AI-assisted company research',
        body: [
          'Finding where companies actually work is surprisingly tricky. Registered offices, planned moves and outdated addresses can all produce convincing but misleading map markers.',
          "I've been experimenting with AI agents that combine Tavily search and extraction, Geoapify geocoding and local MLX inference to investigate company locations.",
          'The research workflow uses execution limits, structured findings, evidence tracking and a human review queue. The agents help gather and assess information, but I make the final decision about what belongs on the map.',
        ],
      },
      {
        title: 'Keeping the map accurate',
        body: [
          "London's AI scene keeps changing, so the Atlas isn't intended to be a finished snapshot.",
          'Company locations retain their supporting sources, making it easier to revisit entries, verify addresses and update the map as teams move or new companies arrive.',
        ],
      },
    ],
    external: {
      label: 'Explore London AI Atlas ↗',
      href: 'https://atlas.fenka.co.uk/',
    },
    relatedIntro:
      "There's a bit more to the story, from building miniature London to getting AI agents to help track down company offices.",
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
    technologies: ['Next.js', 'TypeScript', 'Supabase'],
    summary: 'A dedicated place to organise job applications and track their progress.',
    href: 'https://myrolora.com',
  },
  {
    title: 'Ugly Game Awards',
    art: 'pitch',
    technologies: ['Next.js', 'TypeScript', 'Supabase'],
    summary:
      "A football fan vote celebrating the beautiful game's less beautiful moments.",
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
