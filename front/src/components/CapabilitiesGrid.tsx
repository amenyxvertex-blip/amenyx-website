import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Brain, Bot, Eye, Workflow, Building2, AppWindow } from "lucide-react";

const capabilities = [
  {
    id: "machine-learning",
    icon: Brain, 
    title: "Machine Learning Tasks", 
    description: "Most models guess. Ours understand. We train custom AI architectures on your proprietary data, turning trapped information into an unfair competitive advantage.",
    highlights: [
      "Predictive Analytics",
      "Dynamic Classification",
      "Demand Forecasting",
      "Model Fine-Tuning",
      "Anomaly Detection",
      "Decision Intelligence",
    ]
  },
  {
    id: "ai-agents",
    icon: Bot, 
    title: "Agents Dev & Maintenance", 
    description: "Don't just automate tasks—automate thinking. We deploy autonomous intelligence that handles complex, multi-step reasoning, learning dynamically from edge cases without human intervention.",
    highlights: [
      "Autonomous Workflows",
      "Self-Correcting Logic",
      "Multi-Agent Systems",
      "Prompt Orchestration",
      "24/7 Agent Monitoring",
      "Guardrail Engineering",
    ]
  },
  {
    id: "computer-vision",
    icon: Eye, 
    title: "Computer Vision", 
    description: "Systems that don't just see, but perceive context. From flaw detection in manufacturing to real-time behavioral analysis, we translate pixels into immediate, actionable truth.",
    highlights: [
      "Object Detection",
      "Real-Time Processing",
      "Quality Inspection",
      "Facial Landmarking",
      "Video Intelligence",
      "Scene Segmentation",
    ]
  },
  {
    id: "workflow-automation",
    icon: Workflow, 
    title: "Workflow Automations", 
    description: "The end of operational friction. We architect intelligent pipelines that instantly connect your fragmented tools, eliminating human bottlenecks and reducing operating overhead to zero.",
    highlights: [
      "Frictionless Sync",
      "Event-Driven Logic",
      "No-Code Integrations",
      "Approval Flows",
      "RPA Augmentation",
      "SLA Automation",
    ]
  },
  {
    id: "business-tech",
    icon: Building2, 
    title: "Business Tech Solutions", 
    description: "Technology should conform to your business, not the other way around. We engineer deeply integrated, enterprise-grade platforms precisely calibrated for your industry's unique demands.",
    highlights: [
      "Enterprise Architecture",
      "Bespoke Integration",
      "Legacy Modernization",
      "KPI Dashboards",
      "Data Governance",
      "Process Re-Engineering",
    ]
  },
  {
    id: "app-development",
    icon: AppWindow, 
    title: "Application Building", 
    description: "We don't build apps; we engineer digital assets. High-performance, flawlessly secure full-stack ecosystems designed to scale from user one to user one million effortlessly.",
    highlights: [
      "Cloud-Native Scale",
      "Zero-Trust Security",
      "API-First Design",
      "High-Performance UI",
      "Secure Auth Flows",
      "Production DevOps",
    ]
  },
];

const CapabilitiesGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardScrollRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  // We map the 0-1 scroll progress to an active index 0 to length-1
  useTransform(scrollYProgress, (latest) => {
    // slightly before end to feel responsive
    const idx = Math.min(Math.floor(latest * capabilities.length), capabilities.length - 1);
    if (idx !== activeIndex) setActiveIndex(idx);
    return latest;
  });

  const handleCardWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const scrollEl = cardScrollRef.current;
    if (!scrollEl) return;

    const maxScrollTop = scrollEl.scrollHeight - scrollEl.clientHeight;
    if (maxScrollTop <= 0) return;

    // Normalize wheel deltas from lines/pages into pixels.
    let deltaY = event.deltaY;
    if (event.deltaMode === 1) deltaY *= 16;
    if (event.deltaMode === 2) deltaY *= scrollEl.clientHeight;

    const canScrollUp = scrollEl.scrollTop > 0;
    const canScrollDown = scrollEl.scrollTop < maxScrollTop - 0.5;
    const shouldConsume = (deltaY < 0 && canScrollUp) || (deltaY > 0 && canScrollDown);

    if (shouldConsume) {
      // While hovering the card, route gesture scrolling into this container.
      event.preventDefault();
      scrollEl.scrollTop = Math.min(maxScrollTop, Math.max(0, scrollEl.scrollTop + deltaY));
    }
  };

  return (
    <section id="services" className="bg-slate-50">
      {/* Mobile/Tablet: static cards to avoid sticky-layout clipping on small viewports */}
      <div className="lg:hidden max-w-7xl mx-auto px-6 sm:px-10 py-20">
        <div className="mb-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-semibold block mb-4">
            What We Do
          </span>
          <h2 className="text-[clamp(1.9rem,7vw,2.7rem)] font-heading font-bold text-heading tracking-[-0.02em] leading-[1.15]">
            Systemic Excellence — engineering intelligence across every layer.
          </h2>
        </div>

        <div className="space-y-5">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <article key={cap.title} id={`mobile-${cap.id}`} className="glass-card bg-white rounded-2xl p-6 border border-slate-200/70 scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono tracking-[0.2em] text-sky-600">0{i + 1}</span>
                  <h3 className="text-3xl font-heading font-bold text-slate-900 tracking-tight">{cap.title}</h3>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-white to-slate-50 flex items-center justify-center border border-slate-200/80 shadow-sm shadow-slate-200/50 mb-4">
                  <Icon className="w-6 h-6 text-[#00A3FF]" strokeWidth={1.7} />
                </div>

                <p className="text-[16px] text-slate-600 leading-[1.65]">{cap.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {cap.highlights.map((highlight) => (
                    <span key={highlight} className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
                      {highlight}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Desktop: sticky interactive presentation */}
      <section ref={sectionRef} className="hidden lg:block relative h-[600vh]">
        {/* Invisible anchors mapping to the scroll positions */}
        {capabilities.map((cap, i) => (
          <div key={cap.id} id={`desktop-${cap.id}`} className="absolute w-full pointer-events-none" style={{ top: `${i * 100}vh`, height: '100vh' }} />
        ))}
        
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-visible w-full">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full h-full flex flex-col pt-20 lg:pt-24 pb-10 lg:pb-14">
            <div className="mb-10 lg:mb-12">
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-semibold block mb-4">
                What We Do
              </span>
              <h2 className="text-[clamp(1.8rem,3.5vw,3.2rem)] font-heading font-bold text-heading tracking-[-0.02em] leading-[1.15] max-w-3xl">
                Systemic Excellence — engineering intelligence across every layer.
              </h2>
            </div>

            <div className="flex-1 grid lg:grid-cols-12 gap-8 lg:gap-16 relative min-h-0">
              <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
                {capabilities.map((cap, i) => (
                  <div
                    key={i}
                    className={`flex items-baseline gap-6 transition-all duration-700 cursor-default ${i === activeIndex ? "opacity-100 translate-x-2" : "opacity-30 blur-[1px]"}`}
                  >
                    <span className={`text-sm font-mono tracking-widest ${i === activeIndex ? "text-sky-600" : "text-slate-400"}`}>0{i + 1}</span>
                    <h3 className={`text-[1.65rem] sm:text-[1.9rem] font-heading font-bold tracking-tight ${i === activeIndex ? "text-slate-900" : "text-slate-500"}`}>
                      {cap.title}
                    </h3>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-7 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05, y: -20, filter: "blur(4px)" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full"
                  >
                    <div
                      ref={cardScrollRef}
                      onWheel={handleCardWheel}
                      className="w-full max-h-[70vh] overflow-y-auto overflow-x-hidden overscroll-contain glass-card bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/60 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.05)] group relative ring-1 ring-inset ring-white/80"
                    >
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />
                      <div className="absolute -inset-10 bg-gradient-to-br from-sky-50/50 to-transparent pointer-events-none rounded-full blur-3xl" />

                      <div className="relative z-10 space-y-5">
                        {(() => {
                          const Icon = capabilities[activeIndex].icon;
                          return (
                            <div className="w-[72px] h-[72px] rounded-[20px] bg-gradient-to-b from-white to-slate-50 flex items-center justify-center border border-slate-200/80 shadow-sm shadow-slate-200/50">
                              <Icon className="w-8 h-8 text-[#00A3FF]" strokeWidth={1.5} />
                            </div>
                          );
                        })()}

                        <div>
                          <h3 className="text-[clamp(1.6rem,2.3vw,2.25rem)] font-heading font-extrabold text-slate-900 mb-4 tracking-[-0.02em] leading-[1.1]">
                            {capabilities[activeIndex].title}
                          </h3>
                          <p className="text-[15px] sm:text-[16px] text-slate-500 leading-[1.65] font-body max-w-lg font-medium pr-1">
                            {capabilities[activeIndex].description}
                          </p>
                        </div>

                        <div className="pt-2 flex flex-wrap gap-2.5">
                          {capabilities[activeIndex].highlights.map((highlight, idx) => (
                            <div key={idx} className="px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-600 uppercase tracking-wide">
                              {highlight}
                            </div>
                          ))}
                        </div>

                        <div className="pt-5 border-t border-slate-100 flex gap-2">
                          {capabilities.map((_, dotIdx) => (
                            <motion.span
                              key={dotIdx}
                              className={`w-1.5 h-1.5 rounded-full ${dotIdx === activeIndex ? "bg-[#00A3FF]" : "bg-slate-200"}`}
                              layoutId="activeDot"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default CapabilitiesGrid;
