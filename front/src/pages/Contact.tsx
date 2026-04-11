import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2, MessageCircle } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ContactFormState = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  projectBudget: string;
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
  timeline: "",
  message: "",
};

const Contact = () => {
  const [form, setForm] = useState<ContactFormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

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
        ? `${apiBase.replace(/\/$/, "")}/api/contact-whatsapp`
        : "/api/contact-whatsapp";

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
        message: "Thanks. Your details were sent to our WhatsApp successfully.",
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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.12),transparent_35%),#020617] text-slate-100 px-6 py-10 sm:px-10 sm:py-16">
      <div className="max-w-5xl mx-auto">
        <div className="inline-flex mb-6 text-white">
          <BrandMark size={24} detailed={false} />
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <section className="mt-10 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-sky-300/80 font-semibold">Contact</p>
            <h1 className="mt-3 text-[clamp(2rem,4.5vw,3.4rem)] font-heading font-bold leading-tight text-white">
              Tell us what you are building.
            </h1>
            <p className="mt-5 text-slate-300/80 leading-7 max-w-xl">
              Submit your project details and we will instantly push the request to our registered WhatsApp using
              Twilio.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 space-y-4">
              <h2 className="font-heading text-xl text-white">Direct contact info</h2>
              <p className="text-sm text-slate-300">
                Email: <a href="mailto:amenyxvertex@gmail.com" className="text-sky-300 hover:text-sky-200">amenyxvertex@gmail.com</a>
              </p>
              <p className="text-sm text-slate-300">Response time: within 1 business day</p>
              <p className="text-sm text-slate-300">Best for: AI systems, workflow automation, enterprise software</p>
            </div>
          </div>

          <form
            onSubmit={submitForm}
            className="rounded-3xl border border-white/15 bg-[#0B1223]/90 backdrop-blur-xl p-6 sm:p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.6)] space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  required
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className="bg-slate-950/60 border-white/10 text-white placeholder:text-slate-400"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Work email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="bg-slate-950/60 border-white/10 text-white placeholder:text-slate-400"
                  placeholder="jane@company.com"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone / WhatsApp</Label>
                <Input
                  id="phone"
                  required
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="bg-slate-950/60 border-white/10 text-white placeholder:text-slate-400"
                  placeholder="+971xxxxxxxxx"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={form.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  className="bg-slate-950/60 border-white/10 text-white placeholder:text-slate-400"
                  placeholder="Your company"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="service">Service needed</Label>
                <select
                  id="service"
                  value={form.service}
                  onChange={(e) => updateField("service", e.target.value)}
                  className="flex h-10 w-full rounded-md border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="AI Agents">AI Agents</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Computer Vision">Computer Vision</option>
                  <option value="Workflow Automation">Workflow Automation</option>
                  <option value="Application Building">Application Building</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectBudget">Estimated budget</Label>
                <Input
                  id="projectBudget"
                  value={form.projectBudget}
                  onChange={(e) => updateField("projectBudget", e.target.value)}
                  className="bg-slate-950/60 border-white/10 text-white placeholder:text-slate-400"
                  placeholder="$15,000 - $30,000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline">Preferred timeline</Label>
              <Input
                id="timeline"
                value={form.timeline}
                onChange={(e) => updateField("timeline", e.target.value)}
                className="bg-slate-950/60 border-white/10 text-white placeholder:text-slate-400"
                placeholder="8-12 weeks"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Project details</Label>
              <Textarea
                id="message"
                required
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                className="min-h-32 bg-slate-950/60 border-white/10 text-white placeholder:text-slate-400"
                placeholder="What are you trying to build, current blockers, and desired outcome?"
              />
            </div>

            {status && (
              <p
                className={`rounded-md border px-3 py-2 text-sm ${
                  status.type === "success"
                    ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
                    : "border-red-400/30 bg-red-500/10 text-red-200"
                }`}
              >
                {status.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-sky-500 text-slate-950 hover:bg-sky-400 font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending to WhatsApp...
                </>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4" />
                  Send inquiry to WhatsApp
                </>
              )}
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Contact;
