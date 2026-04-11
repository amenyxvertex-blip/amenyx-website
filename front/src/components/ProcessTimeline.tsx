import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import ScrollText from "./ScrollText";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Deep-dive into your business logic, technical constraints, and success metrics to architect the right solution.",
  },
  {
    number: "02",
    title: "Engineering",
    description: "Iterative development with clean architecture, comprehensive testing, and continuous integration from day one.",
  },
  {
    number: "03",
    title: "Validation",
    description: "Rigorous QA cycles, performance benchmarking, and user acceptance testing to ensure production readiness.",
  },
  {
    number: "04",
    title: "Deployment",
    description: "Zero-downtime launches with monitoring, observability, and ongoing support for sustainable operation.",
  },
];

const TimelineStep = ({ step, index, progress }: { step: typeof steps[0]; index: number; progress: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Create a specific active threshold for each step based on the overall scroll progress of the container
  const activationThreshold = (index + 0.5) / steps.length;
  
  // This turns from 0 to 1 very quickly as the scroll progress passes the threshold
  const activeSpring = useTransform(progress, [activationThreshold - 0.1, activationThreshold], [0, 1]);
  
  // Map visuals based on activity
  const opacity = useTransform(activeSpring, [0, 1], [0.35, 1]);
  const nodeScale = useTransform(activeSpring, [0, 1], [0.8, 1.1]);
  const innerNodeScale = useTransform(activeSpring, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
      <motion.div
        style={{ opacity }}
        className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} transition-transform duration-700 hover:scale-[1.02]`}
      >
        <span className="text-[10px] font-mono text-sky-600 font-bold tracking-[0.2em] uppercase">
          Phase {step.number}
        </span>
        <h3 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 mt-3 mb-4 tracking-tight drop-shadow-sm">
          {step.title}
        </h3>
        <p className="text-slate-600 text-[16px] leading-[1.7] max-w-sm inline-block">
          {step.description}
        </p>
      </motion.div>

      <motion.div
        style={{ scale: nodeScale }}
        className="relative flex-shrink-0 z-10 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 border border-slate-300"
      >
        <motion.div 
           style={{ scale: innerNodeScale }}
           className="w-3 h-3 rounded-full bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.8)]"
        />
      </motion.div>

      <div className="flex-1 hidden md:block" />
    </div>
  );
};

const ProcessTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Smooth out the line fill with a spring
  const lineScaleY = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  return (
    <section id="process" ref={sectionRef} className="relative py-24 sm:py-28 md:py-40 bg-background overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold block mb-4">
            How We Work
          </span>
          <ScrollText
            text="The Vertex Lifecycle"
            as="h2"
            className="text-[clamp(2.5rem,4vw,3.5rem)] font-heading font-bold text-slate-900 tracking-[-0.03em] leading-[1.05]"
          />
        </div>

        {/* Mobile: always-visible cards for readability */}
        <div className="md:hidden space-y-10">
          {steps.map((step) => (
            <article key={step.number} className="rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-sm px-5 py-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#00A3FF] font-semibold block mb-2">
                Phase {step.number}
              </span>
              <h3 className="text-[1.55rem] font-heading font-bold text-heading tracking-tight leading-[1.1] mb-3">
                {step.title}
              </h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">{step.description}</p>
            </article>
          ))}
        </div>

        <div className="relative hidden md:block">
          {/* Static gray background line */}
          <div className="absolute left-1/2 top-4 bottom-4 w-px bg-slate-200 -translate-x-1/2 hidden md:block" />
          
          {/* Animated fill-and-glow vertical line */}
          <motion.div
            style={{ scaleY: lineScaleY, transformOrigin: "top" }}
            className="absolute left-[calc(50%-1px)] top-4 bottom-4 w-[2px] bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600 shadow-[0_0_10px_rgba(14,165,233,0.6)] hidden md:block z-0"
          />

          <div className="space-y-24 md:space-y-36 relative z-10 py-10">
            {steps.map((step, i) => (
              <TimelineStep key={step.number} step={step} index={i} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
