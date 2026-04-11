type BrandMarkProps = {
  size?: number;
  className?: string;
  detailed?: boolean;
};

const BrandMark = ({
  size = 24,
  className,
  detailed = true,
}: BrandMarkProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="brandRingBlue" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2AA7FF" />
          <stop offset="1" stopColor="#005DFF" />
        </linearGradient>
      </defs>

      <circle cx="32" cy="32" r="30" fill="#060A1A" />
      <circle cx="32" cy="32" r="27.5" stroke="#F8FAFC" strokeWidth="2.5" />
      {detailed && <circle cx="32" cy="32" r="20.5" stroke="url(#brandRingBlue)" strokeOpacity="0.35" strokeWidth="1.5" />}

      <circle cx="32" cy="18" r="3.6" stroke="#0A6BFF" strokeWidth="2" fill="none" />

      <path d="M18.5 46L32 22.5L45.5 46" stroke="#0A6BFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 46L32 34L39 46" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {detailed && <path d="M32 21.7L25 33" stroke="#0A6BFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />}
      {detailed && <path d="M32 21.7L39 33" stroke="#0A6BFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />}

      {detailed && <circle cx="32" cy="32" r="31" stroke="#0A6BFF" strokeOpacity="0.1" strokeWidth="1" />}
    </svg>
  );
};

export default BrandMark;