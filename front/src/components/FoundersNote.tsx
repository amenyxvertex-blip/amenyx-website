import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollText from "./ScrollText";

const FoundersNote = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const secondParagraphRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: secondParagraphProgress } = useScroll({
    target: secondParagraphRef,
    offset: ["start 0.9", "start 0.52"],
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [26, -20]);
  const quoteOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 0.08]);
  const glowOpacity = useTransform(scrollYProgress, [0.15, 0.5], [0.18, 0.07]);
  const cardRotate = useTransform(scrollYProgress, [0.35, 0.6], [0.6, 0]);

  // Signature appears shortly after the second paragraph has mostly settled.
  const signatureOpacityRaw = useTransform(secondParagraphProgress, [0.78, 1], [0, 1], { clamp: true });
  const signatureXRaw = useTransform(secondParagraphProgress, [0.78, 1], [-220, 0], { clamp: true });
  const signatureOpacity = useSpring(signatureOpacityRaw, { stiffness: 120, damping: 24, mass: 0.8 });
  const signatureX = useSpring(signatureXRaw, { stiffness: 120, damping: 24, mass: 0.8 });

  return (
    <section ref={sectionRef} className="py-24 sm:py-28 md:py-40 px-6 sm:px-10 bg-gradient-to-b from-slate-50/70 to-white relative overflow-hidden">
      {/* Subtle dot mesh */}
      <div className="absolute inset-0 dot-mesh opacity-25" />
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_10%_20%,rgba(14,165,233,0.16),transparent_42%),radial-gradient(circle_at_88%_78%,rgba(15,23,42,0.1),transparent_52%)]"
      />

      <div className="max-w-3xl mx-auto relative">
        <motion.div
          style={{ y: cardY, rotate: cardRotate }}
          className="relative bg-white/95 backdrop-blur-[2px] rounded-[2rem] p-7 sm:p-12 md:p-16 shadow-[0_28px_80px_-36px_rgba(15,23,42,0.35)] border border-slate-200/85 ring-1 ring-white/80"
        >
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-[2rem] bg-gradient-to-r from-sky-500/70 via-sky-300/35 to-transparent" />

          {/* Quote watermark */}
          <motion.div
            style={{ opacity: quoteOpacity }}
            className="absolute top-5 left-8 text-[10rem] leading-none font-heading font-extrabold text-sky-700 select-none pointer-events-none"
          >
            &ldquo;
          </motion.div>

          <div className="relative z-10">
            <motion.h3
              className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold mb-8 sm:mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              A Note from the Founders
            </motion.h3>

            <div className="space-y-6 sm:space-y-8">
              <ScrollText
                text="Amenyx Vertex began in a single room with two developers who were tired of seeing businesses struggle with over-complicated systems. We watched companies pour resources into bloated technology that looked impressive on paper but failed to solve their actual problems. We realized that AI could change everything—but only if it were built for clarity and direct results, rather than just complexity."
                className="font-handwritten text-[22px] sm:text-[26px] text-slate-600 leading-[1.6]"
              />
              <div ref={secondParagraphRef}>
                <ScrollText
                  text="Our mission is simple: we build intelligence that actually moves the needle for your business. We strip away the noise to deliver high-performance, resilient systems that evolve as you grow. We don't just ship products; we engineer long-term solutions as your dedicated technical partner. Our work is driven by research, but our goal is impact."
                  className="font-handwritten text-[22px] sm:text-[26px] text-slate-600 leading-[1.6]"
                />
              </div>
            </div>

            <motion.div
              style={{ opacity: signatureOpacity, x: signatureX }}
              className="mt-10 sm:mt-14 flex justify-end"
            >
              <div className="text-right" style={{ transform: "rotate(-4deg)" }}>
                <div className="font-signature text-5xl text-slate-800 font-bold drop-shadow-sm">
                  M & M
                </div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-sky-500/80 mt-2 font-semibold">
                  Founders
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FoundersNote;
