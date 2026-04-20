import { FormEvent, useRef, useState } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { Calendar, Loader2, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ScrollText from "./ScrollText";

type ContactFormState = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  projectBudget: string;
  linkedinUrl: string;
  timeline: string;
  message: string;
};

const initialForm: ContactFormState = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  service: "AI Agents",
  projectBudget: "",
  linkedinUrl: "",
  timeline: "",
  message: "",
};

const COMPANY_EMAIL = "amenyxvertex@gmail.com";
const MAILTO_CONTACT_URL = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent("Project Inquiry - Amenyx Vertex")}`;

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<ContactFormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.92", "start 0.36"],
  });

  const { scrollYProgress: formProgress } = useScroll({
    target: formRef,
    offset: ["start 0.95", "start 0.48"],
  });

  const boxGlowA = useTransform(scrollYProgress, [0, 0.4, 1], [0.08, 0.35, 0.18]);
  const boxGlowB = useTransform(scrollYProgress, [0, 0.4, 1], [0.12, 0.48, 0.2]);
  const boxScale = useTransform(scrollYProgress, [0, 0.35], [0.985, 1]);
  const textGlow = useTransform(scrollYProgress, [0, 0.35, 1], [0.06, 0.36, 0.14]);

  const ctaShadow = useMotionTemplate`0 28px 84px -34px rgba(14,165,233,${boxGlowA}), 0 0 0 1px rgba(186,230,253,${boxGlowB})`;
  const ctaTextShadow = useMotionTemplate`0 0 20px rgba(255,255,255,${textGlow})`;

  const formOpacity = useTransform(formProgress, [0, 0.45], [0.3, 1]);
  const formY = useTransform(formProgress, [0, 0.45], [46, 0]);
  const formScale = useTransform(formProgress, [0, 0.45], [0.965, 1]);

  const updateField = (field: keyof ContactFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL?.trim();
      const endpoint = apiBase
        ? `${apiBase.replace(/\/$/, "")}/api/contact-email`
        : "/api/contact-email";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error ?? "Unable to send your message right now.");
      }

      setStatus({
        type: "success",
        message: "Thanks. Your details were sent successfully.",
      });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 sm:py-24 px-6 sm:px-10 bg-white">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.55 }}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            style={{ boxShadow: ctaShadow, scale: boxScale }}
            className="relative overflow-hidden rounded-[1.8rem] p-10 sm:p-12 lg:p-14 text-center"
          >
            <div className="absolute inset-0" style={{ background: "var(--gradient-cta)" }} />
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
              }}
            />

            <motion.div style={{ textShadow: ctaTextShadow }} className="relative z-10">
              <ScrollText
                text="Have an idea? Let's bring it to life."
                as="h2"
                className="text-[clamp(2rem,4vw,3.5rem)] font-heading font-extrabold text-primary-foreground leading-[1.08] tracking-[-0.02em]"
              />
              <p className="mt-5 text-primary-foreground/70 text-[18px] max-w-2xl mx-auto leading-[1.65]">
                Whether it&apos;s an AI-powered product or a complex enterprise platform, we&apos;re ready to engineer it with you.
              </p>

              <div className="mt-7 max-w-3xl mx-auto border-t border-white/20 pt-6 text-center">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/70 font-semibold">Contact</p>
                <ScrollText
                  text="Tell us what you are building."
                  as="h3"
                  className="mt-3 text-[clamp(1.35rem,2.1vw,1.9rem)] font-heading font-bold text-white leading-[1.2] tracking-[-0.01em] justify-center flex flex-wrap"
                  offset={["start 0.95", "start 0.7"]}
                />
                <p className="mt-2 text-white/75 text-[15px] sm:text-[16px] leading-[1.7] max-w-2xl mx-auto">
                  Submit your project details and we will instantly get notified and reach back out to you.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href={MAILTO_CONTACT_URL}
                  className="inline-flex items-center gap-2.5 px-7 py-3 bg-primary-foreground text-heading font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-foreground/10 transition-all duration-500 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Email Us
                </a>
                <a
                  href="#contact-form"
                  className="inline-flex items-center gap-2.5 px-7 py-3 border border-primary-foreground/25 text-primary-foreground font-semibold rounded-xl hover:bg-primary-foreground/10 transition-all duration-500 text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  Book a Call
                </a>
              </div>
            </motion.div>

          </motion.div>
        </motion.div>

        <motion.div
          ref={formRef}
          style={{ opacity: formOpacity, y: formY, scale: formScale }}
          id="contact-form"
          className="max-w-3xl mx-auto"
        >
          <form
            onSubmit={submitForm}
            className="rounded-2xl border border-slate-800/30 bg-[#0B1223] p-5 sm:p-6 shadow-[0_22px_60px_-32px_rgba(2,6,23,0.68)] space-y-4"
          >
            <div className="rounded-lg border border-slate-700/70 bg-[#07102A] px-4 py-3">
              <p className="text-slate-200 text-sm font-medium">Professional inquiry channel</p>
              <p className="text-slate-400 text-xs mt-1">Response time: within 1 business day</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-slate-100 font-semibold text-sm">Full name <span className="text-red-500">*</span></Label>
                <Input
                  id="fullName"
                  required
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className="bg-[#07102A] border-slate-700 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-100 font-semibold text-sm">Work email <span className="text-red-500">*</span></Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="bg-[#07102A] border-slate-700 text-slate-100"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-100 font-semibold text-sm">Phone / WhatsApp</Label>
                <Input
                  id="phone"
                  required
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="bg-[#07102A] border-slate-700 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-slate-100 font-semibold text-sm">Company (Optional)</Label>
                <Input
                  id="company"
                  value={form.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  className="bg-[#07102A] border-slate-700 text-slate-100"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="service" className="text-slate-100 font-semibold text-sm">Service needed</Label>
                <select
                  id="service"
                  required
                  value={form.service}
                  onChange={(e) => updateField("service", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-slate-700 bg-[#07102A] px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="AI Agents">AI Agents</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Computer Vision">Computer Vision</option>
                  <option value="Workflow Automation">Workflow Automation</option>
                  <option value="Application Building">Application Building</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectBudget" className="text-slate-100 font-semibold text-sm">Estimated budget (Optional)</Label>
                <Input
                  id="projectBudget"
                  value={form.projectBudget}
                  onChange={(e) => updateField("projectBudget", e.target.value)}
                  className="bg-[#07102A] border-slate-700 text-slate-100"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="linkedinUrl" className="text-slate-100 font-semibold text-sm">LinkedIn profile <span className="text-red-500">*</span></Label>
                <Input
                  id="linkedinUrl"
                  required
                  type="url"
                  value={form.linkedinUrl}
                  onChange={(e) => updateField("linkedinUrl", e.target.value)}
                  className="bg-[#07102A] border-slate-700 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline" className="text-slate-100 font-semibold text-sm">Preferred timeline <span className="text-red-500">*</span></Label>
                <Input
                  id="timeline"
                  required
                  value={form.timeline}
                  onChange={(e) => updateField("timeline", e.target.value)}
                  className="bg-[#07102A] border-slate-700 text-slate-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-slate-100 font-semibold text-sm">Project details</Label>
              <Textarea
                id="message"
                required
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                className="min-h-28 bg-[#07102A] border-slate-700 text-slate-100"
              />
            </div>

            {status && (
              <p
                className={`rounded-md border px-3 py-2 text-sm ${
                  status.type === "success"
                    ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
                    : "border-red-400/40 bg-red-500/10 text-red-200"
                }`}
              >
                {status.message}
              </p>
            )}

            <div className="flex flex-wrap gap-3 items-center justify-between pt-1">
              <a
                href={MAILTO_CONTACT_URL}
                className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                Prefer email? Open your mail app
              </a>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 bg-sky-500 text-slate-950 hover:bg-sky-400 font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    Send inquiry
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
