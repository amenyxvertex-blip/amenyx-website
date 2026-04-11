import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const webhookLogs = [
  { method: "POST", path: "/v1/ingest", status: "200 OK", time: "12ms" },
  { method: "GET", path: "/v1/health", status: "200 OK", time: "3ms" },
  { method: "POST", path: "/v1/predict", status: "201 Created", time: "89ms" },
  { method: "PUT", path: "/v1/models/sync", status: "200 OK", time: "45ms" },
  { method: "POST", path: "/v1/events", status: "202 Accepted", time: "8ms" },
];

const topologyNodes = [
  { label: "api-gateway", x: 20, y: 20 },
  { label: "ml-service", x: 160, y: 60 },
  { label: "data-lake", x: 60, y: 120 },
  { label: "auth", x: 200, y: 130 },
];

const ScrollIndicator = () => (
  <motion.div
    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-slate-400"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 3, duration: 1 }}
  >
    <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/50">Scroll to explore</span>
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      className="w-5 h-9 rounded-full border border-white/20 flex justify-center pt-2"
    >
      <motion.div
        className="w-1 h-2 bg-white/60 rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  </motion.div>
);

const LineText = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <div className="overflow-hidden leading-[1.05] tracking-tight pb-2 pt-1">
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        y: { type: "spring", stiffness: 60, damping: 15, delay },
        opacity: { duration: 0.8, delay, ease: "easeOut" }
      }}
    >
      {children}
    </motion.div>
  </div>
);

const HeroSection = () => {
  const [activeLog, setActiveLog] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects driven by scroll
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroY = useSpring(rawY, { stiffness: 50, damping: 15 });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  
  const cardLeftY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const cardRightY = useTransform(scrollYProgress, [0, 1], [0, -180]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLog((prev) => (prev + 1) % webhookLogs.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative h-screen flex items-center overflow-hidden bg-[#050A14]">
      {/* Cinematic Background Image w/ Parallax Scale */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale: bgScale }}
      >
        <img 
          src="/hero-bg.png" 
          alt="Abstract tech background" 
          className="w-full h-full object-cover object-center opacity-80 mix-blend-screen"
        />
        {/* Soft dark gradient overlays to ensure text pops */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050A14]/70 via-transparent to-[#050A14] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] via-[#050A14]/60 to-transparent pointer-events-none" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 grid lg:grid-cols-12 gap-10 items-center w-full"
      >
        {/* Left: Copy (spans 7 cols) */}
        <div className="lg:col-span-7 pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-[13px] font-medium mb-8 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            AI-First Software Studio
          </motion.div>

          <h1 className="text-[clamp(2.8rem,5.5vw,5rem)] font-heading font-extrabold text-white mb-8">
            <LineText delay={2.1}>We Build Software</LineText>
            <LineText delay={2.25}>Powered by</LineText>
            <LineText delay={2.4}>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-200 drop-shadow-sm">
                Intelligence
              </span>
            </LineText>
          </h1>

          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ delay: 2.6, duration: 1 }}
            className="text-[17px] text-slate-300 max-w-lg mb-12 leading-[1.8] font-light"
          >
            Engineering software that thinks, adapts, and scales — built with
            precision for companies that demand excellence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.8 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <a
              href="#contact"
              className="group px-7 py-3.5 bg-sky-600 border mx-auto sm:mx-0 border-sky-500 text-white font-medium rounded-xl hover:bg-sky-500 hover:shadow-[0_0_20px_rgba(2,132,199,0.4)] transition-all duration-300 tracking-wide text-sm flex items-center gap-2"
            >
              Let's Build Together
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a
              href="#services"
              className="px-7 py-3.5 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-sm tracking-wide"
            >
              See Our Work
            </a>
          </motion.div>

          {/* Abstract Principles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className="flex gap-10 flex-wrap"
          >
            {[
              { icon: "◆", label: "Architecture First" },
              { icon: "◇", label: "Clean Codebases" },
              { icon: "▽", label: "Built to Scale" },
            ].map((p) => (
              <div key={p.label} className="flex items-center gap-2.5 text-[13px] text-slate-400 font-medium">
                <span className="text-sky-400 opacity-60 text-[10px]">{p.icon}</span>
                {p.label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Floating Glass Tech Cards (spans 5 cols) */}
        <div className="hidden lg:block lg:col-span-5 relative h-[500px]">
          {/* Webhook Event Stream Card */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 20 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 2.5, duration: 1.2, ease: "easeOut" }}
            style={{ y: cardRightY }}
            className="absolute top-10 right-0 w-[340px] z-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl shadow-sky-900/20"
          >
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center justify-between">
              Live Webhook Stream
              <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
            </div>
            <div className="space-y-2.5 font-mono text-[11px]">
              {webhookLogs.map((log, i) => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: i === activeLog ? 1 : 0.25,
                    x: i === activeLog ? 6 : 0,
                    scale: i === activeLog ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-3 bg-white/5 rounded pl-2.5 pr-2 py-1.5"
                >
                  <span className={`font-semibold ${log.method === "POST" ? "text-sky-400" : log.method === "PUT" ? "text-amber-400" : "text-emerald-400"}`}>
                    {log.method}
                  </span>
                  <span className="text-slate-200">{log.path}</span>
                  <span className="text-emerald-500 ml-auto">{log.status}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* System Topology Card */}
          <motion.div
            initial={{ opacity: 0, x: 60, y: 60, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, y: 0, rotateY: -5 }}
            transition={{ delay: 2.7, duration: 1.4, ease: "easeOut" }}
            style={{ y: cardLeftY }}
            className="absolute bottom-10 left-[-40px] w-[320px] bg-[#0c1322]/80 backdrop-blur-xl border border-sky-500/20 rounded-2xl p-6 shadow-2xl"
          >
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em] mb-5">
              System Topology
            </div>
            <svg viewBox="0 0 280 160" className="w-full h-auto drop-shadow-md">
              <line x1="55" y1="35" x2="195" y2="75" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
              <line x1="55" y1="35" x2="95" y2="135" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
              <line x1="195" y1="75" x2="235" y2="145" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
              <line x1="95" y1="135" x2="235" y2="145" stroke="rgba(56,189,248,0.3)" strokeWidth="1" />
              {topologyNodes.map((node, i) => (
                <g key={i}>
                  <circle cx={node.x + 35} cy={node.y + 15} r="6" fill="rgba(56,189,248,0.15)" stroke="#38bdf8" strokeWidth="1.5" />
                  <motion.circle 
                    cx={node.x + 35} cy={node.y + 15} r="12" 
                    fill="none" stroke="#38bdf8" strokeWidth="0.5"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  />
                  <text x={node.x + 50} y={node.y + 19} fill="#cbd5e1" fontSize="10.5" fontFamily="monospace">
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>
          </motion.div>
        </div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
};

export default HeroSection;
