import { Github, Linkedin, Mail } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12.012 2C6.48 2 2 6.48 2 12.012c0 1.768.46 3.49 1.33 5.016L2 22l5.122-1.326a9.96 9.96 0 004.887 1.34h.008c5.53 0 10.012-4.482 10.012-10.014c0-2.68-1.04-5.2-2.93-7.094A9.925 9.925 0 0012.012 2zm6.67 13.918c-.29.816-1.42 1.488-1.96 1.572c-.53.084-1.07.12-3.41-.828c-3-1.224-4.94-4.272-5.09-4.476c-.144-.204-1.194-1.584-1.194-3.024c0-1.44.756-2.148 1.02-2.436c.264-.288.588-.36.78-.36h.564c.18 0 .42.012.648.516c.228.528.78 1.908.852 2.052c.072.144.12.312.024.504c-.096.192-.144.312-.288.48c-.144.168-.312.384-.444.516c-.144.144-.3.3-.132.588c.168.288.756 1.248 1.62 2.016c1.116.996 2.064 1.308 2.352 1.452c.288.144.456.12.624-.072c.168-.192.732-.852.924-1.14c.192-.288.384-.24.648-.144c.264.096 1.68.792 1.968.936c.288.144.48.216.552.336c.072.12.072.708-.216 1.524z" />
  </svg>
);

const socials = [
  { icon: Github, href: 'https://github.com/mna80455-debug', label: 'GitHub' },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/in/menna-aliwa-a6943625a',
    label: 'LinkedIn',
  },
  { icon: Mail, href: 'mailto:mna80455@gmail.com', label: 'Email' },
  { icon: WhatsAppIcon, href: 'https://wa.me/20101752728', label: 'WhatsApp' },
];

export default function Footer() {
  return (
    <footer className="theme-bg-primary border-t theme-border-card px-6 md:px-10 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Brand */}
        <span className="gradient-text font-extrabold text-2xl">menna.</span>

        {/* Info */}
        <p className="theme-text-muted text-xs sm:text-sm opacity-60 text-center">
          Menna Aliwa · IT Student · El Sharqia, Egypt
        </p>

        {/* Social icons */}
        <div className="flex gap-4">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                onClick={playClickSound}
                onMouseEnter={playHoverSound}
                className="theme-text-muted hover:text-[#E8A0BF] transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
