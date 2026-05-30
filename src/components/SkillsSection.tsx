import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Terminal, Database, Brain, Sparkles, Palette, ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';
import { playClickSound, playHoverSound } from '../utils/audio';

interface SkillStat {
  name: string;
  val: number;
}

interface SkillCategory {
  num: string;
  nameEn: string;
  nameAr: string;
  icon: React.ComponentType<{ className?: string }>;
  descEn: string;
  descAr: string;
  tags: string[];
  stats: SkillStat[];
}

const skills: SkillCategory[] = [
  {
    num: '01',
    nameEn: 'Languages',
    nameAr: 'اللغات البرمجية',
    icon: Code2,
    descEn: 'Core programming languages used to build software pipelines and systems.',
    descAr: 'اللغات الأساسية لتصميم وتطوير النظم وبناء البرمجيات من الصفر.',
    tags: ['C', 'C++', 'JavaScript', 'SQL', 'HTML', 'CSS'],
    stats: [
      { name: 'System Coding', val: 90 },
      { name: 'Scripts & Logic', val: 85 },
      { name: 'DB Queries', val: 95 }
    ]
  },
  {
    num: '02',
    nameEn: 'Tools & Platforms',
    nameAr: 'الأدوات والمنصات',
    icon: Terminal,
    descEn: 'Modern development environments, package managers, and hosting platforms.',
    descAr: 'بيئات التطوير الحديثة، وأنظمة التحكم بالإصدارات، ومنصات النشر السريع.',
    tags: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Firebase'],
    stats: [
      { name: 'Version Control', val: 95 },
      { name: 'Cloud Deploy', val: 80 },
      { name: 'IDE Workflow', val: 90 }
    ]
  },
  {
    num: '03',
    nameEn: 'Databases',
    nameAr: 'قواعد البيانات',
    icon: Database,
    descEn: 'Relational modeling, entity relation design, and database schema normalisation.',
    descAr: 'تصميم العلاقات بين الكيانات (ERD)، وتسوية الجداول لضمان كفاءة البيانات وسرعتها.',
    tags: ['Oracle DB', 'Supabase', 'ERD Design', 'Normalization'],
    stats: [
      { name: 'Data Normalization', val: 95 },
      { name: 'Relational Design', val: 90 },
      { name: 'Auth & API Security', val: 85 }
    ]
  },
  {
    num: '04',
    nameEn: 'Core Concepts',
    nameAr: 'المفاهيم الأساسية',
    icon: Brain,
    descEn: 'Logical thinking, algorithm structures, and systematic analysis procedures.',
    descAr: 'بناء الخوارزميات، هياكل البيانات، ومنهجيات التحليل المنطقي لحل المشكلات المعقدة.',
    tags: ['Data Structures', 'OOP', 'System Analysis', 'Problem Solving'],
    stats: [
      { name: 'Algorithmic Logic', val: 90 },
      { name: 'System Analysis', val: 95 },
      { name: 'OOP Principles', val: 85 }
    ]
  },
  {
    num: '05',
    nameEn: 'AI & Modern Dev',
    nameAr: 'الذكاء الاصطناعي',
    icon: Sparkles,
    descEn: 'Accelerated development using agentic workflows and advanced prompt engineering.',
    descAr: 'التطوير المتسارع وتوليد التعليمات البرمجية الذكية باستخدام هندسة الأوامر والوكلاء المساعدين.',
    tags: ['Prompt Engineering', 'Claude API', 'Antigravity'],
    stats: [
      { name: 'API Integration', val: 90 },
      { name: 'Prompt Design', val: 95 },
      { name: 'Agent Workflows', val: 85 }
    ]
  },
  {
    num: '06',
    nameEn: 'Design & Planning',
    nameAr: 'التصميم والتخطيط',
    icon: Palette,
    descEn: 'Framer structures, user interface pathways, and aesthetic prototypes.',
    descAr: 'رسم المخططات الهيكلية السلكية (Wireframing)، وتخطيط تدفق المستخدم، والنماذج التفاعلية.',
    tags: ['Figma', 'Wireframing', 'User Flows'],
    stats: [
      { name: 'Figma Prototyping', val: 85 },
      { name: 'Wireframing', val: 90 },
      { name: 'UX Mapping', val: 95 }
    ]
  },
];

