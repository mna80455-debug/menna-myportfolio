import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, Code, Workflow, Smartphone } from 'lucide-react';
import FadeIn from './FadeIn';
import { playHoverSound } from '../utils/audio';

interface TimelineMilestone {
  year: string;
  titleEn: string;
  titleAr: string;
  icon: React.ComponentType<{ className?: string }>;
  descEn: string;
  descAr: string;
  skills: string[];
}

const milestones: TimelineMilestone[] = [
  {
    year: '2023',
    titleEn: 'Academic Launch & OOP Foundations',
    titleAr: 'انطلاق الرحلة الأكاديمية وأسس البرمجة',
    icon: GraduationCap,
    descEn: 'Joined Delta University for Science & Technology. Mastered C and C++ programming fundamentals, and gained strong foundations in Object-Oriented Programming (OOP) and algorithmic design.',
    descAr: 'التحقت بجامعة الدلتا للعلوم والتكنولوجيا (تخصص تكنولوجيا المعلومات)، ودرست أساسيات البرمجة بلغة C/C++ مع التمكن من هياكل البيانات والمفاهيم الكائنية OOP.',
    skills: ['C', 'C++', 'OOP', 'Problem Solving']
  },
  {
    year: '2024',
    titleEn: 'Web Architecture & Systems Design',
    titleAr: 'تصميم النظم وتطوير الويب',
    icon: Code,
    descEn: 'Learned relational database models, ERD diagram layouts, and structured database schema normalisation (1NF, 2NF, 3NF). Developed clean, modular, and responsive frontend applications with React and CSS.',
    descAr: 'تعمقت في دراسة تحليل وتصميم النظم، وتطوير قواعد البيانات العلائقية (Oracle DB) وتطبيع الجداول (Normalization)، بالتوازي مع بناء واجهات تفاعلية باستخدام مكتبة React.',
    skills: ['React', 'Oracle SQL', 'Database Normalization', 'System Analysis']
  },
  {
    year: '2025',
    titleEn: 'Production Capstones & AI Workflows',
    titleAr: 'المشاريع الكبرى وتكامل الذكاء الاصطناعي',
    icon: Workflow,
    descEn: 'Designed and built full-stack capstone projects: UniRoute (a multi-app transport flow layout) and Wasl Platform (a Supabase job application database), using AI-assisted engineering to optimize delivery.',
    descAr: 'صممت وطورت مشاريع تخرج وأنظمة عملية كبرى: منصة "وصل" للتوظيف (ربط Supabase وإدارة المصادقة) ونظام "UniRoute" للنقل الجامعي (بنية 3 تطبيقات مع المخططات الهيكلية)، وتكامل أدوات الذكاء الاصطناعي لتسريع التطوير.',
    skills: ['Supabase', 'Figma Wireframing', 'AI Capstones', 'Flow Diagrams']
  },
  {
    year: '2026',
    titleEn: 'PWA Support & Secure Portfolios',
    titleAr: 'تطبيقات متكاملة PWA وحماية المشاريع المغلقة',
    icon: Smartphone,
    descEn: 'Optimized web applications for client-side speeds. Configured dynamic project security controls using client-side passcode lock overlays and installed full PWA support for native device setup.',
    descAr: 'قمت بتحسين سرعة تحميل المواقع وتحسين أدائها على الهواتف، وبرمجة قفل حماية مستقل لكل مشروع لمنع الزوار غير المصرح لهم من رؤية البيانات الحساسة، وإتاحة تنزيل الموقع كـ PWA على الجوال والحاسوب.',
    skills: ['Progressive Web Apps (PWA)', 'Service Workers', 'Custom Encryption Locks', 'Vercel Pipeline']
  }
];

export default function LearningTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use scroll progress through timeline block to light up the path
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      id="education"
      className="theme-bg-primary py-20 sm:py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-rose/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 relative z-10">
        <div className="text-center mb-16 sm:mb-24">
          <h2 className="hero-heading font-black uppercase tracking-tight leading-none text-[clamp(2.8rem,9vw,110px)] mb-3">
            My Journey
          </h2>
          <p className="theme-text-muted text-sm sm:text-base font-light tracking-wide uppercase">
            الخط الزمني لتطوري الأكاديمي والبرمجي
          </p>
        </div>

        {/* Timeline Grid Container */}
        <div className="relative">
          {/* Central Line (Desktop) / Left Line (Mobile) */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[3px] bg-current/10 rounded-full">
            <motion.div
              style={{ height: pathHeight }}
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-rose via-mauve to-rose-lt rounded-full shadow-[0_0_10px_rgba(201,115,154,0.3)] origin-top"
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-20">
            {milestones.map((item, idx) => {
              const MilestoneIcon = item.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.year}
                  className={`flex flex-col md:flex-row items-stretch relative ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Icon Node marker on central line */}
                  <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-4 -translate-x-[9.5px] z-20 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-10 h-10 rounded-full theme-bg-card border-2 theme-border-card text-rose flex items-center justify-center shadow-lg cursor-default group"
                      onMouseEnter={playHoverSound}
                    >
                      <MilestoneIcon className="w-4 h-4 transition-transform group-hover:rotate-12" />
                    </motion.div>
                  </div>

                  {/* Spacer Column (Desktop Only) */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card Panel Column */}
                  <div className="pl-16 md:pl-0 w-full md:w-1/2 md:px-8">
                    <FadeIn delay={idx * 0.08} x={isEven ? -30 : 30} y={0}>
                      <div className="theme-bg-card border theme-border-card rounded-[28px] p-6 sm:p-8 shadow-xl hover:border-rose/30 transition-all duration-300 relative group">
                        
                        {/* Glow halo */}
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-rose/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

                        {/* Year Badge */}
                        <span className="inline-block text-xs font-bold tracking-widest text-rose bg-rose/10 px-3 py-1 rounded-full mb-4">
                          {item.year}
                        </span>

                        <h3 className="font-extrabold text-xl sm:text-2xl theme-text-primary leading-tight">
                          {item.titleEn}
                        </h3>
                        <h4 className="text-xs font-semibold text-rose mt-1 mb-4">
                          {item.titleAr}
                        </h4>

                        <p className="theme-text-muted text-sm leading-relaxed font-light mb-3">
                          {item.descEn}
                        </p>
                        <p className="theme-text-muted text-xs leading-relaxed font-light mb-6 border-l border-rose/30 pl-3 italic">
                          {item.descAr}
                        </p>

                        {/* Technologies Badge Group */}
                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-current/5">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-[10px] bg-[rgba(201,115,154,0.06)] text-rose border border-[rgba(201,115,154,0.12)] rounded-full px-2.5 py-0.5 font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </FadeIn>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
