interface LiveProjectButtonProps {
  href: string;
  label?: string;
}

const LiveProjectButton = ({
  href,
  label = 'Live Project',
}: LiveProjectButtonProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-block rounded-full
        border-2 border-[#D7E2EA]/30
        text-[#D7E2EA] font-medium uppercase tracking-widest
        px-6 py-2.5 sm:px-8 sm:py-3
        text-xs sm:text-sm
        hover:bg-[#D7E2EA]/10 hover:border-[#D7E2EA]/60
        transition-all duration-300
      `}
    >
      {label}
    </a>
  );
};

export default LiveProjectButton;
