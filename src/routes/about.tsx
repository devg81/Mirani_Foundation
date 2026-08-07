import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { pillars, teamMembers } from "@/lib/site-data";
import { ArrowRight, HeartHandshake } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Mirani Foundation" },
      {
        name: "description",
        content:
          "Meet the team and pillars behind Mirani Foundation — health, education, and social justice.",
      },
      { property: "og:title", content: "About Us — Mirani Foundation" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-cream section-y">
        <div className="container-mirani max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            About Mirani Foundation
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-ink leading-tight">
            A decade of walking alongside the communities we serve.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Mirani Foundation is a grassroots NGO working across health,
            education and social justice in India. We started in a two-room
            clinic in Pune. Today, our programs reach 12 districts — but the
            belief is the same: dignity is not a service, it's a right.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-mirani space-y-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Our three pillars
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">
              Health. Education. Social Justice.
            </h2>
          </div>

          {pillars.map((p, i) => (
            <div
              key={p.title}
              className={`grid md:grid-cols-2 gap-10 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div>
                <span className="text-brand text-sm font-semibold uppercase tracking-wider">
                  Pillar {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-3xl font-bold text-ink">{p.title}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">{p.long}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-y bg-cream">
        <div className="container-mirani">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Team
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-ink">
              The people behind the work.
            </h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((m) => (
              <div key={m.name} className="rounded-2xl bg-white border border-border overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-ink">{m.name}</h3>
                  <p className="text-sm text-brand font-medium">{m.role}</p>
                  <blockquote className="mt-4 text-sm text-muted-foreground italic border-l-2 border-brand pl-3">
                    "{m.quote}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-mirani grid lg:grid-cols-2 gap-10">
          <VolunteerForm />
          <DonateForm />
        </div>
      </section>
    </SiteLayout>
  );
}

function VolunteerForm() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="rounded-2xl bg-cream border border-border p-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand/15 text-brand flex items-center justify-center">
          <HeartHandshake className="h-5 w-5" />
        </div>
        <h3 className="text-2xl font-bold text-ink">Become a volunteer</h3>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Give a weekend, a skill, or a whole season. We'll match you with a
        program where you can help most.
      </p>
      {submitted ? (
        <p className="mt-6 rounded-lg bg-brand/10 text-ink p-4 text-sm">
          Thank you! We've received your application and will be in touch.
        </p>
      ) : (
        <form
          className="mt-6 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <Field label="Full name" name="name" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Phone (India)" name="phone" type="tel" pattern="[6-9][0-9]{9}" required />
          <Field label="Location" name="location" placeholder="City, State" required />
          <Field label="Area of interest" name="interest" as="textarea" required />
          <button type="submit" className="btn-brand btn-brand-hover w-full">
            Submit volunteer application
          </button>
        </form>
      )}
    </div>
  );
}

function DonateForm() {
  return (
    <div className="rounded-2xl bg-ink text-white p-8">
      <h3 className="text-2xl font-bold">Donate now</h3>
      <p className="mt-3 text-sm text-white/70">
        A quick way to give right from this page. Secure payment via Razorpay.
      </p>
      <div className="mt-6 grid grid-cols-4 gap-2">
        {[500, 1000, 2500, 5000].map((a) => (
          <button
            key={a}
            type="button"
            className="rounded-lg border border-white/25 text-white py-3 text-sm font-semibold hover:bg-brand hover:border-brand transition-colors"
          >
            ₹{a.toLocaleString()}
          </button>
        ))}
      </div>
      <form className="mt-4 grid gap-3">
        <input
          type="number"
          min={100}
          placeholder="Custom amount (₹)"
          className="w-full rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-white/50 px-4 py-3 text-sm focus:outline-none focus:border-brand"
        />
        <input
          type="text"
          placeholder="Full name"
          className="w-full rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-white/50 px-4 py-3 text-sm focus:outline-none focus:border-brand"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-white/50 px-4 py-3 text-sm focus:outline-none focus:border-brand"
        />
        <Link to="/donate" className="btn-brand btn-brand-hover w-full">
          Continue to secure payment <ArrowRight className="h-4 w-4" />
        </Link>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  as,
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  as?: "textarea";
  required?: boolean;
  pattern?: string;
  placeholder?: string;
}) {
  const cls =
    "w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-ink focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      {as === "textarea" ? (
        <textarea name={name} rows={3} className={`mt-1.5 ${cls}`} {...rest} />
      ) : (
        <input type={type} name={name} className={`mt-1.5 ${cls}`} {...rest} />
      )}
    </label>
  );
}
