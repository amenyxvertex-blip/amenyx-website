import { useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

export function useScrollText(offset: [string, string] = ["start 0.9", "start 0.3"]) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  return { ref, scrollYProgress };
}

export function useWordReveal(
  scrollYProgress: MotionValue<number>,
  index: number,
  total: number
) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  const y = useTransform(scrollYProgress, [start, end], [8, 0]);
  return { opacity, y };
}
