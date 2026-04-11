import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import showcaseCircuit from "@/assets/showcase-circuit.jpg";
import showcaseAI from "@/assets/showcase-ai.jpg";
import showcaseWorkspace from "@/assets/showcase-workspace.jpg";

const showcaseItems = [
  {
    image: showcaseCircuit,
    label: "01",
    title: "Architecture That Thinks",
    description:
      "We design systems at the silicon level of logic — every microservice, every data flow, every API boundary mapped with intention. No shortcuts, no tech debt.",
  },
  {
    image: showcaseAI,
    label: "02",
    title: "Intelligence at the Core",
    description:
      "Our ML pipelines don't just process data — they learn, adapt, and evolve. From predictive models to autonomous agents, we embed intelligence where it matters.",
  },
  {
    image: showcaseWorkspace,
    label: "03",
    title: "Engineered to Ship",
    description:
      "Clean codebases, CI/CD from day one, comprehensive test suites. We build software that deploys confidently and scales without friction.",
  },
];

const StickyShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={sectionRef} className="relative" style={{ height: `${showcaseItems.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {showcaseItems.map((item, i) => {
          const segmentSize = 1 / showcaseItems.length;
          const start = i * segmentSize;
          const end = (i + 1) * segmentSize;

          return (
            <ShowcaseSlide
              key={i}
              item={item}
              index={i}
              scrollYProgress={scrollYProgress}
              start={start}
              end={end}
            />
          );
        })}
      </div>
    </section>
  );
};

function ShowcaseSlide({
  item,
  index,
  scrollYProgress,
  start,
  end,
}: {
  item: typeof showcaseItems[0];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  const fadeIn = Math.max(start, 0.001);
  const peak = start + (end - start) * 0.15;
  const fadeOut = start + (end - start) * 0.85;
  const gone = end;

  const opacity = useTransform(
    scrollYProgress,
    index === 0
      ? [fadeIn, peak, fadeOut, gone]
      : [fadeIn, peak, fadeOut, gone],
    index === 0
      ? [1, 1, 1, 0]
      : [0, 1, 1, 0]
  );

  const imageScale = useTransform(
    scrollYProgress,
    [start, end],
    [1.15, 1]
  );

  const textY = useTransform(
    scrollYProgress,
    index === 0 ? [start, peak] : [fadeIn, peak],
    [60, 0]
  );

  const clipProgress = useTransform(
    scrollYProgress,
    index === 0 ? [0, 0.001] : [fadeIn, peak],
    [0, 100]
  );

  return (
    <motion.div
      className="absolute inset-0 flex"
      style={{ opacity, zIndex: index + 1 }}
    >
      {/* Image side */}
      <div className="hidden lg:block w-[55%] h-full relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ scale: imageScale }}
        >
          <motion.div
            className="w-full h-full"
            style={{
              clipPath: useTransform(clipProgress, (v) =>
                `inset(0 ${100 - v}% 0 0)`
              ),
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              loading="lazy"
              width={1920}
              height={1080}
            />
          </motion.div>
        </motion.div>
        {/* Dark overlay on image */}
        <div className="absolute inset-0 bg-heading/20" />
        {/* Numbering on image */}
        <motion.div
          className="absolute bottom-10 left-10 z-10"
          style={{ opacity }}
        >
          <span className="font-mono text-[11px] text-primary-foreground/50 tracking-[0.2em]">
            {item.label}
          </span>
        </motion.div>
      </div>

      {/* Text side */}
      <div className="w-full lg:w-[45%] h-full flex items-center px-8 sm:px-16 lg:px-20">
        <motion.div style={{ y: textY }} className="max-w-lg">
          <span className="text-[10px] font-mono text-primary font-bold tracking-[0.3em] uppercase block mb-6 lg:hidden">
            {item.label}
          </span>
          <h2 className="text-[clamp(2rem,3.5vw,3.2rem)] font-heading font-extrabold text-heading tracking-[-0.03em] leading-[1.08] mb-6">
            {item.title}
          </h2>
          <p className="text-body text-[16px] leading-[1.75] max-w-md">
            {item.description}
          </p>

          {/* Progress dots */}
          <div className="flex gap-3 mt-12">
            {showcaseItems.map((_, j) => (
              <motion.div
                key={j}
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  j === index ? "w-10 bg-primary" : "w-3 bg-border"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default StickyShowcase;
