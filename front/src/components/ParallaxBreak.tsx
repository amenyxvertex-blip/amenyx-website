import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import ScrollText from "./ScrollText";

const ParallaxBreak = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const y = useSpring(rawY, { stiffness: 50, damping: 20 });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen bg-[#020408] overflow-hidden flex items-center justify-center">
      {/* Background Image Container with Parallax - using our generated neon flow image */}
      <motion.div 
        className="absolute inset-x-0 -inset-y-32 z-0"
        style={{ y, opacity }}
      >
        <img 
          src="/parallax-bg.png" 
          alt="Data flow neural network" 
          className="w-full h-full object-cover object-center opacity-40 mix-blend-screen"
        />
      </motion.div>

      {/* Top / Bottom soft gradient fade blocks to merge seamlessly with surrounding lighter or darker sections */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#020408] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#f8fafc] to-transparent z-10 pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        <ScrollText 
          as="h2"
          text="We don't just write code. We architect systems that think, learn, and redefine what's possible in your vertical."
          className="font-heading font-extrabold text-[clamp(2.5rem,5vw,5rem)] tracking-[-0.03em] leading-[1.05] text-white"
        />
        <motion.div 
          className="mt-12 mx-auto w-px h-24 bg-gradient-to-b from-sky-500 to-transparent"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </section>
  );
};

export default ParallaxBreak;