export default function SkillsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCategory = skills[activeIndex];
  const IconComponent = activeCategory.icon;

  const handleCategorySelect = (idx: number) => {
    playClickSound();
    setActiveIndex(idx);
  };

  return (
    <section
      id="skills"
      className="theme-bg-secondary rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="theme-text-secondary font-black uppercase text-center text-[clamp(3rem,11vw,140px)] mb-14 sm:mb-18 md:mb-24">
          Skills
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Skill Category Selector List */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {skills.map((skill, i) => {
              const CategoryIcon = skill.icon;
              const isActive = i === activeIndex;

              return (
                <FadeIn key={skill.num} delay={i * 0.06} y={20}>
                  <div
                    onClick={() => handleCategorySelect(i)}
                    onMouseEnter={playHoverSound}
                    className={`group flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-rose/5 border-rose/30 shadow-[0_10px_30px_rgba(201,115,154,0.06)]'
                        : 'bg-transparent border-current/10 hover:border-current/30 hover:bg-current/5'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <span
                        className={`font-black text-2xl transition-colors duration-300 ${
                          isActive ? 'text-rose' : 'theme-text-secondary opacity-40 group-hover:opacity-70'
                        }`}
                      >
                        {skill.num}
                      </span>
                      <div
                        className={`p-3 rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-rose/10 text-rose'
                            : 'bg-current/5 theme-text-secondary group-hover:scale-110'
                        }`}
                      >
                        <CategoryIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg theme-text-secondary transition-colors group-hover:text-rose">
                          {skill.nameEn}
                        </h3>
                        <span className="text-xs theme-text-muted font-light">{skill.nameAr}</span>
                      </div>
                    </div>
                    <ArrowRight
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isActive
                          ? 'text-rose translate-x-1'
                          : 'theme-text-secondary opacity-30 group-hover:opacity-100 group-hover:translate-x-1'
                      }`}
                    />
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Right Column: Dynamic Stats & Tags Dashboard Panel */}
          <div className="lg:col-span-5 h-full min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="theme-bg-card border theme-border-card p-6 sm:p-8 rounded-[32px] shadow-xl flex flex-col justify-between h-full relative overflow-hidden group/card"
              >
                {/* Accent Backdrop Glow Circle */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-rose/10 blur-3xl pointer-events-none group-hover/card:scale-125 transition-transform duration-500" />
                
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-rose/10 text-rose rounded-2xl">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-2xl theme-text-primary">
                        {activeCategory.nameEn}
                      </h4>
                      <p className="text-xs text-rose font-medium mt-0.5">
                        {activeCategory.nameAr}
                      </p>
                    </div>
                  </div>

                  {/* Descriptions */}
                  <p className="theme-text-muted text-sm font-light leading-relaxed mb-3">
                    {activeCategory.descEn}
                  </p>
                  <p className="theme-text-muted text-xs font-light leading-relaxed mb-6 italic border-l-2 border-rose/30 pl-3">
                    {activeCategory.descAr}
                  </p>

                  {/* Skill Tag Pills */}
                  <div className="mb-8">
                    <h5 className="text-xs font-bold uppercase tracking-wider theme-text-primary mb-3">
                      Sub-Skills &amp; Tech Stack
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {activeCategory.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          whileHover={{ scale: 1.06, y: -2 }}
                          onMouseEnter={playHoverSound}
                          className="px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 border theme-border-card theme-bg-primary theme-text-primary hover:bg-rose hover:text-white hover:border-rose select-none cursor-default shadow-sm"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Proficiency Metric Bars */}
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider theme-text-primary mb-4 border-t border-current/5 pt-4">
                    Core Proficiency Metrics
                  </h5>
                  <div className="flex flex-col gap-4">
                    {activeCategory.stats.map((stat) => (
                      <div key={stat.name} className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="theme-text-primary">{stat.name}</span>
                          <span className="text-rose">{stat.val}%</span>
                        </div>
                        <div className="w-full h-2 theme-bg-primary rounded-full overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${stat.val}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                            className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-rose to-mauve rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
