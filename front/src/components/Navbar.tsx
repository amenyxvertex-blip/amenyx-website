import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import BrandMark from "@/components/BrandMark";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();
  
  // Create perfectly smooth interpolated values across the same scroll range (0 to 80px)
  const navBgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const navBlur = useTransform(scrollY, [0, 80], [0, 16]);
  const logoColor = useTransform(scrollY, [0, 80], ["#ffffff", "#0f172a"]);
  const linkColor = useTransform(scrollY, [0, 80], ["#ffffffb3", "#475569"]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.1]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
    >
      <motion.div
        style={{ 
          opacity: navBgOpacity,
          backdropFilter: `blur(${navBlur}px)`,
          borderBottom: "1px solid rgba(15, 23, 42, 0.1)"
        }}
        className="absolute inset-0 bg-white/80 shadow-sm"
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 h-[72px] flex items-center justify-between pointer-events-auto">
        <motion.a 
          href="#about" 
          style={{ color: logoColor }}
          className="flex items-center gap-3"
        >
          <BrandMark size={28} detailed={false} />
          <span className="font-heading text-[18px] sm:text-[19px] font-bold tracking-tight">
            Amenyx Vertex
          </span>
        </motion.a>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              style={{ color: linkColor }}
              className="text-[13px] font-medium transition-colors duration-300 tracking-wide hover:!text-[#0f172a]"
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden md:inline-flex px-6 py-2.5 bg-[#00A3FF] text-white text-[13px] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00A3FF]/20 transition-all duration-500"
        >
          Start a Project
        </a>

        <motion.button
          style={{ color: logoColor }}
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 relative"
        >
          <div className="px-6 py-5 flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[13px] font-medium text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="px-6 py-3 bg-[#00A3FF] text-white text-[13px] font-semibold rounded-xl text-center"
            >
              Start a Project
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
