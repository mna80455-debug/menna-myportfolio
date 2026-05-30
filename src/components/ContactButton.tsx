interface ContactButtonProps {
  className?: string;
  onClick?: () => void;
}

const ContactButton = ({ className, onClick }: ContactButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        rounded-full font-medium uppercase tracking-widest text-white
        px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4
        text-xs sm:text-sm md:text-base
        hover:scale-[1.03] transition-transform duration-200
        ${className ?? ''}
      `}
      style={{
        background:
          'linear-gradient(135deg, #1A0520 7%, #C9739A 40%, #9B6BA8 72%, #B84600 100%)',
        boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.15)',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      Contact Me
    </button>
  );
};

export default ContactButton;
