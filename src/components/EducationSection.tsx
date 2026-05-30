import { motion } from 'framer-motion';
import FadeIn from './FadeIn';
import ImageWithFallback from './ImageWithFallback';
import { playHoverSound, playClickSound } from '../utils/audio';

interface Milestone {
  year: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  details?: React.ReactNode;
}

const milestones: Milestone[] = [
  {
    year: '2023',
    titleAr: 'البداية الأكاديمية وجامعة دلتا',
    titleEn: 'Academic Journey Begins',
    descAr: 'التحقت بكلية تكنولوجيا الصناعة والطاقة بجامعة دلتا للعلوم والتكنولوجيا لدراسة بكالوريوس تكنولوجيا المعلومات (IT).',
    descEn: 'Enrolled at Delta University for Science & Technology, Faculty of Industrial Technology & Energy, pursuing a B.Sc. in Information Technology.',
    details: (
      <div className="flex flex-col sm:flex-row gap-5 mt-4 pt-4 border-t border-current/10">
        <div className="sm:w-1/3 rounded-xl overflow-hidden h-28 sm:h-auto flex-shrink-0">
          <ImageWithFallback
            src="/images/university-2.jpeg"
            alt="Delta University"
            className="w-full h-full object-cover min-h-[100px]"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <span className="text-[#E8A0BF] font-semibold text-base sm:text-lg">
            B.Sc. Information Technology
          </span>
          <span className="theme-text-muted text-xs sm:text-sm mt-0.5">
            Delta University for Science &amp; Technology
          </span>
          <span className="theme-text-muted text-xs mt-0.5">
            2nd Year · Expected 2027
          </span>
        </div>
      </div>
    ),
  },
  {
    year: '2024',
    titleAr: 'تأسيس البرمجة وتحليل الأنظمة',
    titleEn: 'Programming Foundations & Systems Analysis',
    descAr: 'التركيز على أساسيات البرمجة المهيكلة والكائنية (OOP) بلغة C++، ودراسة قواعد البيانات وتصميم مخططات العلاقات (ERD/DFD). قمت بتصميم وتوثيق مشروع منصة UniRoute لنقل الطلاب.',
    descEn: 'Focused on core structural and OOP programming (C++), database systems (Oracle SQL, ERD Design, Normalization), and systems analysis. Architected and fully documented the UniRoute student transport platform.',
  },
  {
    year: '2025',
    titleAr: 'تطوير الويب المتكامل والذكاء الاصطناعي',
    titleEn: 'Full Stack Web & AI Tools',
    descAr: 'بدء بناء تطبيقات ويب متطورة وتفاعلية باستخدام React مع قواعد البيانات السحابية (Supabase, Firebase). توظيف تقنيات الذكاء الاصطناعي (Claude API) لإنشاء أدوات مفيدة مثل Portfolio Generator، وتطوير GradeIQ لتتبع المعدل التراكمي مع مستشار أكاديمي ذكي.',
    descEn: 'Building rich, interactive web systems using React combined with serverless backends (Supabase, Firebase). Leveraging Claude API to build developer productivity tools (Portfolio Generator with ATS scoring), and GradeIQ GPA tracker with an AI-driven advisor.',
  },
  {
    year: '2026 - 2027',
    titleAr: 'التخصص الاحترافي والتخرج (متوقع)',
    titleEn: 'Advanced Specialization & Graduation (Expected)',
    descAr: 'التخصص في مسار هندسة البرمجيات وتطوير الأنظمة المعقدة (السنة الثالثة والرابعة)، مع التركيز على مشاريع التخرج المتقدمة والأنظمة القابلة للتوسع.',
    descEn: 'Specializing in the advanced Software Development tracks (Years 3 & 4), completing graduation capstone projects, and deploying high-performance scalable systems.',
    details: (
      <div className="mt-3">
        <span className="inline-block bg-[rgba(201,115,154,0.1)] text-[#C9739A] text-xs px-3 py-1 rounded-full font-medium">
          Specializing in Software Development (Year 3+)
        </span>
      </div>
    ),
  },
];

export default function EducationSection() {
  return (
    <section
      id="education"
      className="theme-bg-primary px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative"
    >
      <FadeIn delay={0} y={40}>
        <h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight text-[clamp(3rem,11vw,140px)] mb-16 sm:mb-24">
          Education
        </h2>
      </FadeIn>

      <div className="relative max-w-3xl mx-auto pl-8 sm:pl-12">
        {/* Timeline Connecting Line */}
        <div className="absolute left-4 sm:left-6 top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#C9739A] via-[#9B6BA8] to-current/5 rounded-full" />

        <div className="flex flex-col gap-10 sm:gap-14">
          {milestones.map((milestone, idx) => (
            <FadeIn key={milestone.year} delay={idx * 0.1} y={30}>
              <div
                onClick={() => playClickSound()}
                onMouseEnter={playHoverSound}
                className="relative group cursor-pointer"
              >
                {/* Timeline node dot */}
                <div className="absolute -left-[25px] sm:-left-[33px] top-1.5 w-4 h-4 rounded-full border-[3px] theme-bg-primary border-[#C9739A] transition-all duration-300 group-hover:scale-125 group-hover:bg-[#C9739A] shadow-[0_0_8px_rgba(201,115,154,0.3)] z-10" />

                {/* Milestone Card */}
                <div className="theme-bg-card border theme-border-card rounded-[24px] sm:rounded-[32px] p-5 sm:p-6 transition-all duration-300 hover:border-[#C9739A]/30 hover:shadow-[0_15px_35px_rgba(201,115,154,0.04)]">
                  <span className="text-[#C9739A] font-bold text-sm tracking-widest uppercase">
                    {milestone.year}
                  </span>
                  
                  <h3 className="text-xl sm:text-2xl font-bold theme-text-primary mt-1">
                    {milestone.titleEn}
                  </h3>
                  
                  <h4 className="text-sm font-semibold text-[#E8A0BF] mt-0.5 dir-rtl text-right sm:text-left">
                    {milestone.titleAr}
                  </h4>

                  <p className="theme-text-muted text-xs sm:text-sm mt-3 leading-relaxed">
                    {milestone.descEn}
                  </p>
                  
                  <p className="theme-text-muted text-[11px] sm:text-xs mt-1.5 leading-relaxed font-light opacity-80">
                    {milestone.descAr}
                  </p>

                  {milestone.details && milestone.details}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
