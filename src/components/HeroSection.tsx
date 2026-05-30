import { useState } from 'react';
import { Download, Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import FadeIn from './FadeIn';
import Magnet from './Magnet';
import ContactButton from './ContactButton';
import ImageWithFallback from './ImageWithFallback';
import { playClickSound, playHoverSound, getMutedState, setMutedState } from '../utils/audio';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

interface HeroSectionProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export default function HeroSection({ theme, toggleTheme }: HeroSectionProps) {
  const [muted, setMuted] = useState(getMutedState());

  const handleMuteToggle = () => {
    const newState = !muted;
    setMuted(newState);
    setMutedState(newState);
    if (!newState) {
      // Play a click sound to confirm unmute
      setTimeout(() => playClickSound(), 50);
    }
  };

  const handleLinkClick = () => {
    playClickSound();
  };

  return (
    <section className="min-h-screen flex flex-col relative overflow-hidden" style={{ overflowX: 'clip' }}>
      {/* Navbar */}
      <FadeIn delay={0} y={20}>
        <nav className="flex justify-between items-center px-6 md:px-12 pt-6 md:pt-8 relative z-50">
          <div className="flex items-center gap-5 sm:gap-6 md:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                onMouseEnter={playHoverSound}
                className="relative py-1 group theme-text-primary font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-lg transition-colors duration-200"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C9739A] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle Button */}
            <button
              onClick={handleMuteToggle}
              onMouseEnter={playHoverSound}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer theme-text-primary flex items-center justify-center"
              aria-label="Toggle sound"
            >
              {muted ? (
                <VolumeX className="w-4 h-4 opacity-50" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#C9739A]" />
              )}
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={() => {
                playClickSound();
                toggleTheme();
              }}
              onMouseEnter={playHoverSound}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer theme-text-primary flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#C9739A]" />
              ) : (
                <Moon className="w-4 h-4 text-[#C9739A]" />
              )}
            </button>

            {/* Download CV */}
            <a
              href="/Menna_Aliwa_CV.html"
              download
              onClick={handleLinkClick}
              onMouseEnter={playHoverSound}
              className="flex items-center gap-2 theme-text-primary text-xs sm:text-sm font-medium uppercase tracking-wider border border-current/25 rounded-full px-4 py-2.5 hover:bg-current/5 transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download CV</span>
            </a>
          </div>
        </nav>
      </FadeIn>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center px-6 md:px-12 lg:px-16 py-8 md:py-12 z-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full max-w-7xl mx-auto items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
            <FadeIn delay={0.15} y={30}>
              <span className="text-rose font-semibold tracking-widest text-xs sm:text-sm md:text-base uppercase mb-2 block">
                HI, I{'\u2019'}M
              </span>
            </FadeIn>
            
            <FadeIn delay={0.25} y={40}>
              <h1 className="hero-heading font-black uppercase tracking-tight leading-[0.95] text-[9.5vw] sm:text-[8vw] md:text-[6.5vw] lg:text-[5vw] xl:text-[5.5vw] mb-3">
                Menna Aliwa
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.35} y={30}>
              <h2 
                className="text-rose font-black text-[5.5vw] sm:text-[4.5vw] md:text-[3.5vw] lg:text-[2vw] xl:text-[2.2vw] opacity-90 mb-6" 
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                منة عليوه عبد الرحمن
              </h2>
            </FadeIn>

            <FadeIn delay={0.45} y={20}>
              <p className="theme-text-primary font-light uppercase tracking-wide leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 mb-8">
                an IT student &amp; developer crafting smart web tools that solve real-world problems
              </p>
            </FadeIn>

            <FadeIn delay={0.55} y={20}>
              <div className="flex justify-center lg:justify-start" onClick={handleLinkClick} onMouseEnter={playHoverSound}>
                <ContactButton />
              </div>
            </FadeIn>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2 relative py-4 lg:py-0">
            <FadeIn delay={0.6} y={30}>
              <Magnet padding={120} strength={3}>
                <div className="relative group">
                  {/* Decorative glow backdrop */}
                  <div className="absolute -inset-10 bg-gradient-to-tr from-[#C9739A]/15 via-[#9B6BA8]/5 to-transparent rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="relative max-w-[240px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-[420px]">
                    <ImageWithFallback
                      src="/images/profile.png"
                      alt="Menna Aliwa"
                      className="w-full h-auto pointer-events-none object-cover"
                      loading="eager"
                    />
                    
                    {/* Bottom overlay vignette */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to top, var(--body-bg) 0%, transparent 100%)',
                      }}
                    />
                  </div>
                </div>
              </Magnet>
            </FadeIn>
          </div>

        </div>
      </div>
      
      {/* Tiny decorative elements */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-20 hidden lg:block text-xs uppercase tracking-widest text-[#9E9EAA] animate-bounce">
        Scroll Down
      </div>
    </section>
  );
}
