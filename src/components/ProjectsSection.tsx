import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Github, X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects, Project } from '../data/projects';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';
import ImageWithFallback from './ImageWithFallback';
import ProjectArchitecture from './ProjectArchitecture';
import { playClickSound, playHoverSound } from '../utils/audio';

interface ProjectCardProps {
  project: Project;
  index: number;
  isUnlocked: boolean;
  onSelect: (project: Project) => void;
  onLockClick: (project: Project) => void;
}

function ProjectCard({ project, index, isUnlocked, onSelect, onLockClick }: ProjectCardProps) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Map mouse positions relative to element center to rotation angles (-8deg to 8deg for clean subtle feel)
  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize coordinates (0 to 1)
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    // Return smoothly to center
    x.set(0.5);
    y.set(0.5);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
  };

  const isLocked = project.isPrivate && !isUnlocked;

  const handleClick = () => {
    if (project.comingSoon) return;
    if (isLocked) {
      onLockClick(project);
    } else {
      onSelect(project);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playHoverSound}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`theme-bg-card theme-border-card border rounded-[24px] sm:rounded-[32px] overflow-hidden group hover:border-[rgba(201,115,154,0.35)] hover:shadow-[0_20px_40px_rgba(201,115,154,0.06)] transition-all duration-300 ${
        project.comingSoon ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      {/* Image area */}
      <div 
        style={{ transform: 'translateZ(20px)' }}
        className="h-[200px] sm:h-[240px] md:h-[260px] overflow-hidden relative"
      >
        {project.comingSoon || project.images.length === 0 ? (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center">
            <span className="theme-text-muted text-lg font-medium tracking-wide uppercase">
              Coming Soon
            </span>
          </div>
        ) : (
          <>
            {project.images[0].endsWith('.mp4') || project.images[0].endsWith('.webm') ? (
              <video
                src={project.images[0]}
                autoPlay
                loop
                muted
                playsInline
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${
                  isLocked ? 'blur-md grayscale brightness-50' : ''
                }`}
              />
            ) : (
              <ImageWithFallback
                src={project.images[0]}
                alt={project.name}
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${
                  isLocked ? 'blur-md grayscale brightness-50' : ''
                }`}
              />
            )}
            {/* View details badge */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <span className="bg-white/10 border border-white/20 text-white font-medium uppercase tracking-widest text-xs px-5 py-2.5 rounded-full hover:scale-105 transition-transform duration-200">
                {isLocked ? '🔐 Unlock Project' : 'View Details'}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Info area */}
      <div 
        style={{ transform: 'translateZ(10px)' }}
        className="p-5 sm:p-6"
      >
        <div className="flex justify-between items-start">
          <span className="text-[#C9739A] font-bold text-sm">
            {String(project.id).padStart(2, '0')}
          </span>
          {isLocked && (
            <span className="text-[10px] bg-[rgba(201,115,154,0.15)] text-[#C9739A] border border-[rgba(201,115,154,0.3)] rounded-full px-2.5 py-0.5 font-semibold uppercase tracking-wider flex items-center gap-1">
              🔐 Private / خاص
            </span>
          )}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold theme-text-primary mt-1">
          {project.name}
        </h3>
        <p className="theme-text-muted text-sm font-light mt-1">{project.type}</p>
        <p className="theme-text-muted text-sm font-light leading-relaxed mt-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-[rgba(201,115,154,0.08)] text-[#9B6BA8] border border-[rgba(201,115,154,0.15)] rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div
          onClick={handleLinkClick}
          className="flex gap-3 mt-5 items-center"
        >
          {project.comingSoon ? (
            <span className="text-sm theme-text-muted font-medium opacity-50 cursor-not-allowed">
              Coming Soon
            </span>
          ) : isLocked ? (
            <span className="text-xs theme-text-muted font-light italic flex items-center gap-1 select-none">
              🔐 رمز مرور للمعاينة / Private Lock
            </span>
          ) : (
            <>
              {project.liveUrl && (
                <LiveProjectButton href={project.liveUrl} />
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm theme-text-muted hover:theme-text-primary transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const categories = [
  { id: 'all', labelEn: 'All', labelAr: 'الكل' },
  { id: 'systems', labelEn: 'Systems & Platforms', labelAr: 'أنظمة ومنصات' },
  { id: 'ai', labelEn: 'AI & Tools', labelAr: 'ذكاء اصطناعي وأدوات' },
  { id: 'academic', labelEn: 'Academic & GPA', labelAr: 'دراسي وأكاديمي' },
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture'>('overview');
  const [unlockedProjectIds, setUnlockedProjectIds] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('menna_portfolio_unlocked_project_ids') || '[]');
    } catch {
      return [];
    }
  });
  const [lockTargetProject, setLockTargetProject] = useState<Project | null>(null);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  const checkPasscode = (code: string, projectId: number) => {
    const normalized = code.trim().toUpperCase();
    const encoded = btoa(normalized);
    
    // UniRoute (ID: 1) -> unlocked by DELTA-IT or RECRUITER2026
    if (projectId === 1) {
      return ['REVMVEEtSVQ=', 'UkVDUlVJVEVSMjAyNg=='].includes(encoded);
    }
    
    // Wasl Platform (ID: 2) -> unlocked by MENNA-VIP or RECRUITER2026
    if (projectId === 2) {
      return ['TUVOTkEtVklQ', 'UkVDUlVJVEVSMjAyNg=='].includes(encoded);
    }
    
    return false;
  };

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = lockTargetProject;
    if (!target) return;

    if (checkPasscode(passcode, target.id)) {
      playClickSound();
      const updated = [...unlockedProjectIds, target.id];
      setUnlockedProjectIds(updated);
      localStorage.setItem('menna_portfolio_unlocked_project_ids', JSON.stringify(updated));
      setSelectedProject(target);
      setLockTargetProject(null);
      setPasscode('');
      setPasscodeError(false);
    } else {
      playClickSound();
      setPasscodeError(true);
      setTimeout(() => setPasscodeError(false), 500);
    }
  };

  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, -5, 5, 0],
      transition: { duration: 0.4 }
    },
    idle: { scale: 1, y: 0, opacity: 1, x: 0 }
  };

  const handleCloseModal = () => {
    playClickSound();
    setSelectedProject(null);
    setCurrentImageIndex(0);
    setActiveTab('overview');
  };

  const handleArrowClick = (e: React.MouseEvent, action: 'prev' | 'next') => {
    e.stopPropagation();
    playClickSound();
    if (!selectedProject) return;
    if (action === 'prev') {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const filteredProjects = projects.filter((project) => {
    return selectedCategory === 'all' || project.category === selectedCategory;
  });

  return (
    <section
      id="projects"
      className="theme-bg-primary rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-8 sm:-mt-10 md:-mt-12 relative z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight text-[clamp(3rem,11vw,140px)] mb-10 sm:mb-12">
        Projects
      </h2>

      {/* Controls Container */}
      <div className="flex flex-wrap gap-2 justify-center mb-10 sm:mb-14 max-w-3xl mx-auto relative z-20">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onMouseEnter={playHoverSound}
              onClick={() => {
                playClickSound();
                setSelectedCategory(cat.id);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer flex flex-col items-center ${
                isSelected
                  ? 'bg-[#C9739A] text-white border border-[#C9739A]'
                  : 'bg-transparent border border-current/25 theme-text-primary hover:bg-current/5'
              }`}
            >
              <span>{cat.labelEn}</span>
              <span className="text-[9px] font-normal leading-tight opacity-75">{cat.labelAr}</span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid with Motion Layout */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto relative z-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard 
                project={project} 
                index={i} 
                isUnlocked={unlockedProjectIds.includes(project.id)}
                onSelect={setSelectedProject} 
                onLockClick={setLockTargetProject}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredProjects.length === 0 && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-16"
          >
            <p className="theme-text-muted text-lg font-light">No projects match your criteria.</p>
            <p className="theme-text-muted text-xs font-light mt-1">Try resetting the category filters.</p>
          </motion.div>
        )}
      </motion.div>

      {/* Project Detail Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-[100000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="theme-bg-card theme-border-card border w-full max-w-4xl rounded-[32px] overflow-hidden shadow-2xl relative theme-text-primary flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Side / Top Side: Image Gallery */}
              <div className="w-full md:w-1/2 bg-[#0C0C0C] flex flex-col justify-center relative min-h-[250px] sm:min-h-[300px] md:min-h-full">
                {selectedProject.images && selectedProject.images.length > 0 ? (
                  <div className="relative w-full h-[250px] sm:h-[300px] md:h-full overflow-hidden flex items-center justify-center p-4">
                    <AnimatePresence mode="wait">
                      {selectedProject.images[currentImageIndex].endsWith('.mp4') || 
                       selectedProject.images[currentImageIndex].endsWith('.webm') ? (
                        <motion.video
                          key={currentImageIndex}
                          src={selectedProject.images[currentImageIndex]}
                          autoPlay
                          loop
                          muted
                          playsInline
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -40 }}
                          transition={{ duration: 0.25 }}
                          className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                        />
                      ) : (
                        <motion.img
                          key={currentImageIndex}
                          src={selectedProject.images[currentImageIndex]}
                          alt={`${selectedProject.name} screenshot`}
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -40 }}
                          transition={{ duration: 0.25 }}
                          className="max-w-full max-h-full object-contain rounded-lg"
                        />
                      )}
                    </AnimatePresence>

                    {/* Navigation Arrows (Only if multiple images) */}
                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => handleArrowClick(e, 'prev')}
                          onMouseEnter={playHoverSound}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#111114]/70 border border-white/10 flex items-center justify-center hover:bg-[#C9739A] hover:text-white transition-colors duration-200 cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleArrowClick(e, 'next')}
                          onMouseEnter={playHoverSound}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#111114]/70 border border-white/10 flex items-center justify-center hover:bg-[#C9739A] hover:text-white transition-colors duration-200 cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        {/* Image Counter Indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-[#111114]/80 px-3 py-1.5 rounded-full border border-white/5">
                          {selectedProject.images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                playClickSound();
                                setCurrentImageIndex(idx);
                              }}
                              onMouseEnter={playHoverSound}
                              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                                idx === currentImageIndex ? 'bg-[#C9739A] w-3' : 'bg-white/20'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] flex items-center justify-center">
                    <span className="text-[#9E9EAA] uppercase tracking-wider text-sm font-medium">
                      No Screenshot Available
                    </span>
                  </div>
                )}
              </div>

              {/* Right Side / Bottom Side: Details Panel */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-full">
                {/* Header */}
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[#C9739A] font-bold text-xs uppercase tracking-wider">
                        {selectedProject.type}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black theme-text-primary mt-1">
                        {selectedProject.name}
                      </h3>
                    </div>
                    <button
                      onClick={handleCloseModal}
                      onMouseEnter={playHoverSound}
                      className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Tab Switcher */}
                  <div className="flex border-b border-current/10 mt-6 mb-4 gap-4">
                    <button
                      onClick={() => {
                        playClickSound();
                        setActiveTab('overview');
                      }}
                      onMouseEnter={playHoverSound}
                      className={`pb-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                        activeTab === 'overview'
                          ? 'text-[#C9739A] border-b-2 border-[#C9739A]'
                          : 'theme-text-muted hover:text-current'
                      }`}
                    >
                      Overview / التفاصيل
                    </button>
                    {!selectedProject.comingSoon && (
                      <button
                        onClick={() => {
                          playClickSound();
                          setActiveTab('architecture');
                        }}
                        onMouseEnter={playHoverSound}
                        className={`pb-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                          activeTab === 'architecture'
                            ? 'text-[#C9739A] border-b-2 border-[#C9739A]'
                            : 'theme-text-muted hover:text-current'
                        }`}
                      >
                        Architecture / البنية البرمجية
                      </button>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    {activeTab === 'overview' ? (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="theme-text-muted text-sm leading-relaxed font-light mt-2">
                          {selectedProject.description}
                        </p>

                        {/* Core Features */}
                        {selectedProject.features && selectedProject.features.length > 0 && (
                          <div className="mt-6">
                            <h4 className="text-sm font-semibold uppercase tracking-wider theme-text-primary mb-3">
                              Key Features
                            </h4>
                            <ul className="flex flex-col gap-2">
                              {selectedProject.features.map((feature, idx) => (
                                <li key={idx} className="flex gap-2 text-sm theme-text-muted font-light">
                                  <span className="text-[#C9739A] font-medium">•</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Tags */}
                        <div className="mt-6">
                          <h4 className="text-sm font-semibold uppercase tracking-wider theme-text-primary mb-2">
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedProject.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[11px] bg-[rgba(201,115,154,0.08)] text-[#9B6BA8] border border-[rgba(201,115,154,0.15)] rounded-full px-2.5 py-0.5"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="architecture"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2"
                      >
                        <p className="theme-text-muted text-xs leading-relaxed font-light mb-4">
                          مخطط هيكلي تفاعلي لتوضيح تدفق البيانات (Data Flow) بين أجزاء النظام:
                        </p>
                        <ProjectArchitecture projectId={selectedProject.id} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-4 mt-8 pt-4 border-t border-white/5">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playClickSound()}
                      onMouseEnter={playHoverSound}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#C9739A] to-[#9B6BA8] text-white py-3 rounded-full font-semibold text-sm hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Project
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playClickSound()}
                      onMouseEnter={playHoverSound}
                      className="flex-1 flex items-center justify-center gap-2 border border-white/20 theme-text-primary py-3 rounded-full font-semibold text-sm hover:bg-white/5 active:scale-[0.97] transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Passcode Unlock Modal Overlay */}
      <AnimatePresence>
        {lockTargetProject && (
          <div
            className="fixed inset-0 z-[100000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => {
              playClickSound();
              setLockTargetProject(null);
              setPasscode('');
              setPasscodeError(false);
            }}
          >
            <motion.div
              variants={shakeVariants}
              animate={passcodeError ? 'shake' : 'idle'}
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="theme-bg-card theme-border-card border w-full max-w-md rounded-[32px] p-6 sm:p-8 shadow-2xl relative theme-text-primary text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  playClickSound();
                  setLockTargetProject(null);
                  setPasscode('');
                  setPasscodeError(false);
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors duration-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-16 h-16 bg-[rgba(201,115,154,0.1)] border border-[rgba(201,115,154,0.2)] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔐</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black theme-text-primary">
                Private Project
              </h3>
              <h4 className="text-sm font-semibold text-[#C9739A] mt-1">
                مشروع مغلق وخاص
              </h4>
              <p className="theme-text-muted text-xs leading-relaxed font-light mt-3 px-2">
                هذا المشروع يحتوي على بيانات خاصة ويحتاج إلى رمز دخول للمعاينة. الرجاء إدخال رمز الدخول:
                <br />
                This project contains sensitive data and requires an access code. Please enter the passcode:
              </p>

              <form onSubmit={handleUnlockSubmit} className="mt-6">
                <input
                  type="password"
                  placeholder="Enter passcode / أدخل رمز الدخول..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  autoFocus
                  className={`w-full px-5 py-3 rounded-full text-sm text-center theme-input-bg border theme-text-secondary focus:outline-none transition-colors ${
                    passcodeError 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-current/10 focus:border-[#C9739A]'
                  }`}
                />
                
                {passcodeError && (
                  <p className="text-red-500 text-xs font-medium mt-2">
                    رمز الدخول غير صحيح! حاول مجدداً.
                    <br />
                    Invalid passcode! Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full mt-4 bg-gradient-to-r from-[#C9739A] to-[#9B6BA8] text-white py-3 rounded-full font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-lg"
                >
                  Unlock & View / فتح ومعاينة
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
