import { useState, useEffect, FormEvent } from 'react';
import { Mail, Github, Linkedin, MapPin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { AnimatePresence, motion } from 'framer-motion';
import FadeIn from './FadeIn';
import { playClickSound, playHoverSound } from '../utils/audio';

// Production EmailJS IDs
const SERVICE_ID = 'service_dwenirj';
const TEMPLATE_ID = 'template_55rgzmi';
const PUBLIC_KEY = '9en6RtBorChErnpBW';

type FormState = 'idle' | 'sending' | 'sent' | 'error';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12.012 2C6.48 2 2 6.48 2 12.012c0 1.768.46 3.49 1.33 5.016L2 22l5.122-1.326a9.96 9.96 0 004.887 1.34h.008c5.53 0 10.012-4.482 10.012-10.014c0-2.68-1.04-5.2-2.93-7.094A9.925 9.925 0 0012.012 2zm6.67 13.918c-.29.816-1.42 1.488-1.96 1.572c-.53.084-1.07.12-3.41-.828c-3-1.224-4.94-4.272-5.09-4.476c-.144-.204-1.194-1.584-1.194-3.024c0-1.44.756-2.148 1.02-2.436c.264-.288.588-.36.78-.36h.564c.18 0 .42.012.648.516c.228.528.78 1.908.852 2.052c.072.144.12.312.024.504c-.096.192-.144.312-.288.48c-.144.168-.312.384-.444.516c-.144.144-.3.3-.132.588c.168.288.756 1.248 1.62 2.016c1.116.996 2.064 1.308 2.352 1.452c.288.144.456.12.624-.072c.168-.192.732-.852.924-1.14c.192-.288.384-.24.648-.144c.264.096 1.68.792 1.968.936c.288.144.48.216.552.336c.072.12.072.708-.216 1.524z" />
  </svg>
);

const contactItems = [
  {
    icon: Mail,
    text: 'mna80455@gmail.com',
    href: 'mailto:mna80455@gmail.com',
  },
  {
    icon: WhatsAppIcon,
    text: 'WhatsApp: 0101752728',
    href: 'https://wa.me/20101752728',
  },
  {
    icon: Github,
    text: 'github.com/mna80455-debug',
    href: 'https://github.com/mna80455-debug',
  },
  {
    icon: Linkedin,
    text: 'linkedin.com/in/menna-aliwa-a6943625a',
    href: 'https://linkedin.com/in/menna-aliwa-a6943625a',
  },
  {
    icon: MapPin,
    text: 'El Sharqia, Egypt',
    href: undefined,
  },
];

export default function ContactSection() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: '',
  });

  // Listen for proposal autofill events from the System Analysis Wizard
  useEffect(() => {
    const handleAutofill = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setFormData((prev) => ({ ...prev, message: customEvent.detail }));
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          setTimeout(() => {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    };
    window.addEventListener('autofill_message', handleAutofill);
    return () => window.removeEventListener('autofill_message', handleAutofill);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('sending');

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);
      setFormState('sent');
      setFormData({ from_name: '', from_email: '', message: '' });
    } catch {
      setFormState('error');
    }
  };

  return (
    <section
      id="contact"
      className="theme-bg-secondary rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2 className="theme-text-secondary font-black uppercase text-center text-[clamp(3rem,11vw,140px)] mb-14">
          Get in Touch
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-5xl mx-auto">
        {/* Left — Contact info */}
        <FadeIn delay={0.1} y={30}>
          <div className="flex flex-col gap-4">
            {contactItems.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="flex items-center gap-4 p-4 theme-input-bg rounded-2xl">
                  <div className="w-10 h-10 bg-[rgba(201,115,154,0.1)] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#C9739A]" />
                  </div>
                  <span className="theme-text-secondary text-sm sm:text-base break-all">
                    {item.text}
                  </span>
                </div>
              );

              const isEmail = item.text === 'mna80455@gmail.com';

              const handleItemClick = (e: React.MouseEvent) => {
                playClickSound();
                if (isEmail) {
                  e.preventDefault();
                  navigator.clipboard.writeText(item.text);
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 2500);
                }
              };

              return item.href ? (
                <a
                  key={item.text}
                  href={item.href}
                  onClick={handleItemClick}
                  onMouseEnter={playHoverSound}
                  target={isEmail ? undefined : "_blank"}
                  rel={isEmail ? undefined : "noopener noreferrer"}
                  className="hover:opacity-80 transition-opacity"
                >
                  {content}
                </a>
              ) : (
                <div key={item.text}>{content}</div>
              );
            })}
          </div>
        </FadeIn>

        {/* Right — Form */}
        <FadeIn delay={0.2} y={30}>
          <div>
            <h3 className="theme-text-secondary font-semibold text-xl mb-6">
              Send me a message
            </h3>

            <form
              onSubmit={(e) => {
                playClickSound();
                handleSubmit(e);
              }}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                placeholder="Your name"
                required
                value={formData.from_name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, from_name: e.target.value }))
                }
                className="w-full px-4 py-3 theme-input-bg border border-current/10 rounded-xl theme-text-secondary placeholder-[#9E9EAA]/60 focus:outline-none focus:border-[#C9739A] transition-colors text-sm"
              />
              <input
                type="email"
                placeholder="Your email"
                required
                value={formData.from_email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, from_email: e.target.value }))
                }
                className="w-full px-4 py-3 theme-input-bg border border-current/10 rounded-xl theme-text-secondary placeholder-[#9E9EAA]/60 focus:outline-none focus:border-[#C9739A] transition-colors text-sm"
              />
              <textarea
                placeholder="Your message"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                className="w-full px-4 py-3 theme-input-bg border border-current/10 rounded-xl theme-text-secondary placeholder-[#9E9EAA]/60 focus:outline-none focus:border-[#C9739A] transition-colors text-sm min-h-[120px] resize-none"
              />

              <button
                type="submit"
                disabled={formState === 'sending'}
                onMouseEnter={playHoverSound}
                className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white text-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background:
                    'linear-gradient(135deg, #C9739A 0%, #9B6BA8 50%, #D8B4D8 100%)',
                }}
              >
                <Send className="w-4 h-4" />
                {formState === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {formState === 'sent' && (
                <p className="text-green-600 text-sm text-center mt-2 font-medium">
                  Message sent successfully! I&apos;ll get back to you soon.
                </p>
              )}
              {formState === 'error' && (
                <p className="text-red-500 text-sm text-center mt-2 font-medium">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
            </form>
          </div>
        </FadeIn>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%', scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: -20, x: '-50%', scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="fixed bottom-10 left-1/2 z-[100000] bg-[#111114] border border-[#C9739A]/30 text-[#D7E2EA] px-6 py-3 rounded-full shadow-[0_10px_30px_rgba(201,115,154,0.15)] flex items-center gap-2.5 text-sm font-medium tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Email copied to clipboard! 📋
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
