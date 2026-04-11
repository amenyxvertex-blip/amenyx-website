import { motion } from "framer-motion";
import { Github, Linkedin, Instagram } from "lucide-react";
import BrandMark from "@/components/BrandMark";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};
const footerLinks = {
  Capabilities: [
    { label: "Machine Learning", href: "#services" },
    { label: "AI Agents", href: "#services" },
    { label: "Computer Vision", href: "#services" },
    { label: "Workflow Automation", href: "#services" },
    { label: "App Development", href: "#services" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Process", href: "#process" },
    { label: "Careers", href: "mailto:amenyxvertex@gmail.com?subject=Careers%20at%20Amenyx%20Vertex" },
    { label: "Contact", href: "#contact" },
  ],
  Social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/amenyx-vertex-a407893bb", external: true },
    { label: "GitHub", href: "https://github.com/amenyxvertex-blip", external: true },
    { label: "Instagram", href: "https://www.instagram.com/amenyx.vertex/", external: true },
  ],
} as const satisfies Record<string, FooterLink[]>;

const Footer = () => (
  <footer className="bg-[#050A14] text-white">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-20">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-14">
        {/* Brand */}
        <div>
          <div className="flex items-center mb-5 text-white">
            <BrandMark size={22} detailed={false} />
          </div>
          <p className="text-[13px] text-white/50 leading-[1.7]">
            AI-first software engineering for companies that build the future.
          </p>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-heading font-bold text-white text-[13px] mb-5 uppercase tracking-[0.1em]">{title}</h4>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 text-[13px] text-white/50 hover:text-white transition-all duration-400 group"
                  >
                    {title === "Social" && link.label === "LinkedIn" && <Linkedin className="w-4 h-4 group-hover:scale-110 group-hover:text-blue-400 transition-all duration-300" />}
                    {title === "Social" && link.label === "GitHub" && <Github className="w-4 h-4 group-hover:scale-110 group-hover:text-slate-300 transition-all duration-300" />}
                    {title === "Social" && link.label === "Instagram" && <Instagram className="w-4 h-4 group-hover:scale-110 group-hover:text-pink-400 transition-all duration-300" />}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-20 pt-7 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-[11px] text-white/40 tracking-wide">
          © {new Date().getFullYear()}. All rights reserved.
        </p>
        <div className="flex gap-8">
          <a href="mailto:amenyxvertex@gmail.com?subject=Privacy%20Policy%20Request" className="text-[11px] text-white/40 hover:text-white transition-colors duration-400 tracking-wide">Privacy</a>
          <a href="mailto:amenyxvertex@gmail.com?subject=Terms%20of%20Service%20Request" className="text-[11px] text-white/40 hover:text-white transition-colors duration-400 tracking-wide">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
