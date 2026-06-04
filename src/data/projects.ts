export interface Project {
  id: number;
  name: string;
  type: string;
  description: string;
  tags: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  comingSoon?: boolean;
  features?: string[];
  category: 'systems' | 'ai' | 'academic';
  isPrivate?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    name: 'UniRoute',
    type: 'University Transport Platform',
    category: 'systems',
    isPrivate: true,
    description:
      'Mobile-first transport system for Egyptian university students — 3-app architecture with full capstone documentation.',
    tags: ['React', 'Figma', 'ERD', 'System Design'],
    images: [
      '/images/uniroute-hero.png',
      '/images/uniroute-features.png',
      '/images/uniroute-how.png',
    ],
    liveUrl: 'https://uni-route.vercel.app',
    githubUrl: 'https://github.com/mna80455-debug/UniRoute',
    features: [
      '3-App Architecture: Tailored views for Student, Driver, and Parent roles.',
      'Real-time transport routes matching and booking systems.',
      'Full system analysis documentation including ERD, normalization, and DFDs.',
      'System Request, Feasibility Study, and stakeholder interview guidelines.',
    ],
  },
  {
    id: 2,
    name: 'Wasl Platform',
    type: 'Job & Internship Platform',
    category: 'systems',
    isPrivate: true,
    description:
      'Connecting Egyptian university students with training and employment opportunities across 20+ universities.',
    tags: ['React', 'Vercel', 'Supabase', 'AI-Dev'],
    images: [
      '/images/wasl-hero.png',
      '/images/wasl-how.png',
      '/images/wasl-reviews.png',
    ],
    liveUrl: 'https://wasl-platform-nu.vercel.app',
    githubUrl: 'https://github.com/mna80455-debug/wasl-platform',
    features: [
      'Job and internship database matching students with local corporate sponsors.',
      'Supabase integration for secure user auth and database structures.',
      'Partnered network connecting students from over 20 Egyptian universities.',
      'Modern, highly polished dashboard layouts for profile curation.',
    ],
  },
  {
    id: 3,
    name: 'Portfolio Generator',
    type: 'AI-Powered Tool',
    category: 'ai',
    description:
      'Generates professional developer portfolios via Claude API with ATS scoring system and customizable templates.',
    tags: ['Claude API', 'ATS Scoring', 'Templates'],
    images: ['/images/portfolio-gen.png', '/images/portfolio-gen-2.png'],
    liveUrl: 'https://portfolio-generator-tau.vercel.app',
    githubUrl: 'https://github.com/mna80455-debug/portfolio-generator',
    features: [
      'Custom portfolio creation dynamically rendered using Anthropic Claude LLM.',
      'ATS (Applicant Tracking System) screening module giving instant feedback and CV scores.',
      'Selection of multiple clean, high-performance responsive CSS templates.',
      'Public deployment integration and direct code download exports.',
    ],
  },
  {
    id: 4,
    name: 'InvoiceCraft',
    type: 'Productivity App',
    category: 'systems',
    description:
      'Full-featured invoice management with PDF export, multi-currency support, and WhatsApp & email sharing.',
    tags: ['PDF Export', 'Multi-currency', 'Firebase'],
    images: ['/images/invoice-app.png', '/images/invoice-history.png'],
    liveUrl: 'https://invoice-generator-azure-nine.vercel.app',
    githubUrl: 'https://github.com/mna80455-debug/invoice-generator',
    features: [
      'Interactive invoice constructor supporting item entries, taxes, and discounts.',
      'On-the-fly high-fidelity PDF rendering and offline downloads.',
      'Instant invoice sharing via WhatsApp API, custom emails, or text links.',
      'Custom theme settings including "Creative", "Corporate", and "Violet Storm".',
    ],
  },
  {
    id: 5,
    name: 'GradeIQ',
    type: 'Academic Tool',
    category: 'academic',
    description:
      'Smart GPA tracker with AI advisor, planner, and simulator — supports multiple grading systems and multi-semester management.',
    tags: ['React', 'JavaScript', 'AI Advisor'],
    images: ['/images/gpa-dashboard.png', '/images/gpa-planner.png'],
    liveUrl: 'https://gpa-calculator-six-eosin.vercel.app',
    githubUrl: 'https://github.com/mna80455-debug/GPA-Calculator',
    features: [
      'AI Academic Advisor suggesting course improvement pathways based on predictive modeling.',
      'Dynamic GPA simulator showing required grades to hit future GPA targets.',
      'Supports diverse grading metrics (4.0 Scale, 5.0 Scale, and percentage weightings).',
      'Multi-semester records management with graphical history trackers.',
    ],
  },
  {
    id: 6,
    name: 'Days (أيام)',
    type: 'Arabic Mindfulness & Habit Tracker',
    category: 'systems',
    description:
      'A peaceful Arabic journaling and mindfulness platform that tracks habits, moods, and age statistics to foster daily self-awareness.',
    tags: ['React', 'Vercel', 'Tailwind', 'Mindfulness'],
    images: [
      '/images/days-1.png',
      '/images/days-2.png',
      '/images/days-3.png',
      '/images/days-4.png',
      '/images/days-5.png',
    ],
    liveUrl: 'https://days-app-ar.vercel.app',
    githubUrl: 'https://github.com/mna80455-debug/days',
    features: [
      'Daily journaling and mood tracking with visual emotion trends over time.',
      'Yearly progression calculations and custom birthday count-down timers.',
      'A "Life in Weeks" calendar representation mapping weeks lived and lifetime progress.',
      'Subtle breathing and mindfulness guides designed to cultivate daily awareness.',
    ],
  },
  {
    id: 7,
    name: 'BookFlow',
    type: 'Reading Tracker',
    category: 'academic',
    description:
      'A beautiful reading companion app to track your library, reading progress, and book reviews.',
    tags: ['React', 'Firebase', 'UI/UX'],
    images: [],
    comingSoon: true,
  },
];
