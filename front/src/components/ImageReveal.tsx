import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageReveal = ({ src, alt, className = "" }: ImageRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.52"],
  });

  const reveal = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.45,
  });

  const clipTop = useTransform(reveal, [0, 0.65, 1], [34, 0, 0]);

  // Animate the image content itself for a premium cinematic reveal.
  const contentScale = useTransform(reveal, [0, 1], [1.22, 1.02]);
  const contentY = useTransform(reveal, [0, 1], [24, -6]);
  const contentX = useTransform(reveal, [0, 1], [-8, 0]);
  const imageOpacity = useTransform(reveal, [0, 0.28, 1], [0.82, 1, 1]);
  const contentBrightness = useTransform(reveal, [0, 1], [0.78, 1]);
  const contentSaturation = useTransform(reveal, [0, 1], [0.9, 1.04]);
  const imageFilter = useMotionTemplate`brightness(${contentBrightness}) saturate(${contentSaturation})`;

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] ${className}`}
    >
      <motion.div
        style={{
          clipPath: useTransform(clipTop, (v) => `inset(${v}% 0 0 0)`),
        }}
        className="overflow-hidden w-full h-full"
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{ scale: contentScale, x: contentX, y: contentY, opacity: imageOpacity, filter: imageFilter }}
          loading="lazy"
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ opacity: useTransform(reveal, [0, 1], [0.22, 0.04]) }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sky-400/30 via-transparent to-white/20"
      />
    </motion.div>
  );
};

export default ImageReveal;