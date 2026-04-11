import { motion, useScroll, useTransform, MotionValue, useMotionTemplate } from "framer-motion";
import { useRef } from "react";

interface ScrollTextProps {
  text: string;
  className?: string;
  offset?: [string, string];
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = Math.min((index + 1.5) / total, 1);
  const opacity = useTransform(progress, [start, end], [0.08, 1]);
  const y = useTransform(progress, [start, end], [10, 0]);
  const blurValue = useTransform(progress, [start, end], [6, 0]);
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  return (
    <motion.span
      style={{
        opacity,
        y,
        filter
      }}
      className="inline-block mr-[0.3em] will-change-[opacity,transform,filter]"
    >
      {word}
    </motion.span>
  );
}

const ScrollText = ({ text, className = "", offset = ["start 0.85", "start 0.45"], as: Tag = "p" }: ScrollTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset,
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef}>
      <Tag className={className}>
        {words.map((word, i) => (
          <Word
            key={`${word}-${i}`}
            word={word}
            index={i}
            total={words.length}
            progress={scrollYProgress}
          />
        ))}
      </Tag>
    </div>
  );
};

export default ScrollText;
