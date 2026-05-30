export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center flex-col text-center px-6 font-outfit">
      <h1 className="hero-heading text-[clamp(5rem,20vw,200px)] font-black leading-none">
        404
      </h1>

      <p className="text-[#D7E2EA] text-xl sm:text-2xl font-medium mt-4">
        Page Not Found
      </p>

      <p className="text-[#9E9EAA] text-sm mt-2 max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>

      <a
        href="/"
        className="mt-8 inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white text-sm transition-all duration-300 hover:scale-[1.05] active:scale-[0.97]"
        style={{
          background:
            'linear-gradient(135deg, #C9739A 0%, #9B6BA8 50%, #D8B4D8 100%)',
        }}
      >
        Back to Home
      </a>
    </div>
  );
}
