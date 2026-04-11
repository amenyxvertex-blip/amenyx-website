import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import BrandMark from "@/components/BrandMark";

const shapes = [
  { width: 420, height: 240, top: -50, left: -80, delay: 0 },
  { width: 320, height: 200, top: -30, right: -50, delay: 0.15 },
  { width: 280, height: 170, bottom: -40, left: 120, delay: 0.3 },
  { width: 360, height: 220, bottom: -60, right: -30, delay: 0.08 },
  { width: 220, height: 150, top: 140, left: 220, delay: 0.22 },
];

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        // Non-linear progress for more organic feel
        const remaining = 100 - p;
        const increment = Math.max(1, remaining * 0.08);
        return Math.min(100, p + increment);
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {progress <= 100 && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {shapes.map((shape, i) => (
            <motion.div
              key={i}
              className="loading-shape"
              style={{
                width: shape.width,
                height: shape.height,
                top: shape.top,
                left: shape.left,
                right: (shape as any).right,
                bottom: (shape as any).bottom,
              }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: [0, 0.25, 0.15],
                scale: [0.7, 1, 0.95],
              }}
              transition={{
                delay: shape.delay,
                duration: 2,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          ))}

          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-3 text-heading"
            >
              <BrandMark size={30} detailed />
              <span className="font-heading text-xl font-bold text-heading tracking-tight">
                Amenyx Vertex
              </span>
            </motion.div>

            <motion.div
              className="w-52 h-[1.5px] bg-border/60 rounded-full overflow-hidden"
              initial={{ opacity: 0, scaleX: 0.5 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <motion.div
                className="h-full bg-primary/80 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
