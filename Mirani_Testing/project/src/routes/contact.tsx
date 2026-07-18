import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { contactInfo } from "@/lib/site-data";
import { Mail, Phone, MapPin, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mirani Foundation" },
      { name: "description", content: "Get in touch, volunteer, or donate directly to Mirani Foundation." },
      { property: "og:title", content: "Contact — Mirani Foundation" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <section className="bg-cream section-y">
        <div className="container-mirani max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Get in touch
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-ink">
            We'd love to hear from you.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Donate, volunteer, or just say hello — every message reaches a real person on our team.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-mirani grid lg:grid-cols-2 gap-8">
          <DonationCard />
          <ContactVolunteerCard />
        </div>
      </section>

      <section className="section-y bg-cream">
        <div className="container-mirani grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Find us</p>
            <h2 className="mt-3 text-3xl font-bold text-ink">Reach out or drop in.</h2>
            <ul className="mt-6 space-y-4 text-ink">
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-brand mt-0.5" />
                <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="hover:text-brand">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-brand mt-0.5" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-brand">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-brand mt-0.5" />
                <span>{contactInfo.address}</span>
              </li>
            </ul>
          </div>
          <div className="aspect-video rounded-2xl overflow-hidden border border-border bg-card">
            <iframe
              title="Mirani Foundation location"
              src={contactInfo.mapEmbed}
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function DonationCard() {
  return (
    <div className="rounded-2xl bg-brand-ink text-brand-ink-foreground p-8">
      <h2 className="text-2xl font-bold">Donate directly</h2>
      <p className="mt-2 text-sm text-brand-ink-foreground/70">
        Give online via Razorpay or transfer to our bank account.
      </p>
      <div className="mt-6 rounded-xl bg-brand-ink-foreground/5 border border-brand-ink-foreground/15 p-5 text-sm space-y-1">
        <p className="text-brand-ink-foreground/60 uppercase text-xs font-semibold tracking-wider">Bank details</p>
        <p><span className="text-brand-ink-foreground/60">Account name:</span> {contactInfo.bank.name}</p>
        <p><span className="text-brand-ink-foreground/60">Account no:</span> {contactInfo.bank.account}</p>
        <p><span className="text-brand-ink-foreground/60">IFSC:</span> {contactInfo.bank.ifsc}</p>
        <p><span className="text-brand-ink-foreground/60">Bank:</span> {contactInfo.bank.bankName}</p>
      </div>

      <form className="mt-6 grid gap-3">
        <input
          type="number"
          placeholder="Amount (₹)"
          min={100}
          className="w-full rounded-lg bg-brand-ink-foreground/5 border border-brand-ink-foreground/20 text-brand-ink-foreground placeholder:text-brand-ink-foreground/50 px-4 py-3 text-sm focus:outline-none focus:border-brand"
        />
        <input
          type="text"
          placeholder="Full name"
          className="w-full rounded-lg bg-brand-ink-foreground/5 border border-brand-ink-foreground/20 text-brand-ink-foreground placeholder:text-brand-ink-foreground/50 px-4 py-3 text-sm focus:outline-none focus:border-brand"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-lg bg-brand-ink-foreground/5 border border-brand-ink-foreground/20 text-brand-ink-foreground placeholder:text-brand-ink-foreground/50 px-4 py-3 text-sm focus:outline-none focus:border-brand"
        />
        <input
          type="tel"
          placeholder="Phone (10 digits)"
          pattern="[6-9][0-9]{9}"
          className="w-full rounded-lg bg-brand-ink-foreground/5 border border-brand-ink-foreground/20 text-brand-ink-foreground placeholder:text-brand-ink-foreground/50 px-4 py-3 text-sm focus:outline-none focus:border-brand"
        />
        <button type="submit" className="btn-brand btn-brand-hover w-full">
          Donate via Razorpay
        </button>
        <p className="text-xs text-brand-ink-foreground/50 text-center">Secure payment · 80G tax-exempt receipt on request</p>
      </form>
    </div>
  );
}

function ContactVolunteerCard() {
  const [mode, setMode] = useState<"volunteer" | "query">("volunteer");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const errs: Record<string, string> = {};
    if (!(f.get("name") as string)?.trim()) errs.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((f.get("email") as string) || "")) errs.email = "Enter a valid email";
    if (!/^[6-9]\d{9}$/.test((f.get("phone") as string) || "")) errs.phone = "Enter a valid 10-digit Indian number";
    if (!(f.get("location") as string)?.trim()) errs.location = "Location is required";
    if (!(f.get("message") as string)?.trim()) errs.message = "Please leave a message";
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSubmitted(true);
  }

  const cls = (k: string) =>
    `w-full rounded-lg border bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 ${
      errors[k] ? "border-destructive" : "border-border focus:border-brand"
    }`;

  return (
    <div className="rounded-2xl bg-card border border-border p-8">
      <h2 className="text-2xl font-bold text-ink">Volunteer or send a query</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Choose what you'd like to do below.
      </p>

      <div className="mt-5 inline-flex rounded-full border border-border bg-cream p-1">
        {(["volunteer", "query"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              mode === m ? "bg-brand-ink text-brand-ink-foreground" : "text-ink"
            }`}
          >
            {m === "volunteer" ? "Sign up as volunteer" : "Send a query"}
          </button>
        ))}
      </div>

      {submitted ? (
        <p className="mt-6 rounded-lg bg-brand/10 text-ink p-4 text-sm">
          Thank you! Your {mode === "volunteer" ? "application" : "message"} has been received.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4" noValidate>
          <div>
            <input name="name" placeholder="Full name" className={cls("name")} />
            {errors.name && (
              <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <input name="email" type="email" placeholder="Email" className={cls("email")} />
            {errors.email && (
              <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <input name="phone" type="tel" placeholder="Phone (10 digits)" className={cls("phone")} />
            {errors.phone && (
              <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {errors.phone}
              </p>
            )}
          </div>
          <div>
            <input
              name="location"
              placeholder="Location (city, state)"
              className={cls("location")}
            />
            {errors.location && (
              <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {errors.location}
              </p>
            )}
            <p className="mt-1 text-[11px] text-muted-foreground">
              We use Google Places to help you pick a real location.
            </p>
          </div>
          <div>
            <textarea
              name="message"
              rows={4}
              placeholder={
                mode === "volunteer"
                  ? "Tell us about your area of interest"
                  : "Your message"
              }
              className={cls("message")}
            />
            {errors.message && (
              <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {errors.message}
              </p>
            )}
          </div>
          <button type="submit" className="btn-ink btn-ink-hover w-full">
            {mode === "volunteer" ? "Submit volunteer application" : "Send message"}
          </button>
        </form>
      )}
    </div>
  );
}
